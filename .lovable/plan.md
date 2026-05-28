# Sistema de Packs Shopify — Plano de Implementação

Replicar a arquitetura "box variants + Draft Order + webhook" descrita no prompt, substituindo o checkout atual (Stripe / Shopify Storefront cartCreate) por um Draft Order Shopify onde os packs viajam como **uma única linha** e os produtos reais vão como atributos `_lov_*`.

## Objetivo

- Cada pack (ex.: "Pack 3 t-shirts") = 1 linha no Shopify a apontar para uma **variante-caixa** (preço já = preço do pack).
- Produtos reais (cor, tamanho, nome) viajam como `_lov_item_N_*` attributes na linha.
- Itens avulso (qty 1, sem pack) continuam como linha individual normal.
- Webhook recebe a order e "explode" as caixas em `order_items` reais para fulfillment interno.

## Arquitetura

```text
CartDrawer ──► createShopifyCheckout(items)
                     │
                     ▼
        edge fn: create-checkout-box-variants
                     │
            agrupa itens por pack
            resolve variante-caixa por preço/qty
            monta draftOrderCreate (GraphQL)
                     │
                     ▼
        Shopify Draft Order ──► invoiceUrl ──► cliente paga
                                                     │
                                                     ▼
                            webhook orders/paid ──► shopify-webhook
                                                     │
                                          explode _lov_item_* em linhas reais
                                          (logging / fulfillment interno)
```

## Etapas

### 1. Catálogo Shopify — criar variantes-caixa
Produto manual no Shopify (fora de scope de código): "MRTUGA Pack" com variantes:
- `PACK-1` (18€), `PACK-2-FOR-1` (preço pack 2), `PACK-3-FOR-2` (36€), `PACK-4-FOR-3`, `PACK-5-FOR-4`, etc.
- Guardar os `gid://shopify/ProductVariant/...` num mapa.

### 2. `src/lib/cartUtils.ts` (novo)
- `flattenCartItems(items)` → expande qty em unidades atómicas.
- `applyBundleDiscount(units)` → agrupa em packs conforme regras MRTUGA (ex.: Leve 3 Paga 2).
- `buildLineAttributes(packUnits)` → produz `[{ key: "_lov_item_1_name", value: "..." }, { key: "_lov_item_1_color", ... }, ...]`.

### 3. `src/lib/shopify.ts` (refactor)
Substituir `cartCreate` Storefront por chamada à edge function:
- `createShopifyCheckout(items)` → `supabase.functions.invoke("create-checkout-box-variants", { body: { items } })` → devolve `invoiceUrl`.

### 4. `supabase/functions/create-checkout-box-variants/index.ts` (novo)
- Recebe `items[]`.
- Corre `flattenCartItems` + `applyBundleDiscount` (lógica partilhada, copiada para Deno).
- Resolve `BOX_VARIANT_MAP[packSize]`.
- Chama Shopify Admin GraphQL `draftOrderCreate` com:
  - `lineItems`: 1 por pack + 1 por item avulso.
  - `customAttributes`: resumo global do pedido.
  - Cada lineItem com `customAttributes` `_lov_item_N_*`.
- Devolve `{ url: invoiceUrl }`.
- Usa `SHOPIFY_ACCESS_TOKEN` (já existe nos secrets).

### 5. `supabase/functions/shopify-webhook/index.ts` (novo)
- Subscrever `orders/paid` no Shopify (manual após deploy, dar URL ao utilizador).
- Para cada line_item, ler `properties` `_lov_item_*` e logar/persistir os itens reais.
- (Persistência em DB fica para iteração futura — esta versão só faz log + 200 OK.)

### 6. `CartDrawer.tsx`
- Passar a chamar `createShopifyCheckout` (já chama; só muda o que está por trás).
- Remover dependência de `stripe-checkout.ts` se já não for usado.

## Detalhes técnicos

- **Sem alterações de DB** nesta fase (webhook só loga). Pedir confirmação antes de criar tabela `orders` / `order_items`.
- **Mapa de variantes-caixa**: hardcoded no edge function, ajustável quando criarmos os produtos no Shopify.
- **Regras de bundle**: parametrizadas em `cartUtils.ts` (ex.: `{ minQty: 3, payQty: 2 }` para a campanha "Leve 3 Paga 2").
- **Itens avulso**: continuam a usar as variantes reais já mapeadas em `PRODUCT_VARIANT_MAP`.
- **Config**: `supabase/config.toml` adiciona `verify_jwt = false` para `shopify-webhook`.

## O que fica fora (perguntar depois)

- Webhook subscription automation (precisa Admin API scope `write_orders` + registo manual).
- Persistência de orders/items em Supabase.
- Decomposição visual no Shopify admin (continuará a ver "PACK-3-FOR-2" como produto; os items reais estão nos attributes).

## Pré-requisitos antes de implementar

Preciso de confirmação em 2 pontos:

1. **Variantes-caixa no Shopify** — já existem? Se não, crio o mapa com placeholders e tu preenches os GIDs depois.
2. **Regra de bundle ativa hoje** — confirmar que é "Leve 3 Paga 2" (= 33% off ao atingir múltiplos de 3) e se há outras (2x1, 5x4, etc.).
