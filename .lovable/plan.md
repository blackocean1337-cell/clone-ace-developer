## Objetivo

Expandir o catálogo MRTUGA com todas as cores da Fincut + as extras que pediste, aplicando-as consistentemente a todos os modelos onde faz sentido. Sem adicionar produto "Meias".

## Paleta final da t-shirt Icónica (11 cores)

Baseado no Fincut (BLACK, WHITE, BLUE/navy, KAKI, GREY, SKYBLUE, SALMON, TURQ) + extras pedidas (Bordeaux, Bege, Verde militar):

| # | Nome PT-PT | Hex | Origem |
|---|---|---|---|
| 1 | Preto | #1a1a1a | já existe |
| 2 | Branco | #f5f5f0 | já existe |
| 3 | Azul marinho | #2c3e6b | já existe |
| 4 | Caqui | #5c6b4e | já existe |
| 5 | **Cinzento** | #9b9b9b | nova |
| 6 | **Azul céu** | #7fb5d5 | Fincut SKYBLUE |
| 7 | **Salmão** | #e8a598 | Fincut SALMON |
| 8 | **Turquesa** | #4fb8a8 | Fincut TURQ |
| 9 | **Bordeaux** | #6b1f2a | extra |
| 10 | **Bege** | #d9c7a8 | extra |
| 11 | **Verde militar** | #3d4a2a | extra |

## Aplicação por modelo (as novas cores aparecem só onde faz sentido)

- **A t-shirt Icónica** (`t-shirt-tech` + variantes de cor): as 11 cores acima.
- **A t-shirt Gola V** (`t-shirt-col-v`): 11 cores (mesmo tecido/base).
- **A t-shirt Manga Comprida** (`t-shirt-manches-longues`): já tinha 5, ampliar para as 11.
- **A t-shirt Icónica em V / Polo** (`polo`): mantém restrição **Preto + Branco** (regra existente na memória — não expandir).
- **A Camisola** (`pull`): mantém 3 cores (Preto, Azul marinho, Cinzento) — a Fincut também limita muito o pullover; não faz sentido pôr salmão/turquesa numa camisola.

## Imagens

Sem sobrescrever imagens existentes. Para cada cor nova, cada modelo passa a mostrar automaticamente:
- **Swatch**: bolinha colorida gerada pelo `hex` (já é assim que o site faz — não requer imagem).
- **Gallery/pack images**: fallback para as imagens da cor Preto do mesmo modelo, com um overlay/etiqueta discreta "Em breve" no card da galeria quando `image === fallback`. Assim a página não fica vazia e ficas com um sinal claro do que falta uploadar em `/admin/imagens`.

Alternativa (se preferires): gerar mockups por IA para cada combinação modelo × cor nova (≈21 imagens). Diz-me se queres esta via em vez do fallback.

## Variantes por cor da Icónica na home

A Icónica atualmente tem 4 páginas dedicadas por cor (`t-shirt-tech`, `t-shirt-blanc`, `t-shirt-navy`, `t-shirt-kaki`) usadas na `IconiqueSection`. **Não** vou criar 7 páginas novas para as cores adicionais — ficam disponíveis via seletor de cor dentro das páginas existentes (Fincut também faz assim: uma única URL com `?Couleur=...`). Mantemos os 5 cards fixos da secção Icónica intactos.

## Detalhes técnicos

**Ficheiros alterados:**
- `src/data/products.ts` — expandir `defaultColors` para 11 entradas; atualizar `colors` de `t-shirt-col-v`, `t-shirt-manches-longues`; deixar `polo` e `pull` como estão.
- `src/pages/ProductPage.tsx` (ou componente do color picker) — garantir que swatches sem imagem associada usam fallback para imagem base do modelo + label "Em breve".
- `src/components/MegaMenu.tsx` / links de header/footer — sem alterações (continuam a apontar para os 4 slugs principais).

**Sem alterações:**
- Shopify mapping (todos os variants continuam a 18€, o color é atributo de linha).
- Rotas, packs, checkout, cart.

## Fora do âmbito

- Meias (excluído por ti).
- Novos produtos além dos existentes.
- Uploads reais de fotos (esperamos que forneças em `/admin/imagens` quando estiverem prontas).

Confirma e passo à implementação — ou diz se preferes que eu gere mockups por IA para as 21 combinações em vez do fallback "Em breve".