// Luddite HM only (not part of Luddite). hm.sh adds this script to the page.
// For Horace Mann administrators it puts "Administrator" at the top of the
// page, linking to admin.html, where they can read every Horace Mann writing
// session, draft, paper and mark-up. Everyone else sees nothing: the server
// answers /luddite/admin/me only for administrators.
(function () {
  'use strict';
  var API = 'https://2zzmrvoptttg6stc5cfjdsz3za0cryjt.lambda-url.us-east-1.on.aws';
  var AUTH_KEY = 'luddite.auth.v1'; // the page's own saved sign-in
  var checked = null, bar = null;

  function token() { try { return localStorage.getItem(AUTH_KEY); } catch (e) { return null; } }

  function show(admin) {
    if (bar) return;
    var style = document.createElement('style');
    style.textContent =
      '.hm-admin-bar { position: fixed; top: 0; left: 50%; transform: translateX(-50%); z-index: 9999;' +
      ' font: 600 12px/1 "Bricolage Grotesque", system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase;' +
      ' background: #2B2118; color: #FAF6EC; padding: 6px 12px; border-radius: 0 0 8px 8px; text-decoration: none; }' +
      '.hm-admin-bar:hover { background: #55612D; }' +
      '@media print { .hm-admin-bar { display: none; } }';
    document.head.appendChild(style);
    bar = document.createElement('a');
    bar.className = 'hm-admin-bar';
    bar.href = 'admin.html';
    bar.textContent = 'Administrator';
    bar.title = admin.manager ? 'Add or remove Luddite HM administrators' : 'Open the administrator view';
    document.body.appendChild(bar);
  }
  function hide() { if (bar) { bar.remove(); bar = null; } }

  function check() {
    var t = token();
    if (t === checked) return;
    checked = t;
    if (!t) { hide(); return; }
    fetch(API + '/luddite/admin/me', { headers: { Authorization: 'Bearer ' + t } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (token() !== t) return; if (d && d.admin) show(d.admin); else hide(); })
      .catch(function () { checked = null; });
  }
  check();
  // Signing in or out changes the saved sign-in; follow it.
  setInterval(check, 3000);
})();
