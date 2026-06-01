## Change

In `supabase/functions/create-nyva-paylink/index.ts`, add `embed_source: "woo"` to the `payload` object sent to NYVA's `/api/merchant/payment-links` endpoint.

No other changes.