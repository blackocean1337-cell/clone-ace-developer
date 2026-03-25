

## Plano: Substituir `mrtuga.com` → `mrtuga.co` em todo o código

### Ficheiros a alterar (6 ficheiros, ~77 ocorrências)

| Ficheiro | Alterações |
|----------|-----------|
| `src/components/fincut/SiteFooter.tsx` | `info@mrtuga.com` → `info@mrtuga.co` |
| `src/pages/FAQPage.tsx` | Todas as referências `info@mrtuga.com` → `info@mrtuga.co` |
| `src/pages/DeliveryPolicyPage.tsx` | `info@mrtuga.com` → `info@mrtuga.co` |
| `src/pages/RefundPolicyPage.tsx` | `info@mrtuga.com` → `info@mrtuga.co` |
| `src/pages/TermsPage.tsx` | `info@mrtuga.com` → `info@mrtuga.co` |
| `src/pages/PrivacyPage.tsx` | `mrtuga.com` → `mrtuga.co` (domínio e email) |

### O que será feito
Substituição direta de texto — trocar todas as ocorrências de `mrtuga.com` por `mrtuga.co` nos 6 ficheiros acima. Isto inclui emails (`info@mrtuga.com`) e referências ao domínio do site.

### Nota
A configuração do domínio custom no Lovable (DNS, etc.) é feita separadamente nas definições do projeto — esta alteração é apenas no conteúdo do código.

