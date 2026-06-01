## Context

The embed flow is already implemented end-to-end:
- Edge function `create-nyva-embed` calls `POST https://nyvapay.com/api/partner/onboarding-sessions` with the minimal payload (merchant_id, surface, amount, currency, product_name, customer_email, success_redirect_url, return_origin).
- `CheckoutPage.tsx` invokes the function and feeds the returned `embed_url` to `NyvaEmbedOverlay`.
- `NyvaEmbedOverlay` mounts the NYVA card iframe with `allow="payment *; clipboard-write"` and listens to `postMessage` for success/close.

All previous test calls failed with `Invalid API key` for merchant `f6bc04…1494`. The curl you just pasted contains a working pair:
- `merchant_id`: `f6bc0477-af08-44fb-97b7-c2426f9d1494`
- `X-API-Key`: `nv_2c6b7abb553ac051bb7f63e87eae8163d29d928767890936`

If our stored `NYVA_PARTNER_API_KEY` is anything other than that exact value, the auth fails. So the fix is most likely just refreshing the secret.

## Plan

1. **Update the `NYVA_PARTNER_API_KEY` secret** with the value from the curl. (Secret update is interactive — you'll paste it.)
2. **Align the iframe `allow` attribute** in `NyvaEmbedOverlay.tsx` to match NYVA's spec exactly:
   `payment *; fullscreen *; publickey-credentials-get *`
   (NYVA's docs list these — required for passkeys / 3DS / fullscreen).
3. **Update the postMessage handler** to also recognize the official event NYVA sends:
   `e.data?.source === "nyva-embed" && e.data?.type === "nyva:checkout:complete"` → call `onSuccess` and redirect to `/obrigado?ref=<order_ref>`.
   Keep existing fuzzy match as fallback.
4. **Test** the edge function with the same payload from your curl (USD/EUR — we'll use EUR to match production). Confirm it returns 200 with `embed_url` and `payment_request_id`.
5. **End-to-end check**: open checkout in the preview, trigger card payment, confirm the NYVA iframe loads.

## Security note

The API key you pasted in chat is now exposed. After we confirm everything works, you should rotate it from the NYVA dashboard and update the secret again. I'll remind you at the end.

## Technical detail

Files touched:
- `src/components/checkout/NyvaEmbedOverlay.tsx` — iframe `allow` + postMessage parsing.

No DB changes. No frontend logic in `CheckoutPage.tsx` needs to change.