# Ler+Saúde - MVP website (based on GP template)

## Objetivo
Criar um MVP para demonstrar a API Ler+Saúde com um site interativo que permita a potenciais clientes experimentar a API, entender os benefícios e inscrever-se para acesso antecipado.

## O que foi implementado
- Uso do template `GP` existente.
- Conteúdo traduzido e adaptado para português com o posicionamento da Ler+Saúde.
- Secção `Demo` com: textarea, seleção de exemplo, opção de usar mock ou endpoint real, e um resultado formatado.
- Secção `Preços` com 3 planos (Starter, Pro, Enterprise).
- Formulário de `Contactos` traduzido para português e boletim (newsletter) de opt-in.
- `mock-api/server.js`: um servidor Node simples para testar a chamada real do demo.

## Como testar localmente
1. Abrir o ficheiro `index.html` no browser (duplo clique) ou lançar um servidor local (recomendado) com `npx http-server` ou similar.

2. Para testar o endpoint real com um mock local:
```powershell
cd mock-api
npm install
npm start
```
Isto iniciará um servidor em http://localhost:3000 com um endpoint POST `/explain`.

3. No site, vá para a secção `Demo`, cole um relatório ou escolha um exemplo, desmarque "Usar simulação (mock)" e defina o campo `Endpoint` para `http://localhost:3000/explain`, depois clique em `Explicar`.

4. Para usar o mock interno do frontend, mantenha a opção `Usar simulação (mock)` ativa e clique em `Explicar`.

### Analytics e Lead Capture (Mock)
O `mock-api` agora inclui dois endpoints adicionais para ajudar a validar interesse dos utilizadores:

- POST `/leads` - Aceita JSON com campos (email, would_buy, calls_per_month, budget, page, etc.) e grava entradas em `mock-api/leads.json`.
- POST `/analytics` - Aceita eventos via JSON `{ event: string, payload: object }` e grava em `mock-api/analytics.json`.

Estes endpoints são usados pelo front-end: o site grava os eventos de demo, cliques em CTAs e envios de formulários para o mock server quando ele estiver a correr em `http://localhost:3000`.

Para ver os registos no mock server:
```powershell
# start mock API
cd mock-api
npm install
npm start
# then view logs by opening the JSON files
type .\leads.json
type .\analytics.json
```

Nota: Em produção, substitua os endpoints por um serviço seguro (CRM, Google Sheets via Apps Script, Airtable webhook, etc.), e não envie texto clínico sensível a analytics.

## Próximos passos sugeridos (MVP -> validação de mercado)
- Integrar um analytics simples (ex.: Google Analytics, Plausible) para medir cliques, interações no demo e conversões no formulário.
- Instalar um simples CRM ou base de dados para guardar leads do formulário de contacto.
- Preparar testes de usabilidade e landing page A/B para medir interesse e aceitar feedback.
- Criar um formulário de survey curto para colher intenção de compra (e.g. interesse por volume, orçamento e prazo).

## Observações técnicas
- A arquitetura do frontend permite trocar facilmente a origem do endpoint.
- Se for usar o endpoint real, garanta CORS no servidor e autenticação adequada.

Se quiser, eu posso:
- Adicionar tracking de eventos para medir interesse/ intenção de compra.
- Criar um pequeno script para gravar leads num Google Sheet (via Apps Script) ou em um backend leve.
- Subir um build estático para Netlify / Vercel enquanto faz testes de validação.

## Dashboard local (ver Leads & Events) - removido
O dashboard local (`dashboard.html` e `assets/js/dashboard.js`) foi removido do repositório por pedido. Pode consultar os endpoints do `mock-api` diretamente:
- Leads (GET /leads)
- Analytics events (GET /analytics)
Use uma ferramenta como `curl`, `httpie` ou `npx http-server` para servir a pasta e consulte os endpoints para ver os dados armazenados pelo servidor mock.

Note sobre a imagem do site:
- Para usar a imagem mostrada por defeito na secção "Sobre" (consulta médica), faça upload do ficheiro de imagem que pretende para `assets/img/doctor-consult.jpg`. Caso não suba essa imagem, o site continuará a usar `assets/img/about.jpg` por defeito.

