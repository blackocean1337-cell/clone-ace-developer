Substituir o redirect do carrinho para `/checkout` por uma chamada à NYVA Payment Links API, que devolve um `pay_url` e abre o checkout deles diretamente.

## Edge function nova: `create-nyva-paylink`

`supabase/functions/create-nyva-paylink/index.ts` — `verify_jwt = false` em `supabase/config.toml`.

Recebe POST com:
```json
{
  "items": [{ "name", "color", "size", "quantity", "unitPrice" }],
  "promo_code": "TUGA1" | null,
  "discount": 17.5
}
```

Faz:
1. Valida `items` não vazio; recalcula `amount = sum(quantity * unitPrice)` server-side (não confia no client).
2. `product_name`: se 1 item → `Nome Cor (Tamanho)`; senão `MRTUGA — N artigos`.
3. `note`: resumo condensado `2x Icónica Preto (M) | 1x Polo Branco (L)` (max 500).
4. `order`: `MRTUGA-<timestamp>`.
5. `metadata`: items detalhados + promo_code + discount.
6. POST `https://nyvapay.com/api/merchant/payment-links` com headers `X-API-Key` + `X-Merchant-Email`, body:
   ```
   { amount, currency: "EUR", product_name, note, order,
     payment_type: "one_time",
     success_redirect_url: "https://mrtuga.co/obrigado",
     webhook_url: <project>.functions.supabase.co/nyva-webhook,
     metadata }
   ```
7. Devolve `{ url, order_ref }`. CORS em todas as respostas.

## Frontend — `src/components/fincut/CartDrawer.tsx`

1. Novo estado `isCreatingLink` + `linkError`.
2. Substituir `onClick` do botão "PASSAR AO PAGAMENTO":
   - chama `supabase.functions.invoke("create-nyva-paylink", { body: { items, promo_code, discount } })`
   - se sucesso → `window.location.href = data.url` (mesmo separador, fluxo natural mobile/desktop)
   - se erro → mostra `linkError` por baixo do botão com botão "Tentar novamente"
3. Durante loading: botão desativado, spinner `Loader2`, texto "A PREPARAR PAGAMENTO…".
4. `onClose?.()` só depois do redirect (evita fechar antes de saber se vai).

## Sem alterações

- `/checkout` continua a existir (caso seja útil mais tarde / testes), mas deixa de ser usado pelo carrinho.
- Cálculo do total com promo `TUGA1` mantém-se (frontend) mas é re-validado server-side.
- Sem alterações em RLS, auth ou DB.

## Ficheiros

- `supabase/functions/create-nyva-paylink/index.ts` (novo)
- `supabase/config.toml` (registar nova function com `verify_jwt = false`)
- `src/components/fincut/CartDrawer.tsx` (substituir handler do CTA)