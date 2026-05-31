## Objectivo

Manter o `/checkout` actual (formulário, MB Way, timer, summary, upsells) e **trocar apenas o passo final de pagamento por cartão** pelo embed da NYVA (`/api/partner/onboarding-sessions`), em vez de redireccionar para um `pay_url` externo. MB Way continua a usar o flow de redirect (o embed é card-only segundo a doc).

---

## Pré-requisito bloqueante

O endpoint `onboarding-sessions` exige `merchant_id` (UUID NYVA). Hoje a conta tem **0 merchants** criados no partner. Antes de podermos testar end-to-end, é preciso:

- Criar o merchant **MRTUGA** no portal NYVA (sidebar → Merchants → Create)
- Copiar o UUID que aparece
- Actualizar o secret `NYVA_MERCHANT_ID` com esse UUID

A implementação avança em paralelo — fica pronta a apontar para o UUID assim que existir.

---

## Mudanças

### 1. Nova edge function: `create-nyva-embed`

`supabase/functions/create-nyva-embed/index.ts` (público, `verify_jwt = false`).

Input do cliente:
```json
{
  "amount": 54.00,
  "customer_email": "buyer@x.pt",
  "customer_name": "João Silva",
  "product_name": "MRTUGA — Pack 3 t-shirts",
  "metadata": { "packs": [...], "shipping": {...} }
}
```

Chamada à NYVA:
```
POST https://nyvapay.com/api/partner/onboarding-sessions
X-API-Key: NYVA_PARTNER_API_KEY
{
  "merchant_id": NYVA_MERCHANT_ID,
  "surface": "checkout",
  "amount": <amount>,
  "currency": "EUR",
  "product_name": "...",
  "customer_email": "...",
  "success_redirect_url": "https://mrtuga.co/obrigado",
  "return_origin": "https://mrtuga.co",
  "payment_type": "one_time"
}
```

Devolve `{ embed_url, payment_request_id }` ao cliente e insere uma linha `pending` em `public.orders` (já tens essa tabela).

### 2. `/checkout` — branching no `handleSubmit`

`src/pages/CheckoutPage.tsx` (linhas 177-182, hoje só `setTimeout`):

- **`payment === "card"`** → chama `create-nyva-embed`, guarda `embed_url` em state, abre overlay full-screen com `<iframe src={embed_url}>` (card-only).
- **`payment === "mbway"`** → mantém o flow actual via `create-nyva-checkout` (ou Stripe fallback) — embed da NYVA não suporta MB Way.

### 3. Iframe overlay (novo componente leve)

`src/components/checkout/NyvaEmbedOverlay.tsx`:
- Modal full-screen branco, header minimalista (logo + botão fechar), timer continua visível.
- `<iframe src={embed_url} allow="payment" className="w-full h-full">`.
- `window.addEventListener("message", ...)` para receber eventos do `return_origin` (success/cancel) e redireccionar para `/obrigado` ou fechar.

### 4. Confirmação de pagamento

O webhook NYVA já existente (`nyva-webhook`) actualiza a linha em `public.orders` para `paid`. O `/obrigado` faz polling rápido por `payment_request_id` (já vem na URL via `success_redirect_url`) e mostra a confirmação.

### 5. Manter intacto

- Toda a UI/UX do `/checkout` (formulário, timer, FOMO, upsell, order summary).
- `create-nyva-checkout` continua a existir para MB Way / fallback.
- Nenhuma alteração visual à página — o embed aparece só depois do clique em "Finalizar" quando pagamento = Cartão.

---

## Ordem de execução

1. Criar `supabase/functions/create-nyva-embed/index.ts` e registar em `supabase/config.toml`.
2. Criar `NyvaEmbedOverlay.tsx`.
3. Substituir o `handleSubmit` placeholder por branching card/mbway.
4. Esperar pelo `NYVA_MERCHANT_ID` (UUID) e testar com `supabase--curl_edge_functions`.

Diz "ok" e implemento. Se já tiveres o UUID do merchant agora, manda-o junto e actualizo o secret no mesmo passo.