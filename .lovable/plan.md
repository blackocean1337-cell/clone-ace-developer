# Código promocional TUGA1 — tudo a 1€

Criar um código promocional secreto que, quando aplicado, passa o preço unitário de cada artigo do carrinho para **1€**. Envio e personalização continuam a aplicar-se às regras normais.

## Comportamento

- Código (case-insensitive): **`TUGA1`**
- Aplicável em dois sítios já existentes:
  1. Campo "CÓDIGO PROMO" do `CartDrawer` (já tem input + botão APLICAR, hoje sem lógica)
  2. Novo campo "Código promocional" no `CheckoutPage` (linha acima do resumo de totais)
- Persistência: guardado em `localStorage` como `mrtuga-promo` para sobreviver à navegação cart → checkout
- Feedback: badge verde "✓ TUGA1 aplicado — tudo a 1€" + link "remover"
- Códigos inválidos mostram erro inline "Código inválido"

## Cálculo

Quando promo === `TUGA1`:
```
subtotalOriginal = Σ unitPrice * qty
subtotal         = Σ 1 * qty           ← cada artigo passa a 1€
desconto         = subtotalOriginal − subtotal
shippingCost     = subtotal >= 55 ? 0 : 4.90   (regra normal mantida)
total            = subtotal + shippingCost + personalizationCost
```

Resumo no checkout passa a mostrar:
```
Subtotal              <riscado>XX.XX€</riscado>  YY.YY€
Desconto (TUGA1)      −ZZ.ZZ€
Envio                 ...
Total                 ...
```

## Integração com pagamento

O `total` recalculado já é o valor passado para:
- `create-nyva-embed` (cartão) → `amount: total`
- Fluxo MB Way / Shopify fallback

Os metadados enviados para a edge function passam a incluir `promo_code: "TUGA1"` e o `unitPrice` de cada item já reflecte o 1€, para que o backend/Shopify receba os valores corretos sem precisar de alterações.

## Ficheiros a alterar

- `src/lib/promo.ts` (novo) — `applyPromo(items, code)` puro, devolve `{ items, discount, code }`. Centraliza a regra para reutilizar.
- `src/pages/CheckoutPage.tsx` — campo de input do promo, badge de aplicado, recalcular `subtotal`/`total`, mostrar linha de desconto, ler `mrtuga-promo` no mount.
- `src/components/fincut/CartDrawer.tsx` — ligar o input/botão APLICAR existente à mesma função, guardar em `localStorage`, mostrar badge aplicado, refletir total descontado no botão "PASSAR AO PAGAMENTO".

Sem alterações de backend, edge functions, Shopify ou Stripe — o código vive só no frontend.
