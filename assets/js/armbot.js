/* =========================================================================
   ARMBOT.JS  —  The bimanual cloth-folding robot arms in the bottom-right
   corner. Two 2-link analytical-IK arms fold a garment and stack it.
   Switch it off with  armRobot: false  in content/site.js.
   ========================================================================= */

window.MSArm = (function () {
  'use strict';

  function init() {
    if (window.SITE && window.SITE.armRobot === false) {
      var dead = document.getElementById('seamless-arm-canvas');
      if (dead) dead.remove();
      return;
    }

    var canvas = document.getElementById('seamless-arm-canvas');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var W = 290, H = 155;

    function sizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    /* Colours come from the CSS tokens so the robot follows the theme. */
    var PAL = {};
    function token(name, fallback) {
      var v = '';
      try { v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); } catch (e) {}
      return v || fallback;
    }
    function refreshPalette() {
      PAL.ink    = token('--c-ink',    '28 27 24');
      PAL.cream  = token('--c-cream',  '250 247 240');
      PAL.paper  = token('--c-paper',  '242 237 226');
      PAL.signal = token('--c-signal', '217 78 40');
      PAL.kraft  = token('--c-kraft',  '229 200 144');
    }
    function C(triplet, alpha) {
      return alpha == null ? 'rgb(' + triplet + ')' : 'rgb(' + triplet + ' / ' + alpha + ')';
    }
    refreshPalette();
    window.addEventListener('ms:themechange', refreshPalette);

    /* Workspace geometry (290x155) */
    var TABLE_Y = 144;
    var BASE_L = { x: 42, y: 138 };
    var BASE_R = { x: 204, y: 138 };
    var L1 = 68, L2 = 62;

    var CENTER_X = 123, STACK_X = 258;
    var FOLDED_W = 34, FOLDED_H = 10.5;

    var FABRIC_COLORS = [
      { fill: '#3D7A74', shade: '#2D5E59' }, /* dusty teal */
      { fill: '#D49A3A', shade: '#B37E26' }, /* warm ochre */
      { fill: '#C85A3A', shade: '#A14328' }, /* faded terracotta */
      { fill: '#4A6580', shade: '#364C63' }  /* slate blue */
    ];

    /* Analytical 2-link inverse kinematics (elbow-up) */
    function solveIK(base, tx, ty) {
      var dx = tx - base.x;
      var dy = ty - base.y;
      var dist = Math.hypot(dx, dy);

      var maxR = L1 + L2 - 1.5;
      var minR = Math.abs(L1 - L2) + 3;
      if (dist > maxR) {
        dx = (dx / dist) * maxR; dy = (dy / dist) * maxR; dist = maxR;
      } else if (dist < minR) {
        dx = (dx / dist) * minR; dy = (dy / dist) * minR; dist = minR;
      }

      var baseAngle = Math.atan2(dy, dx);
      var cosAlpha = Math.max(-1, Math.min(1, (dist * dist + L1 * L1 - L2 * L2) / (2 * L1 * dist)));
      var alpha = Math.acos(cosAlpha);

      var e1 = { x: base.x + L1 * Math.cos(baseAngle - alpha), y: base.y + L1 * Math.sin(baseAngle - alpha) };
      var e2 = { x: base.x + L1 * Math.cos(baseAngle + alpha), y: base.y + L1 * Math.sin(baseAngle + alpha) };
      var elbow = e1.y <= e2.y ? e1 : e2;

      return { elbow: elbow, wrist: { x: base.x + dx, y: base.y + dy } };
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function lerp(a, b, t) { return a + (b - a) * t; }

    /* Bimanual folding state machine */
    var REST_L = { x: 76, y: 74 };
    var REST_R = { x: 170, y: 74 };

    var eeL = { x: REST_L.x, y: REST_L.y };
    var eeR = { x: REST_R.x, y: REST_R.y };
    var startL = { x: REST_L.x, y: REST_L.y };
    var startR = { x: REST_R.x, y: REST_R.y };
    var goalL = { x: REST_L.x, y: REST_L.y };
    var goalR = { x: REST_R.x, y: REST_R.y };
    var arcL = 0, arcR = 0;

    var jawL = 1, jawR = 1;

    var stack = [], colorIdx = 0, stackFade = 1;

    var clothVisible = true, clothAlpha = 1;
    var sideFold = 0, halfFold = 0;
    var carriedByRight = false;
    var clothPos = { x: CENTER_X, y: TABLE_Y - FOLDED_H / 2 };

    var state = 'APPEAR', segT = 0, segDur = 0.6;

    function setMotion(gxL, gyL, gxR, gyR, dur, nextState, aL, aR) {
      startL = { x: eeL.x, y: eeL.y };
      startR = { x: eeR.x, y: eeR.y };
      goalL = { x: gxL, y: gyL };
      goalR = { x: gxR, y: gyR };
      arcL = aL || 0;
      arcR = aR || 0;
      segT = 0;
      segDur = dur;
      state = nextState;
    }

    function enterPhase(next) {
      var stackTopY = TABLE_Y - FOLDED_H / 2 - stack.length * (FOLDED_H + 0.5);

      switch (next) {
        case 'APPEAR':
          clothVisible = true; clothAlpha = 0;
          sideFold = 0; halfFold = 0;
          carriedByRight = false;
          jawL = 1; jawR = 1;
          setMotion(74, 92, 172, 92, 0.55, 'APPEAR');
          break;
        case 'REACH_SLEEVES':
          setMotion(74, 114, 172, 114, 0.55, 'REACH_SLEEVES');
          break;
        case 'GRIP_SLEEVES':
          setMotion(74, 114, 172, 114, 0.24, 'GRIP_SLEEVES');
          break;
        case 'FOLD_SIDES':
          setMotion(114, 114, 132, 114, 0.85, 'FOLD_SIDES', -16, -16);
          break;
        case 'RELEASE_SIDES':
          setMotion(114, 114, 132, 114, 0.2, 'RELEASE_SIDES');
          break;
        case 'REPOS_BOTTOM':
          setMotion(107, 132, 139, 132, 0.5, 'REPOS_BOTTOM', -12, -12);
          break;
        case 'GRIP_BOTTOM':
          setMotion(107, 132, 139, 132, 0.22, 'GRIP_BOTTOM');
          break;
        case 'FOLD_HALF':
          setMotion(107, 118, 139, 118, 0.8, 'FOLD_HALF', -14, -14);
          break;
        case 'RELEASE_HALF':
          setMotion(107, 118, 139, 118, 0.22, 'RELEASE_HALF');
          break;
        case 'PREP_CARRY':
          setMotion(REST_L.x, REST_L.y, CENTER_X, 121, 0.5, 'PREP_CARRY', -8, -10);
          break;
        case 'GRIP_FOLDED':
          setMotion(REST_L.x, REST_L.y, CENTER_X, 127, 0.24, 'GRIP_FOLDED');
          break;
        case 'CARRY_TO_STACK':
          carriedByRight = true;
          setMotion(REST_L.x, REST_L.y, STACK_X, stackTopY - 12, 1.05, 'CARRY_TO_STACK', 0, -44);
          break;
        case 'PLACE_ON_STACK':
          setMotion(REST_L.x, REST_L.y, STACK_X, stackTopY - 12, 0.22, 'PLACE_ON_STACK');
          break;
        case 'RETRACT_AFTER_STACK':
          carriedByRight = false;
          clothVisible = false;
          stack.push(colorIdx);
          colorIdx = (colorIdx + 1) % FABRIC_COLORS.length;
          setMotion(REST_L.x, REST_L.y, REST_R.x, REST_R.y, 0.65, 'RETRACT_AFTER_STACK', 0, -18);
          break;
        case 'PAUSE_FULL_STACK':
          setMotion(REST_L.x, REST_L.y, REST_R.x, REST_R.y, 0.9, 'PAUSE_FULL_STACK');
          break;
        case 'CLEAR_STACK':
          setMotion(REST_L.x, REST_L.y, REST_R.x, REST_R.y, 0.55, 'CLEAR_STACK');
          break;
      }
    }

    function advancePhase() {
      switch (state) {
        case 'APPEAR': enterPhase('REACH_SLEEVES'); break;
        case 'REACH_SLEEVES': enterPhase('GRIP_SLEEVES'); break;
        case 'GRIP_SLEEVES': enterPhase('FOLD_SIDES'); break;
        case 'FOLD_SIDES': enterPhase('RELEASE_SIDES'); break;
        case 'RELEASE_SIDES': enterPhase('REPOS_BOTTOM'); break;
        case 'REPOS_BOTTOM': enterPhase('GRIP_BOTTOM'); break;
        case 'GRIP_BOTTOM': enterPhase('FOLD_HALF'); break;
        case 'FOLD_HALF': enterPhase('RELEASE_HALF'); break;
        case 'RELEASE_HALF': enterPhase('PREP_CARRY'); break;
        case 'PREP_CARRY': enterPhase('GRIP_FOLDED'); break;
        case 'GRIP_FOLDED': enterPhase('CARRY_TO_STACK'); break;
        case 'CARRY_TO_STACK': enterPhase('PLACE_ON_STACK'); break;
        case 'PLACE_ON_STACK': enterPhase('RETRACT_AFTER_STACK'); break;
        case 'RETRACT_AFTER_STACK':
          if (stack.length >= 4) enterPhase('PAUSE_FULL_STACK');
          else enterPhase('APPEAR');
          break;
        case 'PAUSE_FULL_STACK': enterPhase('CLEAR_STACK'); break;
        case 'CLEAR_STACK':
          stack = [];
          stackFade = 1;
          enterPhase('APPEAR');
          break;
      }
    }

    enterPhase('APPEAR');

    function drawFoldedGarment(cx, cy, palette, alpha) {
      ctx.save();
      ctx.globalAlpha = (alpha == null ? 1 : alpha);
      var x = cx - FOLDED_W / 2;
      var y = cy - FOLDED_H / 2;

      ctx.fillStyle = palette.fill;
      ctx.fillRect(x, y, FOLDED_W, FOLDED_H);

      ctx.fillStyle = palette.shade;
      ctx.fillRect(x, y + FOLDED_H * 0.56, FOLDED_W, FOLDED_H * 0.44);

      ctx.strokeStyle = C(PAL.ink);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, FOLDED_W, FOLDED_H);

      ctx.beginPath();
      ctx.moveTo(x + 2, y + FOLDED_H * 0.54);
      ctx.lineTo(x + FOLDED_W - 2, y + FOLDED_H * 0.54);
      ctx.strokeStyle = C(PAL.ink, 0.55);
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, y + 1, 3.2, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.strokeStyle = C(PAL.ink, 0.45);
      ctx.stroke();
      ctx.restore();
    }

    function drawActiveCloth() {
      if (!clothVisible) return;
      var palette = FABRIC_COLORS[colorIdx];

      if (carriedByRight) {
        drawFoldedGarment(clothPos.x, clothPos.y, palette, 1);
        return;
      }

      ctx.save();
      ctx.globalAlpha = clothAlpha;

      var topY = lerp(109, 133, halfFold);
      var botY = TABLE_Y - 1;
      var bodyHalfW = lerp(26, FOLDED_W / 2, sideFold);

      ctx.fillStyle = palette.fill;
      ctx.strokeStyle = C(PAL.ink);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(CENTER_X - bodyHalfW, topY, bodyHalfW * 2, botY - topY);
      ctx.fill();
      ctx.stroke();

      if (sideFold < 0.98 && halfFold < 0.05) {
        var sleeveOut = lerp(25, -10, sideFold);
        var flapTop = topY + 2;
        var flapBot = topY + 17;

        ctx.fillStyle = sideFold > 0.5 ? palette.shade : palette.fill;
        ctx.beginPath();
        ctx.moveTo(CENTER_X - bodyHalfW, flapTop);
        ctx.lineTo(CENTER_X - bodyHalfW - sleeveOut, flapTop + 4);
        ctx.lineTo(CENTER_X - bodyHalfW - sleeveOut * 0.88, flapBot);
        ctx.lineTo(CENTER_X - bodyHalfW, flapBot - 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(CENTER_X + bodyHalfW, flapTop);
        ctx.lineTo(CENTER_X + bodyHalfW + sleeveOut, flapTop + 4);
        ctx.lineTo(CENTER_X + bodyHalfW + sleeveOut * 0.88, flapBot);
        ctx.lineTo(CENTER_X + bodyHalfW, flapBot - 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      if (sideFold > 0.05 && halfFold < 0.85) {
        ctx.save();
        ctx.setLineDash([2.5, 2.5]);
        ctx.strokeStyle = C(PAL.ink, 0.35);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(CENTER_X - bodyHalfW + 5, topY + 2);
        ctx.lineTo(CENTER_X - bodyHalfW + 5, botY - 2);
        ctx.moveTo(CENTER_X + bodyHalfW - 5, topY + 2);
        ctx.lineTo(CENTER_X + bodyHalfW - 5, botY - 2);
        ctx.stroke();
        ctx.restore();
      }

      if (halfFold > 0.02) {
        var foldH = (botY - topY) * Math.min(1, 0.45 + halfFold * 0.55);
        ctx.fillStyle = palette.shade;
        ctx.fillRect(CENTER_X - bodyHalfW, botY - foldH * 0.52, bodyHalfW * 2, foldH * 0.52);
        ctx.strokeStyle = C(PAL.ink);
        ctx.lineWidth = 1.4;
        ctx.strokeRect(CENTER_X - bodyHalfW, topY, bodyHalfW * 2, botY - topY);

        ctx.beginPath();
        ctx.moveTo(CENTER_X - bodyHalfW + 2, topY + (botY - topY) * 0.52);
        ctx.lineTo(CENTER_X + bodyHalfW - 2, topY + (botY - topY) * 0.52);
        ctx.strokeStyle = C(PAL.ink, 0.55);
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(CENTER_X, topY, 6, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.fillStyle = C(PAL.paper);
        ctx.fill();
        ctx.strokeStyle = C(PAL.ink);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(CENTER_X - bodyHalfW + 3, botY - 4);
        ctx.lineTo(CENTER_X + bodyHalfW - 3, botY - 4);
        ctx.strokeStyle = C(PAL.ink, 0.28);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawRobotArm(base, ee, jawOpen) {
      var ik = solveIK(base, ee.x, ee.y);
      var elbow = ik.elbow, wrist = ik.wrist;

      ctx.fillStyle = C(PAL.ink);
      ctx.fillRect(base.x - 11, TABLE_Y - 5.5, 22, 5.5);
      ctx.fillStyle = C(PAL.cream);
      ctx.strokeStyle = C(PAL.ink);
      ctx.lineWidth = 1.5;
      ctx.fillRect(base.x - 6.5, TABLE_Y - 10, 13, 4.5);
      ctx.strokeRect(base.x - 6.5, TABLE_Y - 10, 13, 4.5);

      ctx.lineCap = 'round';
      ctx.strokeStyle = C(PAL.ink);
      ctx.lineWidth = 7.4;
      ctx.beginPath();
      ctx.moveTo(base.x, base.y);
      ctx.lineTo(elbow.x, elbow.y);
      ctx.stroke();

      ctx.strokeStyle = C(PAL.cream);
      ctx.lineWidth = 3.8;
      ctx.beginPath();
      ctx.moveTo(base.x, base.y);
      ctx.lineTo(elbow.x, elbow.y);
      ctx.stroke();

      ctx.strokeStyle = C(PAL.ink);
      ctx.lineWidth = 5.8;
      ctx.beginPath();
      ctx.moveTo(elbow.x, elbow.y);
      ctx.lineTo(wrist.x, wrist.y);
      ctx.stroke();

      ctx.strokeStyle = C(PAL.kraft);
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(elbow.x, elbow.y);
      ctx.lineTo(wrist.x, wrist.y);
      ctx.stroke();

      var spread = 3.2 + jawOpen * 3.8;
      ctx.fillStyle = C(PAL.ink);
      ctx.fillRect(wrist.x - 6.5, wrist.y, 13, 2.8);
      ctx.fillRect(wrist.x - spread - 1.6, wrist.y + 2.8, 2, 7.2);
      ctx.fillRect(wrist.x + spread - 0.4, wrist.y + 2.8, 2, 7.2);

      [{ pt: base, r: 4.6 }, { pt: elbow, r: 4.0 }, { pt: wrist, r: 3.0 }].forEach(function (j) {
        ctx.beginPath();
        ctx.arc(j.pt.x, j.pt.y, j.r, 0, Math.PI * 2);
        ctx.fillStyle = C(PAL.cream);
        ctx.fill();
        ctx.strokeStyle = C(PAL.ink);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(j.pt.x, j.pt.y, j.r * 0.44, 0, Math.PI * 2);
        ctx.fillStyle = C(PAL.signal);
        ctx.fill();
      });
    }

    function renderScene() {
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = C(PAL.ink);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(14, TABLE_Y);
      ctx.lineTo(W - 8, TABLE_Y);
      ctx.stroke();

      ctx.fillStyle = C(PAL.ink);
      ctx.fillRect(CENTER_X - 34, TABLE_Y, 68, 2);
      ctx.fillRect(STACK_X - 20, TABLE_Y, 40, 2.2);

      stack.forEach(function (cIdx, idx) {
        var cy = TABLE_Y - FOLDED_H / 2 - idx * (FOLDED_H + 0.5);
        drawFoldedGarment(STACK_X, cy, FABRIC_COLORS[cIdx], stackFade);
      });

      drawActiveCloth();

      drawRobotArm(BASE_L, eeL, jawL);
      drawRobotArm(BASE_R, eeR, jawR);
    }

    var lastTs = performance.now();
    function tick(now) {
      var dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      segT += dt;
      var rawT = Math.min(1, segT / segDur);
      var u = easeInOutCubic(rawT);

      eeL.x = lerp(startL.x, goalL.x, u);
      eeL.y = lerp(startL.y, goalL.y, u) + Math.sin(u * Math.PI) * arcL;
      eeR.x = lerp(startR.x, goalR.x, u);
      eeR.y = lerp(startR.y, goalR.y, u) + Math.sin(u * Math.PI) * arcR;

      if (state === 'APPEAR') {
        clothAlpha = u;
      } else if (state === 'GRIP_SLEEVES' || state === 'GRIP_BOTTOM') {
        jawL = 1 - u; jawR = 1 - u;
      } else if (state === 'FOLD_SIDES') {
        jawL = 0; jawR = 0; sideFold = u;
      } else if (state === 'RELEASE_SIDES' || state === 'RELEASE_HALF') {
        jawL = u; jawR = u;
      } else if (state === 'FOLD_HALF') {
        jawL = 0; jawR = 0; halfFold = u;
      } else if (state === 'GRIP_FOLDED') {
        jawL = 1; jawR = 1 - u;
      } else if (state === 'CARRY_TO_STACK') {
        jawL = 1; jawR = 0;
        clothPos.x = eeR.x; clothPos.y = eeR.y + 11.5;
      } else if (state === 'PLACE_ON_STACK') {
        jawL = 1; jawR = u;
        clothPos.x = eeR.x; clothPos.y = eeR.y + 11.5;
      } else if (state === 'CLEAR_STACK') {
        stackFade = Math.max(0, 1 - u);
      }

      if (rawT >= 1) advancePhase();

      renderScene();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return { init: init };
})();
