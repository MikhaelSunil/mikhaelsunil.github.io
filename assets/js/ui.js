/* =========================================================================
   UI.JS  —  Interactions: drone boot screen, robotic forklift navigation,
   scroll-spy, CV pop-up, BibTeX copy, and the contact form.
   You normally do NOT need to edit this file.
   ========================================================================= */

window.MSUI = (function () {
  'use strict';

  var toastTimer = null;

  function showToast(message) {
    var toast = document.getElementById('toast');
    var msg = document.getElementById('toast-msg');
    if (!toast || !msg) return;
    msg.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2200);
  }

  /* =====================================================================
     1. SPINNING DRONE BOOT SEQUENCE (~2.0s)
     ===================================================================== */
  function initBoot() {
    var overlay = document.getElementById('boot-overlay');
    var skipBtn = document.getElementById('skip-boot-btn');
    var replayBtn = document.getElementById('replay-boot-btn');
    var steps = [
      document.getElementById('boot-step-1'),
      document.getElementById('boot-step-2'),
      document.getElementById('boot-step-3')
    ];
    var bar = document.getElementById('boot-bar');
    var timers = [];

    var enabled = !(window.SITE && window.SITE.bootScreen === false);
    if (!overlay) return { dismiss: function () {}, isOpen: function () { return false; } };

    if (!enabled) {
      overlay.remove();
      if (replayBtn) replayBtn.remove();
      return { dismiss: function () {}, isOpen: function () { return false; } };
    }

    function clearTimers() {
      timers.forEach(function (t) { clearTimeout(t); });
      timers = [];
    }
    function dismiss() {
      clearTimers();
      overlay.classList.add('boot-hidden');
    }
    function run() {
      clearTimers();
      overlay.classList.remove('boot-hidden');
      steps.forEach(function (el) { if (el) el.classList.add('opacity-0'); });
      if (bar) bar.style.width = '10%';
      timers.push(setTimeout(function () {
        if (steps[0]) steps[0].classList.remove('opacity-0');
        if (bar) bar.style.width = '40%';
      }, 250));
      timers.push(setTimeout(function () {
        if (steps[1]) steps[1].classList.remove('opacity-0');
        if (bar) bar.style.width = '76%';
      }, 850));
      timers.push(setTimeout(function () {
        if (steps[2]) steps[2].classList.remove('opacity-0');
        if (bar) bar.style.width = '100%';
      }, 1450));
      timers.push(setTimeout(dismiss, 2000));
    }

    if (skipBtn) skipBtn.addEventListener('click', dismiss);
    if (replayBtn) replayBtn.addEventListener('click', run);
    run();

    return {
      dismiss: dismiss,
      isOpen: function () { return !overlay.classList.contains('boot-hidden'); }
    };
  }

  /* =====================================================================
     2. ROBOTIC FORKLIFT NAVIGATION PHYSICS, LOCK-ON & SCROLL-SPY
     ===================================================================== */
  function initForklift() {
    var stage = document.getElementById('forklift-stage');
    var actor = document.getElementById('forklift-actor');
    var flip = document.getElementById('forklift-flip');
    var forks = document.getElementById('forklift-forks');
    var beacon = document.getElementById('forklift-beacon');
    var beaconGlow = document.getElementById('forklift-beacon-glow');
    var wheelRear = document.getElementById('wheel-rear');
    var wheelFront = document.getElementById('wheel-front');
    var crates = Array.prototype.slice.call(document.querySelectorAll('.nav-crate'));
    if (!stage || !actor || !crates.length) return;

    var activeNavKey = 'home';
    var hoveredNavKey = null;
    var isPointerInsideNav = false;

    var curX = 0, targetX = 0, velX = 0, wheelDeg = 0, facing = 1;
    var lockAnimTime = 0, beaconFlashTime = 0;

    function getTabCenterX(key) {
      var el = null;
      for (var i = 0; i < crates.length; i++) {
        if (crates[i].getAttribute('data-nav') === key) { el = crates[i]; break; }
      }
      if (!el) el = crates[0];
      var stageRect = stage.getBoundingClientRect();
      var elRect = el.getBoundingClientRect();
      return (elRect.left - stageRect.left) + (elRect.width / 2) - 31;
    }

    function setLockedTab(key, triggerClamp) {
      activeNavKey = key;
      crates.forEach(function (item) {
        item.classList.toggle('is-locked', item.getAttribute('data-nav') === key);
      });
      if (!isPointerInsideNav) targetX = getTabCenterX(activeNavKey);
      if (triggerClamp) { lockAnimTime = 0.48; beaconFlashTime = 0.75; }
    }

    requestAnimationFrame(function () {
      curX = getTabCenterX(activeNavKey);
      targetX = curX;
      actor.style.transform = 'translate3d(' + curX.toFixed(1) + 'px, 0, 0)';
    });

    crates.forEach(function (crate) {
      var key = crate.getAttribute('data-nav');
      crate.addEventListener('mouseenter', function () {
        isPointerInsideNav = true;
        hoveredNavKey = key;
        targetX = getTabCenterX(key);
      });
      crate.addEventListener('focus', function () {
        hoveredNavKey = key;
        targetX = getTabCenterX(key);
      });
      crate.addEventListener('click', function () {
        targetX = getTabCenterX(key);
        setLockedTab(key, true);
      });
    });

    stage.addEventListener('mousemove', function (e) {
      isPointerInsideNav = true;
      if (!hoveredNavKey) {
        var stageRect = stage.getBoundingClientRect();
        var rawX = e.clientX - stageRect.left - 31;
        var maxX = stageRect.width - 62;
        targetX = Math.max(0, Math.min(maxX, rawX));
      }
    });

    stage.addEventListener('mouseleave', function () {
      isPointerInsideNav = false;
      hoveredNavKey = null;
      targetX = getTabCenterX(activeNavKey);
    });

    window.addEventListener('resize', function () {
      targetX = getTabCenterX(isPointerInsideNav && hoveredNavKey ? hoveredNavKey : activeNavKey);
    });

    /* Scroll-spy over whatever sections exist in content/sections.js */
    var ids = ['home'].concat((window.SECTIONS || []).map(function (s) { return s.id; }));
    var sectionEls = ids.map(function (id) { return document.getElementById(id); })
                        .filter(function (n) { return !!n; });
    var lastId = ids[ids.length - 1];

    if ('IntersectionObserver' in window && sectionEls.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var vis = entry.target.id;
            if (activeNavKey !== 'cv' && vis !== activeNavKey) setLockedTab(vis, false);
          }
        });
      }, { rootMargin: '-22% 0px -58% 0px', threshold: 0.05 });
      sectionEls.forEach(function (sec) { observer.observe(sec); });
    }

    window.addEventListener('scroll', function () {
      if (activeNavKey === 'cv') return;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) {
        if (activeNavKey !== lastId) setLockedTab(lastId, false);
      } else if (window.scrollY < 90 && activeNavKey !== 'home') {
        setLockedTab('home', false);
      }
    }, { passive: true });

    /* Critically-damped spring physics loop */
    var lastTs = performance.now();
    function animate(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      var stiffness = 135, damping = 18.5;
      var force = (targetX - curX) * stiffness - velX * damping;
      velX += force * dt;
      var dx = velX * dt;
      curX += dx;

      if (Math.abs(velX) > 14) facing = velX > 0 ? 1 : -1;

      var leanDeg = Math.max(-5, Math.min(5, velX * 0.014));
      wheelDeg += dx * 9.5;

      actor.style.transform = 'translate3d(' + curX.toFixed(1) + 'px, 0, 0)';
      if (flip) flip.setAttribute('transform', 'scale(' + facing + ', 1) rotate(' + (leanDeg * facing).toFixed(2) + ')');
      if (wheelRear) wheelRear.setAttribute('transform', 'translate(-15, 7) rotate(' + (wheelDeg * facing).toFixed(1) + ')');
      if (wheelFront) wheelFront.setAttribute('transform', 'translate(3, 7) rotate(' + (wheelDeg * facing).toFixed(1) + ')');

      if (lockAnimTime > 0) {
        lockAnimTime = Math.max(0, lockAnimTime - dt);
        var p = 1 - lockAnimTime / 0.48;
        var forkY = Math.sin(p * Math.PI) * -5.5;
        if (forks) forks.setAttribute('transform', 'translate(0, ' + forkY.toFixed(2) + ')');
      } else if (forks) {
        forks.setAttribute('transform', 'translate(0, 0)');
      }

      if (beaconFlashTime > 0) {
        beaconFlashTime = Math.max(0, beaconFlashTime - dt);
        var pulse = 0.45 + 0.55 * Math.abs(Math.sin(beaconFlashTime * 18));
        if (beacon) beacon.setAttribute('fill', '#2D6A4F');
        if (beaconGlow) beaconGlow.setAttribute('opacity', (pulse * 0.45).toFixed(2));
      } else {
        if (beacon) beacon.setAttribute('fill', '#D49B2A');
        if (beaconGlow) beaconGlow.setAttribute('opacity', '0');
      }

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  /* =====================================================================
     3. CV POP-UP & PRINT
     ===================================================================== */
  function initCV() {
    var modal = document.getElementById('cv-modal');
    var closeBtn = document.getElementById('close-cv-btn');
    var printBtn = document.getElementById('print-cv-btn');

    function open() {
      if (!modal) return;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      if (!modal) return;
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-cv]').forEach(function (btn) {
      btn.addEventListener('click', open);
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
    if (modal) {
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    }

    return {
      close: close,
      isOpen: function () { return !!modal && !modal.classList.contains('hidden'); }
    };
  }

  /* =====================================================================
     4. BIBTEX COPY & PREVIEW TOGGLE
     ===================================================================== */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { showToast('BIBTEX COPIED TO CLIPBOARD'); },
        function () { legacyCopy(text); }
      );
    } else {
      legacyCopy(text);
    }
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('BIBTEX COPIED TO CLIPBOARD');
    } catch (err) {
      showToast('COPY FAILED — USE { } PREVIEW');
    }
    document.body.removeChild(ta);
  }

  function initBibtex() {
    var map = (window.MSRender && window.MSRender.bibtex) || {};
    document.querySelectorAll('.copy-bib-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-bib');
        if (map[key]) copyText(map[key]);
      });
    });
    document.querySelectorAll('.toggle-bib-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = document.getElementById(btn.getAttribute('data-toggle-bib'));
        if (!pre) return;
        var isHidden = pre.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', String(!isHidden));
      });
    });
  }

  /* =====================================================================
     4b. "VIEW ALL" CARD REVEAL
     ===================================================================== */
  function initExpandableCards() {
    document.querySelectorAll('[data-expand-cards]').forEach(function (btn) {
      var wrap = btn.closest('.cards-expandable');
      if (!wrap) return;
      var extras = wrap.querySelectorAll('.is-extra');
      var expanded = false;

      function paint() {
        for (var i = 0; i < extras.length; i++) {
          extras[i].classList.toggle('hidden', !expanded);
        }
        btn.innerHTML = '<span>' + (expanded ? btn.getAttribute('data-less') : btn.getAttribute('data-more')) +
                        '</span><span aria-hidden="true">' + (expanded ? '\u2191' : '\u2193') + '</span>';
        btn.setAttribute('aria-expanded', String(expanded));
      }

      paint();
      btn.addEventListener('click', function () {
        expanded = !expanded;
        paint();
      });
    });
  }

  /* =====================================================================
     5. CONTACT FORM
     Sends via formEndpoint if set, else opens the visitor's mail app if
     an email is set, else just confirms locally.
     ===================================================================== */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    var confirmation = document.getElementById('form-confirmation');
    if (!form) return;

    var cfg = (window.SITE && window.SITE.contact) || {};

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (form.querySelector('[name="name"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var message = (form.querySelector('[name="message"]') || {}).value || '';

      if (!name.trim() || !email.trim() || !message.trim()) {
        showToast('ALL FIELDS REQUIRED');
        return;
      }

      function done(msg) {
        if (confirmation) confirmation.classList.remove('hidden');
        showToast(msg);
        form.reset();
      }

      if (cfg.formEndpoint) {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'TRANSMITTING…'; }
        fetch(cfg.formEndpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, message: message })
        }).then(function (res) {
          if (res.ok) { done('TRANSMISSION SENT'); }
          else { showToast('SEND FAILED — TRY EMAIL INSTEAD'); }
        }).catch(function () {
          showToast('SEND FAILED — TRY EMAIL INSTEAD');
        }).then(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = 'Transmit Message &rarr;'; }
        });
        return;
      }

      if (cfg.email) {
        var subject = 'Portfolio enquiry from ' + name;
        var body = message + '\n\n—\n' + name + '\n' + email;
        window.location.href = 'mailto:' + cfg.email +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
        done('OPENING YOUR MAIL APP');
        return;
      }

      done('TRANSMISSION LOGGED');
    });
  }

  /* =====================================================================
     INIT
     ===================================================================== */
  function init() {
    var boot = initBoot();
    initForklift();
    var cv = initCV();
    initBibtex();
    initExpandableCards();
    initContactForm();

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (boot.isOpen()) boot.dismiss();
      else if (cv.isOpen()) cv.close();
    });
  }

  return { init: init, toast: showToast };
})();
