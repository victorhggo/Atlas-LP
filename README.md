# Atlaslike: landing page

Site estático da landing page do Atlas (www.atlaslike.com). HTML, CSS e JavaScript puros, sem build.

## Publicar
- **Netlify:** ligue este repositório (sem comando de build, pasta de publicação `/`) ou arraste a pasta em app.netlify.com/drop.
- **Hostinger:** envie o conteúdo para `public_html`, com o `index.html` na raiz.
- `.htaccess` configura a Hostinger (HTTPS, www, compressão e cache); `_headers` configura a Netlify.

## Estrutura
- `index.html`: a página
- `css/`, `js/`, `fontes/`, `img/`: estilos, efeitos, fontes e imagens
- `video/`: gravações do sistema em WebM e MP4, com poster WebP
- `robots.txt`, `sitemap.xml`, `llms.txt`: SEO e leitura por assistentes de IA

A LP antiga, em Next.js, está preservada na branch `lp-antiga`.
