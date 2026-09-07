// _acceso.js — lo genera scripts/build-preview.mjs. No se edita a mano.
//
// Cortina, no cerradura: esto corre en el navegador de quien mira, así que se
// salta con las herramientas de desarrollo o pidiendo el HTML con curl, y el
// repo de esta preview es público. Está para que quien llegue de casualidad a
// la URL no se encuentre el borrador, nada más.
(function () {
  var HASH = "1ba28d0ba59e8d28ad543a53bace2362b6468698e8606f7da9309eab0e142fa1";
  var SAL = "web-solved-3-preview";
  var GUARDADO = 'solved-preview-acceso';
  var raiz = document.documentElement;

  try { if (localStorage.getItem(GUARDADO) === HASH) return; } catch (e) {}

  raiz.className += ' acceso-cerrado';
  var estilo = document.createElement('style');
  estilo.textContent = [
    'html.acceso-cerrado{visibility:hidden;overflow:hidden}',
    'html.acceso-cerrado #acceso{visibility:visible}',
    '#acceso{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;',
      'background:#0f1216;color:#fff;font:400 16px/1.5 "DM Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:24px}',
    '#acceso .caja{width:100%;max-width:360px;text-align:left}',
    '#acceso img{height:26px;width:auto;margin-bottom:40px;display:block}',
    '#acceso h1{font-size:26px;font-weight:300;letter-spacing:-.01em;margin:0 0 10px}',
    '#acceso p{margin:0 0 28px;color:rgba(255,255,255,.55);font-size:14px;font-weight:300}',
    '#acceso label{display:block;font-size:12px;letter-spacing:.04em;text-transform:uppercase;',
      'color:rgba(255,255,255,.45);margin-bottom:8px}',
    '#acceso input{width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);color:#fff;',
      'border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:13px 14px;font-size:16px;font-family:inherit;outline:none}',
    '#acceso input:focus{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.09)}',
    '#acceso button{width:100%;margin-top:12px;background:#fff;color:#0f1216;border:0;border-radius:10px;',
      'padding:13px 14px;font-size:15px;font-family:inherit;font-weight:500;cursor:pointer}',
    '#acceso button:hover{background:rgba(255,255,255,.88)}',
    '#acceso .fallo{min-height:20px;margin:12px 0 0;font-size:13px;color:#ff8a7a}',
    '#acceso .pie{margin:36px 0 0;font-size:12px;color:rgba(255,255,255,.3);font-weight:300}'
  ].join('');
  (document.head || raiz).appendChild(estilo);

  function hex(buffer) {
    var vista = new Uint8Array(buffer), salida = '';
    for (var i = 0; i < vista.length; i++) salida += ('0' + vista[i].toString(16)).slice(-2);
    return salida;
  }

  function comprobar(texto) {
    // crypto.subtle sólo existe en contexto seguro; en https de Pages lo hay.
    if (!window.crypto || !crypto.subtle) return Promise.resolve(null);
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(SAL + ':' + texto)).then(hex);
  }

  function montar() {
    var capa = document.createElement('div');
    capa.id = 'acceso';
    capa.innerHTML = '<div class="caja">' +
      '<img src="/assets/logotipo-solved-claro.webp" alt="Solved">' +
      '<h1>Borrador de la web</h1>' +
      '<p>Esta copia no está publicada y no es el sitio de Solved. Para verla hace falta la contraseña.</p>' +
      '<form autocomplete="off">' +
        '<label for="acceso-clave">Contraseña</label>' +
        '<input id="acceso-clave" type="password" autocomplete="current-password" autofocus>' +
        '<button type="submit">Entrar</button>' +
        '<p class="fallo" role="alert"></p>' +
      '</form>' +
      '<p class="pie">El sitio publicado es trysolved.com</p>' +
    '</div>';
    document.body.appendChild(capa);

    var formulario = capa.querySelector('form');
    var campo = capa.querySelector('input');
    var fallo = capa.querySelector('.fallo');

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      comprobar(campo.value).then(function (resultado) {
        if (resultado === HASH) {
          try { localStorage.setItem(GUARDADO, HASH); } catch (e) {}
          raiz.className = raiz.className.replace(/\s*acceso-cerrado/, '');
          capa.parentNode.removeChild(capa);
          return;
        }
        fallo.textContent = resultado === null
          ? 'Este navegador no puede comprobar la contraseña.'
          : 'No es esa.';
        campo.value = '';
        campo.focus();
      });
    });
    campo.focus();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
