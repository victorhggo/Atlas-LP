/* Origem do anúncio (primeiro toque). Grava o cookie atlas-origem, o mesmo formato do quiz e do Atlas:
   JSON compacto { us, um, uc, ut, uk, as, fc, lp, em }, 90 dias, domain=.atlaslike.com.
   Só é gravado de novo quando a URL traz parâmetro de anúncio. O fbclid (fc) só entra com o consentimento "todos". */
(function () {
  "use strict";
  var COOKIE = "atlas-origem", CONSENT = "atlas-cookies", DIAS = 90;
  var MAPA = { utm_source: "us", utm_medium: "um", utm_campaign: "uc", utm_content: "ut", utm_term: "uk", adset_id: "as" };

  function lerCookie(nome) {
    var partes = document.cookie ? document.cookie.split("; ") : [];
    for (var i = 0; i < partes.length; i++) {
      var p = partes[i], k = p.indexOf("=");
      if (k > 0 && p.slice(0, k) === nome) { try { return decodeURIComponent(p.slice(k + 1)); } catch (e) { return p.slice(k + 1); } }
    }
    return null;
  }
  function consentimento() {
    var c = lerCookie(CONSENT);
    if (c === "todos" || c === "essenciais") return c;
    try { var v = JSON.parse(localStorage.getItem(CONSENT) || "null"); if (v && v.v === 1) return v.medicao ? "todos" : "essenciais"; } catch (e) { /* sem localStorage */ }
    return "essenciais"; // sem escolha ainda conta como essenciais
  }
  function atributos(dias) {
    var h = location.hostname, a = "; path=/; max-age=" + dias * 86400 + "; samesite=lax";
    if (h === "atlaslike.com" || /\.atlaslike\.com$/.test(h)) a += "; domain=.atlaslike.com";
    if (location.protocol === "https:") a += "; secure";
    return a;
  }
  function limpo(v, max) { return String(v).replace(/[\u0000-\u001f]/g, "").slice(0, max); }

  function capturar() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { return; }
    var todos = consentimento() === "todos";
    var o = {}, anuncio = false;
    Object.keys(MAPA).forEach(function (k) {
      var v = q.get(k);
      if (v) { o[MAPA[k]] = limpo(v, 200); anuncio = true; }
    });
    var fbclid = q.get("fbclid");
    if (fbclid && todos) { o.fc = limpo(fbclid, 500); anuncio = true; }
    if (!anuncio) return; // sem parâmetro de anúncio: mantém o primeiro toque que já existe
    o.lp = limpo(location.hostname + location.pathname, 200);
    o.em = new Date().toISOString();
    try { document.cookie = COOKIE + "=" + encodeURIComponent(JSON.stringify(o)) + atributos(DIAS); } catch (e) { /* cookies bloqueados */ }
  }

  function seguro() { try { capturar(); } catch (e) { /* cookies ou storage bloqueados: sem origem, sem erro */ } }
  seguro();
  // aceitou depois de chegar pelo anúncio: regrava para incluir o fbclid
  try { document.addEventListener("atlas:consentimento", function (e) { if (e.detail && e.detail.medicao) seguro(); }); } catch (e) { /* ignora */ }
})();
