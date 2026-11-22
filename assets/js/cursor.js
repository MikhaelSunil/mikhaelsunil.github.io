/* =========================================================================
   CURSOR.JS  —  Replaces the mouse pointer with a small quadcopter whose
   rotors spin faster the quicker you move.

   Only runs for a real mouse (pointer: fine) and only if the visitor has
   not asked for reduced motion. Touch devices and keyboard users are
   untouched, and the native cursor is only hidden once the drone is
   actually on screen, so a failure here can never leave someone with no
   pointer at all.
   ========================================================================= */

window.MSCursor = (function () {
  'use strict';

  var SVG = '' +
    '<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<line x1="11" y1="11" x2="33" y2="33" stroke="#1C1B18" stroke-width="3.4" stroke-linecap="round" />' +
      '<line x1="33" y1="11" x2="11" y2="33" stroke="#1C1B18" stroke-width="3.4" stroke-linecap="round" />' +
      '<g id="msc-r0"></g><g id="msc-r1"></g><g id="msc-r2"></g><g id="msc-r3"></g>' +
      '<rect x="16" y="15" width="12" height="15" rx="2.6" fill="#FAF7F0" stroke="#1C1B18" stroke-width="2.2" />' +
      '<polygon points="22,9.5 18.8,14.5 25.2,14.5" fill="#D94E28" stroke="#1C1B18" stroke-width="1.3" />' +
      '<circle class="msc-led" cx="22" cy="23" r="2.1" fill="#2D6A4F" />' +
    '</svg>';

  function rotorMarkup(cx, cy, colour) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="3.1" fill="#FAF7F0" stroke="#1C1B18" stroke-width="1.8" />' +
           '<ellipse cx="' + cx + '" cy="' + cy + '" rx="8.6" ry="1.7" fill="' + colour + '" opacity="0.85" />' +
           '<ellipse cx="' + cx + '" cy="' + cy + '" rx="1.7" ry="8.6" fill="' + colour + '" opacity="0.5" />';
  }

  function init() {
    var fine = false, reduce = false;
    try {
      fine = window.matchMedia('(pointer: fine)').matches;
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}
    if (!fine || reduce) return;

    var host = document.createElement('div');
    host.className = 'drone-cursor';
    host.setAttribute('aria-hidden', 'true');
    host.innerHTML = SVG;
    document.body.appendChild(host);

    var ROTORS = [
      { el: host.querySelector('#msc-r0'), x: 11, y: 11, dir:  1, colour: '#D94E28' },
      { el: host.querySelector('#msc-r1'), x: 33, y: 11, dir: -1, colour: '#2D6A4F' },
      { el: host.querySelector('#msc-r2'), x: 11, y: 33, dir: -1, colour: '#2D6A4F' },
      { el: host.querySelector('#msc-r3'), x: 33, y: 33, dir:  1, colour: '#D94E28' }
    ];
    ROTORS.forEach(function (r) { r.el.innerHTML = rotorMarkup(r.x, r.y, r.colour); r.angle = 0; });

    /* Only hide the real cursor now that the drone exists. */
    document.documentElement.classList.add('has-drone-cursor');

    var px = window.innerWidth / 2, py = window.innerHeight / 2;   /* pointer */
    var dx = px, dy = py;                                          /* drone   */
    var speed = 0, heading = 0, seen = false, down = false;

    function isTextField(node) {
      if (!node || !node.closest) return false;
      return !!node.closest('input, textarea, [contenteditable="true"]');
    }

    document.addEventListener('mousemove', function (e) {
      px = e.clientX; py = e.clientY;
      if (!seen) { seen = true; dx = px; dy = py; host.classList.add('is-live'); }
      host.classList.toggle('is-hidden', isTextField(e.target));
    }, { passive: true });

    document.addEventListener('mouseleave', function () { host.classList.remove('is-live'); });
    document.addEventListener('mouseenter', function () { if (seen) host.classList.add('is-live'); });
    document.addEventListener('mousedown', function () { down = true; });
    document.addEventListener('mouseup', function () { down = false; });

    var last = performance.now();
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.05) || 0.016;
      last = now;

      /* Chase the pointer; the small lag is what makes it read as flying. */
      var vx = (px - dx) * 14, vy = (py - dy) * 14;
      dx += vx * dt; dy += vy * dt;

      /* Smoothed speed in px/s, and a heading that only turns when moving. */
      var inst = Math.hypot(vx, vy);
      speed += (inst - speed) * Math.min(1, dt * 9);
      if (inst > 40) {
        var want = Math.atan2(vy, vx) + Math.PI / 2;
        var diff = ((want - heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        heading += diff * Math.min(1, dt * 8);
      }

      /* Rotor rate: idle hover plus whatever the pointer is doing. */
      var rate = 420 + Math.min(speed, 2600) * 1.5;      /* degrees per second */
      ROTORS.forEach(function (r) {
        r.angle = (r.angle + r.dir * rate * dt) % 360;
        r.el.setAttribute('transform', 'rotate(' + r.angle.toFixed(1) + ' ' + r.x + ' ' + r.y + ')');
      });

      var scale = down ? 0.84 : 1;
      host.style.transform = 'translate3d(' + (dx - 18) + 'px,' + (dy - 18) + 'px,0) ' +
                             'rotate(' + (heading * 180 / Math.PI).toFixed(1) + 'deg) scale(' + scale + ')';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  return { init: init };
})();
