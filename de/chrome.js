/* Solved · shared chrome — nav + footer injected into #nav and #footer.
   Plain vanilla JS so every page stays light and directly editable.

   PATH-AWARE: this file may be loaded from the site root (chrome.js) or from a
   nested blog post (../../chrome.js). We derive ROOT from this script's own
   resolved URL so every internal link/asset works at any depth and on any host
   (trysolved.com OR the github.io project page). */
(function () {
  // ---- Root prefix: absolute URL of the folder that contains this script ----
  var ME = document.currentScript;
  var ROOT = (ME && ME.src) ? ME.src.replace(/[?#].*$/, '').replace(/[^/]+$/, '') : '';

  // El CTA de demo apunta al #contacto de la propia página si existe; si no
  // (p. ej. dentro de un post del blog), lleva al contacto de la home.
  var demo = document.getElementById('contacto') ? '#contacto' : ROOT + '#contacto';

  /* ====== HubSpot · formularios embebidos ======
     Portal 20010689 (data center na1).

     Hay dos formularios y no uno: el de contacto pide lo de siempre, y el de
     /casos-de-exito/ pide sólo el correo para abrir los vídeos. Pedir nombre,
     empresa y teléfono para ver dos minutos de vídeo es lo que hace que nadie
     los vea.

     PENDIENTE: crear el segundo formulario en HubSpot y pegar aquí su id.
     Mientras `formIdVideo` esté vacío se sirve el de contacto, para que la
     página funcione entera —el gate abre igual—, pero el lead entra etiquetado
     como petición de contacto, que no es lo que ha pedido el visitante. */
  var HUBSPOT = {
    region: 'na1',
    portalId: '20010689',
    formId: 'f8dcbcf5-52c2-464d-a5b1-84824ce89992',
    formIdVideo: ''
  };

  var NAV =
  '<header class="nav"><div class="wrap nav__in">' +
    '<a class="nav__logo" href="' + ROOT + '"><img src="' + '/assets/logotipo-solved.webp" alt="Solved" width="1975" height="713" decoding="async"/></a>' +
    '<ul class="nav__links">' +
      '<li class="nav__item">' +
        '<button class="nav__link" type="button">Produkte <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '<div class="nav__menu">' +
          '<a href="' + ROOT + 'stoerungsmanagement/"><b>Störungen</b><span>Erfassen, zuweisen und mit dokumentiertem Abschluss lösen</span></a>' +
          '<a href="' + ROOT + 'digitale-checklisten/"><b>Aufzeichnungen und Audits</b><span>Digitale Kontrollen, Checklisten und Audits</span></a>' +
          '<a href="' + ROOT + 'dokumentenmanagement/"><b>Dokumentenverwaltung</b><span>Gültige Version, Ablaufdaten und Freigabe</span></a>' +
          '<a href="' + ROOT + 'korrekturmassnahmen/"><b>Aufgaben, Maßnahmen und Abweichungen</b><span>Korrekturmaßnahmen und Nachverfolgung bis zum Abschluss</span></a>' +
          '<a href="' + ROOT + 'anlagenverwaltung/"><b>Anlagen</b><span>Jede Maschine mit Datenblatt, QR-Code und Historie</span></a>' +
          '<a href="' + ROOT + 'dashboards/"><b>KPIs und Dashboards</b><span>360º-Sicht in Echtzeit und automatische Berichte</span></a>' +
          '<a href="' + ROOT + 'ki/"><b>KI</b><span>Fragen Sie Ihre Daten – die Antwort nennt die Meldung</span></a>' +
        '</div>' +
      '</li>' +
      '<li class="nav__item">' +
        '<button class="nav__link" type="button">Branchen <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '<div class="nav__menu">' +
          '<a href="' + ROOT + 'fertigungsindustrie/"><b>Fertigungsindustrie</b><span>Fertigung und Prozesse</span></a>' +
          '<a href="' + ROOT + 'lebensmittelindustrie/"><b>Lebensmittelindustrie</b><span>Lebensmittelsicherheit und -qualität</span></a>' +
        '</div>' +
      '</li>' +
      // Integraciones va sin submenú a propósito: sólo hay una página y el
      // acordeón móvil se engancha a `button.nav__link`, no a los enlaces.
      '<li class="nav__item">' +
        '<a class="nav__link" href="' + ROOT + 'integrationen/">Integrationen</a>' +
      '</li>' +
      '<li class="nav__item">' +
        '<button class="nav__link" type="button">Ressourcen <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '<div class="nav__menu">' +
          '<a href="' + ROOT + 'fallstudien/"><b>Fallstudien</b><span>Wie sie mit Solved arbeiten – von ihnen erzählt</span></a>' +
          '<a href="' + ROOT + 'blog/"><b>Blog</b><span>Artikel und Leitfäden zu Qualität und Industrie</span></a>' +
          '<a href="' + ROOT + 'glossar/"><b>Glossar</b><span>Fachbegriffe der Industrie erklärt</span></a>' +
        '</div>' +
      '</li>' +
      '<li class="nav__cta-mobile"><a class="btn btn--primary" href="' + demo + '">Demo anfordern</a></li>' +
    '</ul>' +
    '<a class="btn btn--primary nav__cta-desktop" href="' + demo + '">Demo anfordern</a>' +
    '<button class="nav__toggle" type="button" aria-label="Menü öffnen" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
  '</div></header>';

  var FOOTER =
  '<footer class="footer"><div class="wrap">' +
    '<div class="footer__in">' +
      '<div class="footer__brand">' +
        '<img class="f-logo" src="' + '/assets/logotipo-solved.webp" alt="Solved" width="1975" height="713" loading="lazy" decoding="async"/>' +
        '<p class="footer__addr">Edificio Angels, Sc Puerto, 13, Poblados Marítimos, 46024 Valencia</p>' +
        '<iframe class="footer__map" src="https://maps.google.com/maps?q=Edificio%20Angels%2C%20Carrer%20del%20Port%2013%2C%2046024%20Valencia&z=16&output=embed" title="Standort von Solved — Edificio Angels, Valencia" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
        '<a class="footer__social" href="https://www.linkedin.com/company/trysolved" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H19.6v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z"/></svg></a>' +
      '</div>' +
      '<div class="footer__col">' +
        '<h4>Solved</h4>' +
        '<ul>' +
          '<li><a href="' + ROOT + '">Start</a></li>' +
          '<li><a href="' + ROOT + 'digitale-checklisten/">Aufzeichnungen/Checklisten</a></li>' +
          '<li><a href="' + ROOT + 'stoerungsmanagement/">Störungsmanagement</a></li>' +
          '<li><a href="' + ROOT + 'dokumentenmanagement/">Dokumentenverwaltung</a></li>' +
          '<li><a href="' + ROOT + 'anlagenverwaltung/">Anlagenverwaltung</a></li>' +
          '<li><a href="' + ROOT + 'dashboards/">Dashboard</a></li>' +
          '<li><a href="' + ROOT + 'ki/">KI</a></li>' +
          '<li><a href="' + ROOT + 'integrationen/">Integrationen</a></li>' +
          '<li><a href="' + ROOT + 'fallstudien/">Fallstudien</a></li>' +
          '<li><a href="' + ROOT + 'blog/">Blog</a></li>' +
          '<li><a href="' + ROOT + 'glossar/">Glossar</a></li>' +
        '</ul>' +
      '</div>' +
      '<div class="footer__col">' +
        '<h4>Nützliche Links</h4>' +
        '<ul>' +
          '<li><a href="' + ROOT + 'cookie-richtlinie/">Cookie-Richtlinie</a></li>' +
          '<li><a href="' + ROOT + 'datenschutzerklaerung/">Datenschutzerklärung</a></li>' +
        '</ul>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div class="footer__strip"><div class="wrap footer__strip-in">' +
    '<img class="footer__lanzadera" src="' + '/assets/lanzadera.webp" alt="Lanzadera" width="1280" height="260" loading="lazy" decoding="async"/>' +
    '<div class="footer__eu">' +
      '<img src="' + '/assets/ivf-fondo.webp" alt="Gefördert von der Generalitat Valenciana, IVF (Institut Valencià de Finances) und der Europäischen Union" width="2238" height="403" loading="lazy" decoding="async"/>' +
    '</div>' +
  '</div></div>' +
  '<div class="footer__legal"><div class="wrap"><p>VOLTSTONE TECHNOLOGY SERVICES S.L. ha recibido una subvención por parte de la Generalitat Valenciana, dentro de la convocatoria: "Ayuda destinada a personas emprendedoras y pymes en apoyo al inicio y consolidación de su proyecto empresarial, para el ejercicio 2025 (EMPYME)", con número de expediente EMPYME/2025/254, por un importe de 14.995,95 €.</p></div></div>' +
  '</footer>';

  function buildHsForms() {
    if (!window.hbspt || !window.hbspt.forms) return;
    var holders = document.querySelectorAll('.hs-contact-form');
    for (var i = 0; i < holders.length; i++) {
      if (holders[i].getAttribute('data-hs-done')) continue;
      if (!holders[i].id) holders[i].id = 'hs-form-' + i;
      holders[i].setAttribute('data-hs-done', '1');
      // data-hs-form="video" pide el formulario corto del gate de vídeo; sin
      // atributo —o sin id todavía para ese formulario— va el de contacto.
      var quiereVideo = holders[i].getAttribute('data-hs-form') === 'video';
      window.hbspt.forms.create({
        region: HUBSPOT.region,
        portalId: HUBSPOT.portalId,
        formId: (quiereVideo && HUBSPOT.formIdVideo) ? HUBSPOT.formIdVideo : HUBSPOT.formId,
        target: '#' + holders[i].id
      });
    }
  }

  function injectHubSpot() {
    if (!document.querySelector('.hs-contact-form') || !HUBSPOT.formId) return;
    if (window.hbspt && window.hbspt.forms) { buildHsForms(); return; }
    if (!document.getElementById('hs-embed-script')) {
      var s = document.createElement('script');
      s.id = 'hs-embed-script';
      s.src = 'https://js.hsforms.net/forms/embed/v2.js';
      s.charset = 'utf-8';
      s.onload = buildHsForms;
      document.head.appendChild(s);
    } else {
      var t = setInterval(function () {
        if (window.hbspt && window.hbspt.forms) { clearInterval(t); buildHsForms(); }
      }, 150);
    }
  }

  function initBenefitsToggle() {
    var groups = document.querySelectorAll('.benefits-toggle');
    for (var g = 0; g < groups.length; g++) {
      (function (group) {
        var items = group.querySelectorAll('.bt');
        for (var i = 0; i < items.length; i++) {
          if (!items[i].querySelector('p')) continue; // solo los que tienen descripción
          items[i].addEventListener('click', function () {
            for (var j = 0; j < items.length; j++) items[j].classList.remove('bt--active');
            this.classList.add('bt--active'); // clic = se queda seleccionado
          });
        }
      })(groups[g]);
    }
  }

  function initMobileNav() {
    var header = document.querySelector('.nav');
    if (!header) return;
    var toggle = header.querySelector('.nav__toggle');
    var mq = window.matchMedia('(max-width: 1000px)');

    // Hamburguesa: abre/cierra el panel
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('nav--open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      });
    }

    // Acordeón en móvil: los <button> (Productos, Industrias) despliegan su submenú al tocarlos
    var triggers = header.querySelectorAll('.nav__item > button.nav__link');
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', function () {
        if (!mq.matches) return; // en escritorio sigue funcionando con hover
        var item = this.parentNode;
        var wasOpen = item.classList.contains('nav__item--open');
        var items = header.querySelectorAll('.nav__item');
        for (var j = 0; j < items.length; j++) items[j].classList.remove('nav__item--open');
        if (!wasOpen) item.classList.add('nav__item--open');
      });
    }

    // Al volver a escritorio, limpia el estado móvil
    mq.addEventListener('change', function (e) {
      if (!e.matches) {
        header.classList.remove('nav--open');
        var op = header.querySelectorAll('.nav__item--open');
        for (var k = 0; k < op.length; k++) op[k].classList.remove('nav__item--open');
        if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Menü öffnen'); }
      }
    });
  }

  function initCookieBanner() {
    var KEY = 'solved_cookie_consent';
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved) return; // ya eligió antes: no volver a mostrar
    var el = document.createElement('div');
    el.className = 'cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie-Hinweis');
    el.innerHTML =
      '<p class="cookie-banner__text">Wir verwenden eigene Cookies und Cookies von Dritten, um Ihre Erfahrung zu verbessern und die Nutzung der Website zu analysieren. Sie können sie annehmen oder ablehnen. Weitere Informationen in unserer <a href="' + ROOT + 'cookie-richtlinie/">Cookie-Richtlinie</a>.</p>' +
      '<div class="cookie-banner__actions">' +
        '<button class="btn btn--secondary" type="button" data-cookie="reject">Ablehnen</button>' +
        '<button class="btn btn--primary" type="button" data-cookie="accept">Akzeptieren</button>' +
      '</div>';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('cookie-banner--in'); });
    el.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cookie]');
      if (!btn) return;
      try { localStorage.setItem(KEY, btn.getAttribute('data-cookie')); } catch (e2) {}
      el.classList.remove('cookie-banner--in');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    });
  }

  function inject() {
    var n = document.getElementById('nav');
    if (n) n.innerHTML = NAV;
    var f = document.getElementById('footer');
    if (f) f.innerHTML = FOOTER;
    injectHubSpot();
    initBenefitsToggle();
    initMobileNav();
    initCookieBanner();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();

/* ====== Selector de idioma ======
   Se construye con los <link rel="alternate" hreflang> que ya lleva la página,
   así que apunta siempre a la traducción exacta de ESTA página y no a la home
   del idioma, que es el error clásico y el que hace que Google trate las
   versiones como duplicados sueltos. */
(function () {
  var NOMBRES = {"es":"Español","en":"English","fr":"Français","it":"Italiano","de":"Deutsch"};

/* El resto de chrome.js pinta la nav en DOMContentLoaded, así que esto tiene
   que esperar igual: montado a la primera no encontraba .nav__links y salía sin
   hacer nada, que es como el selector estuvo invisible en los cinco idiomas. */
function montarSelector() {
  var actual = document.documentElement.lang || 'es';
  var alt = [].slice.call(document.querySelectorAll('link[rel="alternate"][hreflang]'))
    .filter(function (l) { return l.hreflang !== 'x-default' && NOMBRES[l.hreflang]; });
  if (alt.length < 2) return;

  var nav = document.querySelector('.nav__links');
  if (!nav) return;

  var li = document.createElement('li');
  li.className = 'nav__item nav__item--lang';
  var opciones = alt.map(function (l) {
    var activo = l.hreflang === actual ? ' aria-current="true"' : '';
    // Sólo la ruta: los hreflang son absolutos contra trysolved.com —tienen que
    // serlo— y usarlos tal cual sacaba del sitio a quien mirase la web en local
    // o en la página de github.io. Es la misma razón por la que chrome.js
    // deriva ROOT en vez de escribir el dominio.
    var ruta = l.href;
    try { ruta = new URL(l.href, location.href).pathname; } catch (e) {}
    return '<a href="' + ruta + '" lang="' + l.hreflang + '"' + activo + '>' +
           NOMBRES[l.hreflang] + '</a>';
  }).join('');
  li.innerHTML =
    '<button class="nav__link" type="button" aria-label="' + NOMBRES[actual] + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">' +
        '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/>' +
      '</svg> ' + actual.toUpperCase() +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>' +
    '</button>' +
    '<div class="nav__menu nav__menu--lang">' + opciones + '</div>';

  var cta = nav.querySelector('.nav__cta-mobile');
  if (cta) nav.insertBefore(li, cta); else nav.appendChild(li);
}

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montarSelector);
  else montarSelector();
})();
