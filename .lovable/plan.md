## Objetivo

Substituir o fluxo atual de checkout (Shopify Draft Order → `invoiceUrl`) por **NYVA Pay**. Ao clicar em "PASSAR AO PAGAMENTO", a app chama a NYVA API, recebe um `pay_url` e redireciona o cliente para essa página hospedada.

## Arquitetura

```text
CartDrawer ──► supabase.functions.invoke('create-nyva-checkout')
                          │
                          ▼
            Edge Function (Deno, verify_jwt=false)
                          │
                          ▼
    POST https://nyvapay.com/api/partner/merchants/{MERCHANT_ID}/payment-links
            headers: X-API-Key: NYVA_PARTNER_API_KEY
                          │
                          ▼
                  { pay_url } ──► redireciona o cliente

    POST https://nyvapay.com/.../webhooks (configurado no link)
                          │
                          ▼
            Edge Function pública nyva-webhook
                          │
                          ▼
                guarda em public.orders
```

## Secrets a configurar

Pedir ao utilizador via `add_secret`:
- `NYVA_PARTNER_API_KEY` — chave master criada em Settings & API (formato `nv_…`)
- `NYVA_MERCHANT_ID` — UUID do merchant MRTUGA dentro do portal NYVA

## Passos

### 1. Tabela `orders` (Lovable Cloud)
Migração criando `public.orders` para registar pagamentos recebidos via webhook:
- `id uuid pk`, `payment_request_id text unique`, `order_ref text`, `amount numeric`, `currency text`, `status text`, `customer_email text`, `customer_name text`, `note text`, `metadata jsonb`, `created_at timestamptz`
- GRANTs apropriados (apenas `service_role` escreve; `authenticated` SELECT só se necessário no futuro; sem `anon`).
- RLS ENABLE + policies restritas.

### 2. Edge Function: `create-nyva-checkout`
- CORS + `verify_jwt = false` (checkout é público).
- Body de entrada: `{ packs, market }` (mesmo shape atual de `create-checkout-box-variants`).
- Calcula:
  - `amount` total = Σ `packPayUnits(cap) * 18` por pack.
  - `product_name` = label do pack PT (ex.: "Leva 3 Paga 2") — usa `_shared/packTitles.ts` já existente.
  - `note` = resumo condensado das t-shirts (cor, tamanho).
  - `metadata` = `{ items: JSON.stringify(packs), market }` para reconciliar depois.
- POST para `https://nyvapay.com/api/partner/merchants/${NYVA_MERCHANT_ID}/payment-links` com:
  ```json
  {
    "amount": <total>,
    "currency": "EUR",
    "product_name": "<label>",
    "order": "MRTUGA-<timestamp>",
    "payment_type": "one_time",
    "webhook_url": "https://<project>.functions.supabase.co/nyva-webhook",
    "success_redirect_url": "https://mrtuga.co/obrigado",
    "metadata": { ... }
  }
  ```
- Devolve `{ url: pay_url }`.

### 3. Edge Function: `nyva-webhook`
- Pública, `verify_jwt = false`, sem CORS necessário.
- Recebe `payment.succeeded` (e ignora outros por agora; subscrição não se aplica).
- Faz `upsert` em `public.orders` usando `payment_request_id` como chave de idempotência (via Service Role).
- Devolve `200 ok`.

### 4. Frontend: `src/lib/shopify.ts`
- Renomear a função `createCheckout` para apontar para `create-nyva-checkout` (mantendo a mesma assinatura para não tocar no `CartDrawer`).
- Opção: criar `src/lib/nyva.ts` novo e atualizar o import no `CartDrawer.tsx`. Deixar `shopify.ts` legado por enquanto, sem ser chamado.

### 5. Limpeza
- Não apagar `create-checkout-box-variants` agora — deixar como fallback até validar NYVA em produção.
- Atualizar memória do projeto: arquitetura passa de "Shopify Draft Order" para "NYVA Pay hosted checkout".

## Validação

1. Adicionar a uma t-shirt 3 unidades → "PASSAR AO PAGAMENTO" → deve abrir nova aba em `nyvapay.com/pay/...` com o valor correto (36 €).
2. Completar pagamento de teste → confirmar webhook recebido (`supabase--edge_function_logs nyva-webhook`) e linha em `public.orders`.

## Notas técnicas

- **Sem itens detalhados na NYVA** — a API só recebe um `amount`/`product_name` por link, por isso o resumo das t-shirts vai em `note` + `metadata` (e poderá ser exposto no nosso painel via `orders`).
- **Sem KYC no nosso lado** — assumimos que o merchant MRTUGA já está aprovado no portal NYVA (caso contrário a API devolve 403 e mostramos mensagem).
- **Moeda EUR** — confirmar no portal NYVA que está suportada; se não, fica USD e adicionamos conversão depois.

## Bloqueios

Antes de implementar, preciso de:
1. **NYVA_PARTNER_API_KEY** (criar em Settings & API → "Create key" no portal NYVA).
2. **NYVA_MERCHANT_ID** (UUID do merchant MRTUGA — visível no portal ou via `GET /api/partner/merchants`).
