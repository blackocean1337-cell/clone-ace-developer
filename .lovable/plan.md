Atualmente o formulário recolhe: nome, email, telemóvel, morada, código postal, cidade. Para enviar um `billing_address` completo à NYVA falta o **distrito** (mapeia para `state`). O país é fixo PT.

## Alterações em `src/pages/CheckoutPage.tsx`

1. **Novo state**: `const [district, setDistrict] = useState("")`.
2. **Novo campo no formulário** (logo a seguir ao código postal/cidade): `FormField` "Distrito" com placeholder "Lisboa, Porto, Setúbal…". Largura igual à da cidade (grid 2 colunas no desktop).
3. **Auto-preencher distrito a partir do CP** quando possível — estender `getCityFromPostal` (ou criar `getDistrictFromPostal`) com mapeamento simples por prefixo (1xxx→Lisboa, 2xxx→Setúbal/Lisboa, 3xxx→Coimbra, 4xxx→Porto, etc.). Não bloqueia edição manual.
4. **Validação**: adicionar `if (!district.trim()) e.district = "Distrito é obrigatório"` em `validate()` e em `isCardFormValid`.
5. **`createCardEmbed`**: substituir o `state: city` placeholder pelo `state: district` real no objeto `billing_address`.
6. **`handleSubmit` (MB Way / Shopify fallback)**: incluir distrito nos atributos enviados ao Shopify, se aplicável (manter consistência).

## Sem alterações

- Edge function `create-nyva-embed` já reencaminha `billing_address` tal como vem do cliente.
- País continua fixo `"PT"` no payload.
- Sem alterações em backend, RLS ou config.

## Ficheiros

- `src/pages/CheckoutPage.tsx` — novo state, campo no JSX, validação e payload.
- (opcional) helper de CP→distrito no mesmo ficheiro ou em `src/lib/`.