Remover o logo do topbar em `src/pages/CheckoutPage.tsx`:

- Apagar a linha 272 (`<img src={checkoutLogo} ... />`).
- Remover o import `checkoutLogo` (linha 15) já não usado.
- Manter a sticky topbar e a progress bar; a div passa a ficar vazia mas com o mesmo padding para não saltar o layout.