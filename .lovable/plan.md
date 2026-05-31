## Problema

O `/checkout` lê os itens do `CartContext` (persistido em `localStorage` como `mrtuga-cart`). Mas o `CustomPackSection` (o fluxo do PackBuilder em `src/components/fincut/CustomPackSection.tsx`) mantém um estado local próprio (`cartItems`) e renderiza o seu próprio `CartDrawer`, ignorando completamente o `CartContext`. Resultado: tudo o que é adicionado via PackBuilder nunca chega ao contexto global nem ao localStorage, e `/checkout` aparece sempre vazio.

## Correção

Em `src/components/fincut/CustomPackSection.tsx`:

1. Importar `useCart` de `@/context/CartContext`.
2. Remover o estado local `cartOpen` e `cartItems` e o `CartDrawer` local.
3. Em `handleAddToCart`, em vez de `setCartItems(...)` + `setCartOpen(true)`, percorrer as cores e chamar `addItem(...)` por cada uma (usa a mesma forma de `CartItem` já construída) e depois `openCart()`. O `GlobalCartDrawer` no `App.tsx` trata do resto.
4. Remover o import já inutilizado de `CartDrawer` (mantendo apenas o tipo `CartItem`).

Sem outras alterações: o `/checkout`, o `CartContext` e o `GlobalCartDrawer` ficam exatamente como estão.
