## Context

Our edge function `create-nyva-embed` is calling the correct endpoint (`POST https://nyvapay.com/api/partner/onboarding-sessions`) with the correct payload shape. Debug logs confirm both secrets are reaching the runtime:
- `NYVA_MERCHANT_ID` = `f6bc0477-af08-44fb-97b7-c2426f9d1494` (matches what you just confirmed)
- `NYVA_PARTNER_API_KEY` = 51 chars present

Yet NYVA returns `400 merchant_id and surface ... are required`. Since we ARE sending both, this error from NYVA almost always means **the merchant_id is not found / not paired with this partner API key** on their side.

## Plan: isolate which credential is wrong

1. Temporarily hardcode the example UUID from the NYVA docs (`0b052e3e-84e0-4899-9100-1d90427c2512`) in `create-nyva-embed/index.ts` and test once.
   - If NYVA returns 200 → our partner API key works; `f6bc0477-...-1494` is not recognized by NYVA under this key. You'll need to ask NYVA support to confirm the merchant is approved and linked to your partner key.
   - If NYVA still returns 400 → the partner API key itself is wrong / not approved. We'll need a new key from NYVA.

2. Revert the hardcode immediately and rely on the secret again.

3. Based on result, either:
   - Update `NYVA_MERCHANT_ID` secret with the correct value NYVA gives you, OR
   - Update `NYVA_PARTNER_API_KEY` secret.

4. Re-test end-to-end and confirm `embed_url` is returned.

## Technical detail

Only `supabase/functions/create-nyva-embed/index.ts` is touched. No frontend changes. After the diagnostic test passes, the function returns to reading `NYVA_MERCHANT_ID` from env unchanged.