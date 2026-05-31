## Mudança

No `CartDrawer.tsx` (linhas 249-264), o botão "PASSAR AO PAGAMENTO" hoje chama `createCheckout` do Shopify e abre uma nova janela. Substituir por:

```tsx
onClick={() => {
  onClose?.();
  navigate("/checkout");
}}
```

Sem nova janela, sem chamada Shopify — o `/checkout` interno (que já tem a integração NYVA embed para cartão + MB Way) trata de tudo.

Nada mais é alterado: nem visual da CTA, nem outros pontos do drawer, nem o `/checkout`.