# Iframe NYVA inline no /checkout

Mover o iframe da NYVA para **dentro** da página `/checkout`, logo abaixo do seletor MB Way / Cartão, em vez de abrir como overlay full-screen.

## Comportamento

- **MB Way selecionado** (default): nada muda — mostra o campo "Número MB Way" + botão grande "FINALIZAR COMPRA — PAGAR Xé" como hoje.
- **Cartão selecionado**:
  1. Painel inline aparece debaixo dos dois botões de método.
  2. Se os dados de envio (email, nome, telemóvel, morada, CP, cidade) **ainda não estão preenchidos** → mostra aviso: "Preenche os dados acima para pagar com cartão" + link âncora.
  3. Quando válido → chama `create-nyva-embed` automaticamente (uma vez), com loader "A preparar pagamento seguro…".
  4. Quando `embed_url` chega → renderiza `<iframe>` inline (≥620 px de altura, full width do container) com header mini "🔒 PAGAMENTO SEGURO".
  5. O botão grande "FINALIZAR COMPRA" **desaparece** com cartão (o pagamento é feito dentro do iframe). MB Way mantém o botão.
  6. Se o utilizador editar campos depois → invalida o iframe e mostra botão "Atualizar pagamento" para regenerar.

## Detalhes técnicos

- Remover o uso do `NyvaEmbedOverlay` no `CheckoutPage.tsx` (o componente pode ficar, mas deixa de ser importado/renderizado).
- Novo `useEffect` que dispara `create-nyva-embed` quando `payment === "card"` && form válido && `embedUrl` está null && total > 0. Debounce simples via flag `isCreatingEmbed` para evitar chamadas duplicadas.
- `handleSubmit` deixa de ter ramo `card` — só trata MB Way (Shopify fallback).
- O iframe inline reutiliza os mesmos `allow` e `postMessage` listener de sucesso/cancelamento que estão no `NyvaEmbedOverlay`.
- Recálculo do `total` (com promo TUGA1) já é o que passa para `amount`.
- Em caso de erro do edge function, mostrar mensagem inline com botão "Tentar novamente".

## Ficheiros

- `src/pages/CheckoutPage.tsx` — remover overlay, adicionar painel inline com iframe + estados (`isCreatingEmbed`, `embedError`), ocultar mega-CTA quando `payment === "card"`.
- `src/components/checkout/NyvaInlinePanel.tsx` (novo, opcional) — encapsula iframe + listener `postMessage` + header mini. Mantém o código do `CheckoutPage` legível.

Sem alterações em edge functions ou backend.
