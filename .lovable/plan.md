# Auditoria de Credibilidade — MRTUGA

Objetivo: garantir que todas as páginas transmitem a imagem de uma loja premium que fatura 10k€/dia. Vou fazer uma passagem sistemática página a página, identificar problemas e corrigir.

## Fase 1 — Auditoria (sem mudar código)

Vou abrir cada página no preview, tirar screenshot e listar problemas de credibilidade:

1. `/` — Homepage
2. `/products/t-shirt-tech` (Preto), `/t-shirt-blanc`, `/t-shirt-navy`, `/t-shirt-kaki`, `/polo` — Páginas de produto
3. `/checkout` — Checkout
4. `/faq` — FAQ
5. `/acompanhar-encomenda` — Tracking
6. `/historia` — História
7. `/termos`, `/privacidade`, `/politica-entrega`, `/politica-reembolso`, `/intellectual-property` — Páginas legais

Para cada página vou verificar:
- **Layouts partidos** (texto cortado, imagens em falta, espaçamentos esquisitos)
- **Erros de cópia** (typos PT-PT, frases genéricas, "Lorem ipsum")
- **Links partidos** (404, botões sem ação)
- **Inconsistências de marca** (cores, fontes, logo, tom)
- **Sinais de baixa credibilidade** (placeholders, emojis em excesso, cópia exagerada estilo dropshipping, badges falsas)
- **Mobile vs desktop** (viewport 375 e 1280)
- **Console errors / network 404s**

## Fase 2 — Correções priorizadas

Depois da auditoria devolvo um **relatório consolidado** com:
- ✅ O que está bom
- ⚠️ O que precisa de polish (pequenas correções)
- 🔴 O que está partido (correção obrigatória)

E aplico as correções por ordem de impacto:
1. Bugs visuais e funcionais (links partidos, layouts partidos)
2. Cópia (PT-PT correto, tom premium, remover linguagem dropshipping)
3. Polish visual (espaçamentos, hierarquia tipográfica, contraste)
4. Sinais de confiança (reviews, garantias, social proof, segurança no checkout)

## Detalhes técnicos

- Uso `browser--navigate_to_sandbox` + `browser--screenshot` para QA visual de cada página em desktop (1280) e mobile (375).
- Uso `browser--read_console_logs` e `browser--list_network_requests` para detetar erros silenciosos.
- Não toco no `CheckoutPage` lógica de pagamentos (Stripe está em testing).
- Não toco em `src/integrations/supabase/*`, `.env`, `supabase/config.toml`.
- Mantenho regras de memória: PT-PT, fontes Montserrat/Inter, CTA #FACC15, `object-contain` em imagens de produto, etc.
- Não adiciono badges/credenciais falsas (ex: "As seen on Forbes" se não for verdade) — só sinais de confiança legítimos baseados no que já existe.

## O que NÃO vou fazer

- Não vou inflacionar números falsos (vendas falsas, contadores fake) — isso prejudica a marca e é potencialmente ilegal (publicidade enganosa em PT/UE).
- Não vou refazer o design system — só polish dentro do existente.
- Não vou mexer em backend (Shopify, Stripe, Supabase) a menos que encontre algo partido.

## Entregável

Um relatório no chat com: páginas auditadas, problemas encontrados, correções aplicadas, e screenshots antes/depois das mudanças mais relevantes.

## Tempo / scope

É uma tarefa longa. Vou dividir em vários passos e ir reportando progresso. Se preferires que foque primeiro só em homepage + product page (as 2 páginas que mais convertem), diz e priorizo essas.