## Google Sheets - instruções rápidas
Um Apps Script foi incluído em `google-sheets/Code.gs`. Siga o ficheiro `google-sheets/README.md` para configurar o webhook que grava leads em Google Sheets. Depois de publicar o webhook, cole a URL do webhook no meta tag `sheets-webhook-url` em `index.html` para que os leads sejam enviados para a Google Sheet.

## A/B Test
## Hero background: YouTube video
To set a YouTube video as the hero background (the line that says "Transforme relatórios...") you can add the YouTube ID to the `<meta name="hero-youtube-id" content="...">` tag in `index.html`.

Example: to use the video with URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, set the meta like:
```html
<meta name="hero-youtube-id" content="dQw4w9WgXcQ">
```
Or directly on the wrapper using the `data-video-id` attribute:
```html
<div class="hero-video-wrapper" data-video-id="dQw4w9WgXcQ"> ... </div>
```
If you want only the first 10 seconds of a video to loop, set the start and end meta tags, for example:
```html
<meta name="hero-youtube-id" content="VRGFnhOpQU0">
<meta name="hero-youtube-start" content="0">
<meta name="hero-youtube-end" content="10">
```
This will loop the first 10 seconds of the video with ID `VRGFnhOpQU0` (the unique ID from the URL `https://youtu.be/VRGFnhOpQU0`).

Adjusting hero size and contrast
- You can tweak the hero's size and overlay darkness through CSS variables in `assets/css/main.css`.
- Open that file and edit the `:root` variables:
	- `--hero-overlay-opacity` — lowers or increases the overlay darkness (0 to 1). Example: `0.08` (light) or `0.25` (darker).
	- `--hero-video-scale` — increases the video scale to make it appear larger. Example: `1.25` for 25% larger.
	- `--hero-min-height` — controls hero height, can use `100vh` for full-screen hero.

Example to make the hero very large and overlay very light:
```css
:root {
	--hero-overlay-opacity: 0.04;
	--hero-video-scale: 1.3;
	--hero-min-height: 110vh; /* be mindful of layout on smaller screens */
}
```

Notes:
- The video is loaded in an iframe and will autoplay muted, loop, and play inline where supported. Autoplay typically requires the `mute` parameter and some browsers prevent autoplay with sound.
- If you leave the meta blank, the hero will fall back to the original background image `assets/img/hero-bg.jpg` instead of the video.
- The video is embedded with `controls=0`, `modestbranding=1` and `rel=0` to keep the presentation uncluttered. If you need a different behaviour, update the iframe building code in `assets/js/main.js`.
- Mobile browsers might block autoplay or scale the iframe; behaviour depends on browser. Consider a short loopable video that doesn't include identifiable patient data.
## Analytics Providers (Google Analytics / Plausible)
You can enable Google Analytics or Plausible by adding the corresponding ID / domain to the `index.html` meta tags:

- Google Analytics (GA4): `<meta name="analytics-ga-id" content="G-XXXXXXX">`
- Plausible: `<meta name="analytics-plausible-domain" content="yourdomain.com">`

The site will attempt to load the provider scripts and send events (`demo_submit`, `contact_submit`, `newsletter_submit`, `cta_*`, `copy_result`, `copy_json`, `ab_variant_assigned`). If not configured, events are still saved to the mock analytics endpoint when running local server.

Note: For Plausible, set the domain as configured on your Plausible site and ensure plausible automatic tracking is allowed. For Google Analytics, use the GA4 measurement ID (G-XXXX). The client-side implementation loads the corresponding snippet dynamically.
O site implementa um A/B test simples que alterna o título do Hero entre duas variantes e regista a variante atribuída em localStorage. Os eventos gerados a partir das interacções (ex: demo_submit, newsletter_submit, CTA clicks) são enviados ao endpoint analytics (mock ou Plausible/GA quando configuradas) e permitem validar a variante que converte melhor.

Boa continuação — quer que eu implemente analytics e um pequeno survey para validar intenção de compra (sim/não/quantidade/vínculo à instituição)?
