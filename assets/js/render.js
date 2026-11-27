/* =========================================================================
   RENDER.JS  —  Builds the page from content/site.js + content/sections.js.
   You normally do NOT need to edit this file. Edit the content files instead.
   ========================================================================= */

window.MSRender = (function () {
  'use strict';

  /* ---------- small helpers ---------------------------------------- */

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function mount(id) { return document.getElementById(id); }

  /* Writing {wave} anywhere in heroHeading drops in the smiley-with-waving-
     hand below. Drawn in the site's own linework so it themes with
     everything else — an emoji would ignore the palette. */
  var WAVE_SVG = '' +
    '<svg class="hero-wave" viewBox="0 0 60 44" role="img" aria-label="waving hello" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="15" cy="26" r="12.4" fill="#D49B2A" stroke="#1C1B18" stroke-width="2.6" />' +
      '<circle cx="10.9" cy="23" r="1.85" fill="#1C1B18" />' +
      '<circle cx="19.1" cy="23" r="1.85" fill="#1C1B18" />' +
      '<path d="M10 30.3 Q15 35.4 20 30.3" fill="none" stroke="#1C1B18" stroke-width="2.6" stroke-linecap="round" />' +
      '<g class="wave-hand">' +
        '<g fill="none" stroke-linecap="round">' +
          '<path d="M39 25 L39 14 M43.5 25 L43.5 11 M48 25 L48 13 M52 26 L52 17.5" stroke="#1C1B18" stroke-width="6.4" />' +
          '<path d="M39 25 L39 14 M43.5 25 L43.5 11 M48 25 L48 13 M52 26 L52 17.5" stroke="#D49B2A" stroke-width="3.2" />' +
        '</g>' +
        '<path d="M36 28 Q31 26.8 31.4 31.2 Q31.9 35.2 36.5 34.2" fill="#D49B2A" stroke="#1C1B18" stroke-width="2.3" stroke-linejoin="round" />' +
        '<rect x="36" y="22" width="19" height="14" rx="5.5" fill="#D49B2A" stroke="#1C1B18" stroke-width="2.4" />' +
      '</g>' +
    '</svg>';

  function expandTokens(text) {
    return String(text == null ? '' : text).split('{wave}').join(WAVE_SVG);
  }

  // Badge pill colour presets
  var BADGE = {
    signal: 'bg-signal text-cream border border-ink',
    scope:  'bg-scope text-cream border border-ink',
    amber:  'bg-amberretro text-ink border border-ink',
    ink:    'bg-ink text-cream border border-ink',
    paper:  'bg-paper text-ink border border-ink',
    none:   ''
  };

  var TEXTCOLOR = {
    signal: 'text-signal',
    scope:  'text-scope',
    ink:    'text-ink',
    amber:  'text-amberretro',
    muted:  'text-muted'
  };

  var GRID = {
    1: 'grid grid-cols-1 gap-6',
    2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
  };

  function badgeClass(key) {
    var k = key || 'signal';
    if (k === 'none') return 'font-mono text-xs font-bold text-signal';
    return 'font-mono text-xs font-bold uppercase px-2 py-0.5 ' + (BADGE[k] || BADGE.signal);
  }

  function textColor(key, fallback) {
    return TEXTCOLOR[key || fallback] || TEXTCOLOR[fallback] || 'text-muted';
  }

  /* ---------- section shell ---------------------------------------- */

  function sectionHeader(sec) {
    var wrap = el('div', 'flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-ink pb-3.5 mb-8');
    var left = el('div');
    if (sec.number || sec.kicker) {
      left.appendChild(el('div', 'font-mono text-xs font-bold uppercase tracking-widest text-signal mb-1',
        (sec.number ? 'SECTION ' + sec.number + ' // ' : '') + (sec.kicker || '')));
    }
    left.appendChild(el('h2', 'font-display font-bold text-3xl sm:text-4xl tracking-tight text-ink', sec.title || ''));
    wrap.appendChild(left);
    if (sec.meta) wrap.appendChild(el('div', 'font-mono text-xs text-muted uppercase', sec.meta));
    return wrap;
  }

  /* ---------- block: cards ----------------------------------------- */

  function titleClassFor(card, columns) {
    if (columns >= 4) return 'text-base leading-snug';
    if (columns === 3) return (card.span && card.span > 1) ? 'text-xl sm:text-2xl' : 'text-xl';
    if (columns === 2) {
      if (card.subtitle) return 'text-xl sm:text-2xl';
      if (card.body) return 'text-xl';
      return 'text-lg leading-snug';
    }
    return 'text-xl';
  }

  function renderCard(card, columns) {
    var spanCls = '';
    if (card.span && card.span > 1) {
      spanCls = (columns === 2) ? ' md:col-span-2' : ' lg:col-span-' + card.span;
    }
    var art = el('article', 'retro-card p-5 sm:p-6 flex flex-col justify-between' + spanCls);
    var top = el('div');

    /* header row */
    if (card.badge || card.kicker || card.stamp) {
      var head = el('div', card.stamp
        ? 'flex items-start justify-between gap-2 mb-3'
        : 'flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5 mb-4');

      if (card.stamp) {
        head.appendChild(el('span', 'retro-stamp px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-scope bg-paper', card.stamp));
      } else if (card.badge) {
        head.appendChild(el('span', badgeClass(card.badgeColor), card.badge));
      } else {
        head.appendChild(el('span'));
      }

      if (card.stamp && card.badge) {
        head.appendChild(el('span', 'font-mono text-xs font-bold text-signal', card.badge));
      } else if (card.kicker) {
        head.appendChild(el('span', 'font-mono text-[11px] font-semibold uppercase ' + textColor(card.kickerColor, 'muted'), card.kicker));
      }
      top.appendChild(head);
    }

    /* optional photo */
    if (card.image) {
      var fig = el('div', 'mb-4 border-2 border-ink bg-paper overflow-hidden');
      var img = el('img', 'block w-full h-auto');
      img.src = card.image;
      img.alt = card.imageAlt || card.title || '';
      img.loading = 'lazy';
      fig.appendChild(img);
      top.appendChild(fig);
    }

    if (card.title) {
      top.appendChild(el('h3', 'font-display font-bold text-ink mb-2 ' + titleClassFor(card, columns), card.title));
    }
    if (card.subtitle) {
      var subCls = card.subtitleStyle === 'invert'
        ? 'font-mono text-[10px] font-bold text-amberretro bg-ink inline-block px-1.5 py-0.5 uppercase mb-2'
        : 'font-mono text-xs font-bold uppercase mb-3 ' + textColor(card.subtitleColor, 'signal');
      top.appendChild(el('div', subCls, card.subtitle));
    }
    if (card.body) {
      var bodyCls = card.bodyClass || ((columns >= 4 ? 'text-xs' : 'text-sm') + ' text-ink/85 leading-relaxed mb-4');
      if (Object.prototype.toString.call(card.body) === '[object Array]') {
        /* several paragraphs */
        var para = el('div', 'space-y-3 ' + bodyCls);
        card.body.forEach(function (t) { para.appendChild(el('p', '', t)); });
        top.appendChild(para);
      } else {
        top.appendChild(el('p', bodyCls, card.body));
      }
    }

    /* optional numbered steps (used by the "how I work" card) */
    if (card.steps && card.steps.length) {
      var sul = el('ul', 'space-y-3 text-sm text-ink/90');
      card.steps.forEach(function (st, i) {
        var li = el('li', 'flex items-start gap-2.5');
        var num = st.n || ('0' + (i + 1) + '.');
        li.appendChild(el('span', 'font-mono text-xs font-bold mt-0.5 ' + textColor(st.color, 'ink'), num));
        li.appendChild(el('span', '', (st.label ? '<strong class="text-ink">' + st.label + '</strong> ' : '') + (st.text || '')));
        sul.appendChild(li);
      });
      top.appendChild(sul);
    }

    /* optional simple list (used by the certifications card) */
    if (card.list && card.list.length) {
      var ul = el('ul', 'space-y-3 text-sm');
      card.list.forEach(function (row, i) {
        var li = el('li', i < card.list.length - 1 ? 'border-b border-ink/20 pb-2.5' : '');
        li.appendChild(el('div', 'font-display font-bold text-ink', row.title || ''));
        if (row.meta) li.appendChild(el('div', 'font-mono text-[11px] text-muted', row.meta));
        ul.appendChild(li);
      });
      top.appendChild(ul);
    }

    art.appendChild(top);

    /* tags footer */
    if (card.tags && card.tags.length) {
      var tagRow = el('div', 'pt-3 border-t border-ink/25 flex flex-wrap gap-1.5 font-mono text-[11px]');
      card.tags.forEach(function (t) {
        tagRow.appendChild(el('span', 'px-2 py-0.5 bg-paper border border-ink', t));
      });
      art.appendChild(tagRow);
    }

    /* stamped footer (used by award cards) */
    if (card.footer) {
      var f = el('div', 'mt-4 pt-2 border-t-2 border-ink font-mono text-[10px] font-bold flex justify-between');
      f.appendChild(el('span', '', card.footer.left || ''));
      f.appendChild(el('span', 'text-scope', card.footer.right || ''));
      art.appendChild(f);
    }

    /* optional link */
    if (card.link && card.link.url) {
      var a = el('a', 'retro-btn mt-4 inline-flex items-center gap-2 px-4 py-2 bg-cream hover:bg-amberretro font-mono text-[11px] font-bold uppercase self-start',
        (card.link.label || 'Open') + ' <span aria-hidden="true">&rarr;</span>');
      a.href = card.link.url;
      if (/^https?:/.test(card.link.url)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      art.appendChild(a);
    }

    return art;
  }

  /* Portrait on the left, the writing on the right. */
  function blockAbout(block) {
    var row = el('div', 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start');

    var figCol = el('div', 'lg:col-span-5');
    var mat = el('div', 'bg-cream border-2 border-ink shadow-hard p-3 max-w-[26rem] lg:max-w-none mx-auto');
    var frame = el('div', 'about-frame relative aspect-[4/5] w-full bg-paper border-2 border-ink overflow-hidden');
    if (block.image) {
      var img = el('img', 'about-photo w-full h-full object-cover');
      img.src = block.image;
      img.alt = block.imageAlt || '';
      img.loading = 'lazy';
      frame.appendChild(img);
    }
    /* stencilled tags in the top corners, over the picture */
    if (block.tagLeft)  frame.appendChild(el('span', 'about-tag is-left', block.tagLeft));
    if (block.tagRight) frame.appendChild(el('span', 'about-tag is-right', block.tagRight));
    mat.appendChild(frame);
    if (block.caption) {
      mat.appendChild(el('div', 'font-mono text-[11px] uppercase tracking-wider text-muted pt-2.5 px-0.5', block.caption));
    }
    figCol.appendChild(mat);
    row.appendChild(figCol);

    var txt = el('div', 'lg:col-span-7 space-y-4');
    (block.body || []).forEach(function (t) {
      txt.appendChild(el('p', 'text-[15px] sm:text-base leading-relaxed text-ink/90', t));
    });
    if (block.facts && block.facts.length) {
      var ACCENT = ['bg-signal', 'bg-amberretro', 'bg-scope', 'bg-ink'];
      var box = el('div', 'pt-7 space-y-3');
      box.appendChild(el('div', 'font-mono text-[11px] font-bold uppercase tracking-widest text-muted flex items-center gap-2',
        '<span class="h-px flex-1 bg-ink/25"></span>' +
        '<span>' + (block.factsLabel || 'Focus areas') + '</span>' +
        '<span class="h-px flex-1 bg-ink/25"></span>'));

      var strip = el('dl', 'grid grid-cols-1 sm:grid-cols-3 gap-4');
      block.facts.forEach(function (f, i) {
        var cell = el('div', 'spec-plate');
        cell.appendChild(el('dt', 'font-mono text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1.5 mb-2',
          '<span class="w-2 h-2 border border-ink inline-block ' + (ACCENT[i % ACCENT.length]) + '"></span>' +
          '<span>' + f.label + '</span>'));
        cell.appendChild(el('dd', 'font-display font-bold text-[0.95rem] leading-snug text-ink', f.value));
        strip.appendChild(cell);
      });
      box.appendChild(strip);
      txt.appendChild(box);
    }
    row.appendChild(txt);
    return row;
  }

  /* The stack as a ladder: one plate per layer, hardware at the foot,
     read bottom to top. The rail down the left side is drawn in CSS. */
  function blockStack(block) {
    var wrap = el('div', 'stack-ladder');
    (block.layers || []).forEach(function (L, idx) {
      var row = el('div', 'stack-layer is-waiting');
      row.style.transitionDelay = (idx * 90) + 'ms';
      row.appendChild(el('span', 'stack-pin', '<span></span>'));

      var card = el('div', 'retro-card p-4 sm:p-5 grid grid-cols-1 md:grid-cols-[13rem_1fr] gap-4 md:gap-6 items-start');

      var head = el('div', 'flex items-center gap-3.5');
      head.appendChild(el('span', 'stack-code font-mono font-bold', L.code || ''));
      var names = el('div', '');
      names.appendChild(el('div', 'font-display font-bold text-lg leading-tight text-ink', L.name || ''));
      if (L.note) names.appendChild(el('div', 'font-mono text-[11px] uppercase tracking-wider text-muted mt-0.5', L.note));
      head.appendChild(names);
      card.appendChild(head);

      var chips = el('div', 'flex flex-wrap gap-2 md:border-l-2 md:border-ink/20 md:pl-6');
      (L.items || []).forEach(function (it) {
        chips.appendChild(el('span', 'stack-chip font-mono text-[11px] sm:text-xs',
          '<span class="stack-chip-dot"></span>' + it));
      });
      card.appendChild(chips);

      row.appendChild(card);
      wrap.appendChild(row);
    });
    reveal(wrap.children);
    return wrap;
  }

  /* Bring elements in once they scroll into view, and only then. Falls
     back to showing them immediately where the observer is unavailable
     or the reader has asked for less motion. */
  function reveal(nodes) {
    var list = [].slice.call(nodes);
    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (reduce || !window.IntersectionObserver) {
      list.forEach(function (n) { n.classList.remove('is-waiting'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.remove('is-waiting');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    list.forEach(function (n) { io.observe(n); });
  }

  function blockCards(block) {
    /* widths: [7, 5] lays the cards out on a 12-column grid instead of
       equal columns. Otherwise columns: 1-4 gives an even grid. */
    if (block.widths && block.widths.length) {
      var wgrid = el('div', 'grid grid-cols-1 lg:grid-cols-12 gap-6');
      (block.items || []).forEach(function (c, i) {
        var card = renderCard(c, 2);
        var w = block.widths[i] || Math.floor(12 / block.items.length);
        card.className += ' lg:col-span-' + w;
        wgrid.appendChild(card);
      });
      return wgrid;
    }
    var columns = block.columns || 2;
    var grid = el('div', GRID[columns] || GRID[2]);
    var items = block.items || [];
    var limit = block.showFirst;

    items.forEach(function (c, i) {
      var card = renderCard(c, columns);
      if (limit && i >= limit) card.className += ' is-extra hidden';
      grid.appendChild(card);
    });

    /* showFirst: 3 hides the rest behind a "view all" button */
    if (limit && items.length > limit) {
      var wrap = el('div', 'cards-expandable');
      wrap.appendChild(grid);
      var bar = el('div', 'flex justify-center pt-8');
      var btn = el('button', 'retro-btn inline-flex items-center gap-2 px-6 py-3 bg-cream text-ink hover:bg-amberretro font-mono text-xs sm:text-sm font-bold uppercase tracking-wider');
      btn.type = 'button';
      btn.setAttribute('data-expand-cards', '');
      btn.setAttribute('data-more', block.moreLabel || ('View All ' + items.length));
      btn.setAttribute('data-less', block.lessLabel || 'Show Fewer');
      bar.appendChild(btn);
      wrap.appendChild(bar);
      return wrap;
    }
    return grid;
  }

  /* ---------- block: ledger (experience table) --------------------- */

  /* Experience as a logbook rail: the dates run down the left against a
     drawing datum, each entry's organisation and role to the right with
     its record beneath. No column headers and no log numbers — the dates
     already order it. */
  function blockLedger(block) {
    var wrap = el('div', 'exp-rail');
    (block.rows || []).forEach(function (r, i) {
      var row = el('div', 'exp-entry is-waiting');
      row.style.transitionDelay = Math.min(i, 6) * 70 + 'ms';
      row.appendChild(el('span', 'exp-pin', '<span></span>'));

      var grid = el('div', 'grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-7');

      var when = el('div', 'md:col-span-3');
      if (r.tag) {
        when.appendChild(el('span', 'exp-date', r.tag));
      }
      grid.appendChild(when);

      var what = el('div', 'md:col-span-9');

      /* the organisation, with its mark: a supplied logo if there is one,
         otherwise a stencilled monogram plate, which keeps the row
         consistent without borrowing anyone's artwork */
      var nameRow = el('div', 'flex items-center gap-3.5');
      if (r.logo || r.mark) {
        var badge = el('span', 'org-mark' + (r.logo ? ' has-logo' : '') + (r.logoDark ? ' is-dark' : ''));
        if (r.logo) {
          var lg = el('img');
          lg.src = r.logo;
          lg.alt = (r.org || '') + ' logo';
          lg.loading = 'lazy';
          badge.appendChild(lg);
        } else {
          var m = String(r.mark);
          badge.appendChild(el('span', 'org-mark-text' + (m.length > 3 ? ' is-long' : ''), m));
        }
        nameRow.appendChild(badge);
      }
      var names = el('div', 'min-w-0');
      if (r.org)  names.appendChild(el('h3', 'font-display font-bold text-xl sm:text-2xl leading-tight ' + textColor(r.orgColor, 'ink'), r.org));
      if (r.role) names.appendChild(el('div', 'font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-muted mt-1', r.role));
      nameRow.appendChild(names);
      what.appendChild(nameRow);

      var pts = r.points || (r.body ? [r.body] : []);
      if (pts.length) {
        var ul = el('ul', 'mt-3 space-y-1.5 sm:pl-[5.4rem]');
        pts.forEach(function (t) {
          ul.appendChild(el('li', 'exp-point text-sm leading-relaxed text-ink/85', t));
        });
        what.appendChild(ul);
      }
      grid.appendChild(what);

      row.appendChild(grid);
      wrap.appendChild(row);
    });
    reveal(wrap.children);
    trackRail(wrap);
    return wrap;
  }

  /* The rail fills as you read down it, and each entry lights up once
     the read head passes its tick. Position, not motion — so it is left
     on under prefers-reduced-motion. */
  function trackRail(wrap) {
    var fill = el('span', 'exp-fill');
    wrap.appendChild(fill);
    var entries = [].slice.call(wrap.querySelectorAll('.exp-entry'));
    var queued = false;

    function update() {
      queued = false;
      var box = wrap.getBoundingClientRect();
      if (!box.height) return;
      var head = window.innerHeight * 0.52;          /* the reading line */
      var done = (head - box.top) / box.height;
      done = done < 0 ? 0 : done > 1 ? 1 : done;
      fill.style.height = (done * 100) + '%';
      entries.forEach(function (en) {
        var pin = en.getBoundingClientRect().top + 14;
        en.classList.toggle('is-reached', pin <= head);
      });
    }
    function ping() { if (!queued) { queued = true; requestAnimationFrame(update); } }

    window.addEventListener('scroll', ping, { passive: true });
    window.addEventListener('resize', ping);
    ping();
  }

  /* ---------- block: publications ---------------------------------- */

  var BIBTEX = {};

  function blockPublications(block) {
    var stack = el('div', 'space-y-5');
    (block.items || []).forEach(function (p, i) {
      var key = p.key || ('pub' + i);
      if (p.bibtex) BIBTEX[key] = p.bibtex;

      var art = el('article', 'retro-card p-5 sm:p-6');
      var row = el('div', 'flex flex-col lg:flex-row lg:items-start justify-between gap-4');
      var main = el('div', 'space-y-2 max-w-3xl');

      var badgeRow = el('div', 'flex flex-wrap items-center gap-2 font-mono text-xs');
      if (p.badge) badgeRow.appendChild(el('span', badgeClass(p.badgeColor), p.badge));
      if (p.venue) badgeRow.appendChild(el('span', 'text-muted font-semibold', p.venue));
      main.appendChild(badgeRow);

      main.appendChild(el('h3', 'font-display font-bold text-xl sm:text-2xl text-ink leading-snug', p.title || ''));
      if (p.authors) main.appendChild(el('p', 'font-mono text-[11px] text-muted', p.authors));
      if (p.body)    main.appendChild(el('p', 'text-sm text-ink/85 leading-relaxed', p.body));
      row.appendChild(main);

      if (p.bibtex) {
        var btns = el('div', 'flex items-center gap-2 shrink-0 pt-1');
        var copy = el('button', 'copy-bib-btn retro-btn px-3.5 py-2 bg-paper hover:bg-amberretro font-mono text-xs font-bold uppercase', 'Copy BibTeX');
        copy.type = 'button';
        copy.setAttribute('data-bib', key);
        var toggle = el('button', 'toggle-bib-btn retro-btn px-2.5 py-2 bg-cream hover:bg-paper font-mono text-xs font-bold uppercase', '{ }');
        toggle.type = 'button';
        toggle.setAttribute('data-toggle-bib', 'bib-' + key);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.title = 'Toggle BibTeX Preview';
        btns.appendChild(copy); btns.appendChild(toggle);
        row.appendChild(btns);
      }

      art.appendChild(row);

      if (p.bibtex) {
        var pre = el('pre', 'hidden mt-4 p-3.5 bg-ink text-cream font-mono text-xs overflow-x-auto border-2 border-ink');
        pre.id = 'bib-' + key;
        pre.textContent = p.bibtex;
        art.appendChild(pre);
      }

      stack.appendChild(art);
    });
    return stack;
  }

  /* ---------- block: gallery --------------------------------------- */

  function blockGallery(block) {
    var columns = block.columns || 3;
    var grid = el('div', GRID[columns] || GRID[3]);
    (block.items || []).forEach(function (g) {
      var fig = el('figure', 'gallery-figure');
      var img = el('img');
      img.src = g.src;
      img.alt = g.alt || g.caption || '';
      img.loading = 'lazy';
      fig.appendChild(img);
      if (g.caption) {
        fig.appendChild(el('figcaption', 'font-mono text-[11px] text-muted uppercase pt-2 pb-0.5 px-0.5', g.caption));
      }
      grid.appendChild(fig);
    });
    return grid;
  }

  /* ---------- block: contact --------------------------------------- */

  function blockContact() {
    var c = (window.SITE && window.SITE.contact) || {};
    var wrap = el('div', 'bg-cream border-2 border-ink shadow-hard-lg p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8');

    /* left: channels */
    var left = el('div', 'lg:col-span-5 flex flex-col justify-between space-y-6');
    var blurb = el('div', 'space-y-3');
    if (c.status)  blurb.appendChild(el('div', 'font-mono text-xs font-bold uppercase text-scope', c.status));
    if (c.heading) blurb.appendChild(el('h3', 'font-display font-bold text-2xl text-ink', c.heading));
    if (c.blurb)   blurb.appendChild(el('p', 'text-sm text-ink/85 leading-relaxed', c.blurb));
    left.appendChild(blurb);

    var links = el('div', 'space-y-2.5 font-mono text-xs');
    ((window.SITE && window.SITE.social) || []).forEach(function (s) {
      var a = el('a', 'flex items-center justify-between p-3 bg-paper border-2 border-ink hover:bg-amberretro/40 transition-colors');
      a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.appendChild(el('span', 'font-bold uppercase', s.label || ''));
      a.appendChild(el('span', '', (s.display || s.url) + ' &rarr;'));
      links.appendChild(a);
    });
    left.appendChild(links);
    wrap.appendChild(left);

    /* right: form */
    var right = el('div', 'lg:col-span-7');
    right.innerHTML = [
      '<form id="contact-form" class="space-y-4" novalidate>',
      '  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">',
      '    <div>',
      '      <label for="sender-name" class="block font-mono text-[11px] font-bold uppercase mb-1.5">Name / Callsign *</label>',
      '      <input id="sender-name" name="name" type="text" required placeholder="Dr. Ada Lovelace"',
      '             class="w-full px-3.5 py-2.5 bg-paper border-2 border-ink font-sans text-sm focus:outline-none focus:bg-cream focus:border-signal" />',
      '    </div>',
      '    <div>',
      '      <label for="sender-email" class="block font-mono text-[11px] font-bold uppercase mb-1.5">Return Email *</label>',
      '      <input id="sender-email" name="email" type="email" required placeholder="ada@robotics-lab.org"',
      '             class="w-full px-3.5 py-2.5 bg-paper border-2 border-ink font-sans text-sm focus:outline-none focus:bg-cream focus:border-signal" />',
      '    </div>',
      '  </div>',
      '  <div>',
      '    <label for="sender-message" class="block font-mono text-[11px] font-bold uppercase mb-1.5">Message Payload *</label>',
      '    <textarea id="sender-message" name="message" rows="4" required placeholder="Brief notes about your project, lab, or collaboration..."',
      '              class="w-full px-3.5 py-2.5 bg-paper border-2 border-ink font-sans text-sm focus:outline-none focus:bg-cream focus:border-signal resize-y"></textarea>',
      '  </div>',
      '  <div class="flex flex-wrap items-center justify-between gap-3 pt-1">',
      '    <button type="submit" class="retro-btn px-6 py-2.5 bg-signal text-cream font-mono text-xs font-bold uppercase tracking-wider">Transmit Message &rarr;</button>',
      '    <div id="form-confirmation" class="hidden font-mono text-xs font-bold text-scope bg-paper border-2 border-scope px-3 py-1.5">&#10003; TRANSMISSION LOGGED — THANK YOU</div>',
      '  </div>',
      '</form>'
    ].join('\n');
    wrap.appendChild(right);

    return wrap;
  }

  /* ---------- block dispatcher ------------------------------------- */

  function renderBlock(block) {
    switch (block.type) {
      case 'about':        return blockAbout(block);
      case 'stack':        return blockStack(block);
      case 'cards':        return blockCards(block);
      case 'prose': {
        var pw = el('div', 'space-y-3 max-w-3xl');
        if (block.heading) pw.appendChild(el('h3', 'font-display font-bold text-xl text-ink', block.heading));
        (block.body || []).forEach(function (t) {
          pw.appendChild(el('p', 'text-[15px] sm:text-base leading-relaxed text-ink/90', t));
        });
        return pw;
      }
      case 'featured-projects':
        return (window.MSProjects && window.MSProjects.renderFeatured)
          ? window.MSProjects.renderFeatured(block)
          : el('p', 'font-mono text-xs text-signal', 'assets/js/projects.js is not loaded');
      case 'ledger':       return blockLedger(block);
      case 'publications': return blockPublications(block);
      case 'gallery':      return blockGallery(block);
      case 'contact':      return blockContact(block);
      case 'heading':
        var sq = { signal: 'bg-signal', scope: 'bg-scope', ink: 'bg-ink', amber: 'bg-amberretro' }[block.color || 'amber'] || 'bg-amberretro';
        return el('div', 'font-mono text-xs font-bold uppercase tracking-widest text-ink flex items-center gap-2',
          '<span class="w-2.5 h-2.5 ' + sq + ' border border-ink inline-block"></span><span>' + (block.label || '') + '</span>');
      case 'html':
        return el('div', block.class || '', block.html || '');
      default:
        return el('div', 'font-mono text-xs text-signal',
          'Unknown block type: "' + String(block.type) + '" — check content/sections.js');
    }
  }

  /* ---------- hero -------------------------------------------------- */

  /* A full-bleed band of photographs behind the hero text, cross-fading
     one at a time at half opacity, filling the first screen edge to edge.
     Each picture is faded out at its own left, right and bottom edges by
     the masks in style.css, so it melts into the paper rather than
     sitting in a box with visible borders. */
  function slideshow(S) {
    var cfg = S.heroSlideshow || {};
    var shots = cfg.images || [];
    var band = el('div', 'hero-slides');
    band.setAttribute('aria-hidden', 'true');
    if (!shots.length) return band;

    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var nodes = shots.map(function (shot, i) {
      var fig = el('div', 'hero-slide' + (i === 0 ? ' is-on' : ''));
      var img = el('img');
      img.src = shot.src;
      img.alt = '';
      img.decoding = 'async';
      if (i > 1) img.loading = 'lazy';
      fig.appendChild(img);
      band.appendChild(fig);
      return fig;
    });
    band.appendChild(el('div', 'hero-scrim'));

    if (reduce || nodes.length < 2) return band;

    var at = 0;
    setInterval(function () {
      if (document.hidden) return;
      nodes[at].classList.remove('is-on');
      at = (at + 1) % nodes.length;
      nodes[at].classList.add('is-on');
    }, cfg.intervalMs || 4500);

    return band;
  }

  /* Round outline buttons under the hero intro. Keyed on the label in
     SITE.social, so adding a line there is all it takes — anything with
     no icon of its own falls back to its first letter. */
  var SOCIAL_ICONS = {
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05A4.2 4.2 0 0 1 16.6 8.7c4 0 4.4 2.5 4.4 5.8V21h-4v-5.6c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9z"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
    instagram: '<path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.18a6.62 6.62 0 1 0 0 13.24 6.62 6.62 0 0 0 0-13.24zm0 10.92a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.88-11.1a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z"/>',
    youtube: '<path d="M22.5 7.2a2.8 2.8 0 0 0-1.96-1.98C18.8 4.75 12 4.75 12 4.75s-6.8 0-8.54.47A2.8 2.8 0 0 0 1.5 7.2C1.04 8.95 1.04 12 1.04 12s0 3.05.46 4.8a2.8 2.8 0 0 0 1.96 1.98c1.74.47 8.54.47 8.54.47s6.8 0 8.54-.47a2.8 2.8 0 0 0 1.96-1.98c.46-1.75.46-4.8.46-4.8s0-3.05-.46-4.8zM9.82 15.3V8.7L15.5 12z"/>',
    email: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.1L4.4 7h15.2z" stroke="none"/>'
  };

  function socialRow(S) {
    var items = (S.social || []).slice();
    /* The Email entry needs no url of its own: it becomes a mailto once
       contact.email is filled in, and until then it jumps to the form. */
    var mail = (S.contact && S.contact.email) || '';
    var isMail = function (i) { return /^e-?mail$/i.test(i.label || ''); };
    if (!items.some(isMail)) items.push({ label: 'Email', url: '' });
    items.forEach(function (i) {
      if (isMail(i) && !i.url) i.url = mail ? 'mailto:' + mail : '#contact';
    });

    if (!items.length) return null;

    var row = el('div', 'flex flex-wrap items-center gap-3 pt-5');
    items.forEach(function (it) {
      var key = String(it.label || '').toLowerCase().replace(/[^a-z]/g, '');
      if (key === 'mail') key = 'email';
      var a = el('a', 'social-dot');
      a.href = it.url || '#';
      a.setAttribute('aria-label', it.label || 'link');
      a.title = it.label || '';
      if (/^https?:/.test(it.url || '')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.innerHTML = SOCIAL_ICONS[key]
        ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' + SOCIAL_ICONS[key] + '</svg>'
        : '<span class="font-mono font-bold text-sm">' + (it.label || '?').charAt(0).toUpperCase() + '</span>';
      row.appendChild(a);
    });
    return row;
  }

  function renderHero() {
    var S = window.SITE || {};
    var host = mount('home');
    if (!host) return;

    var grid = el('div', 'grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center');

    /* left column */
    /* 8/4 rather than 7/5: the heading needs the width to keep the wave on
       the first line. The portrait is capped at 330px anyway, so it barely
       changes. */
    var left = el('div', 'md:col-span-9 lg:col-span-8 space-y-6');
    if (S.kicker) {
      left.appendChild(el('div', 'flex flex-wrap items-center gap-2.5 font-mono text-xs',
        '<span class="px-2.5 py-1 bg-ink text-cream font-bold uppercase tracking-wider">' + S.kicker + '</span>'));
    }
    var nameBlock = el('div', 'space-y-2');

    /* The heading is typed by assets/js/ui.js. It is built as empty spans
       plus a caret; the wave slot is zero-width until the smiley arrives, so
       the greeting gets the full column to itself. A plain aria-label keeps
       the heading readable while its text is still being typed. */
    var greeting = S.heroGreeting || '';
    var headingText = S.heroHeading || S.name || '';
    var h1 = el('h1', 'hero-heading font-display font-bold text-[2rem] sm:text-[3.4rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.6rem] leading-[1.12] tracking-tight text-ink');
    h1.id = 'hero-heading';
    h1.setAttribute('data-greeting', greeting);
    h1.setAttribute('data-heading', headingText.split('{wave}').join('').replace(/\s+/g, ' ').trim());
    h1.setAttribute('aria-label', (greeting ? greeting + ' \u2014 ' : '') + headingText.split('{wave}').join('').replace(/\s+/g, ' ').trim());
    /* the smiley only appears if heroHeading actually asks for it */
    var wantsWave = headingText.indexOf('{wave}') !== -1;
    h1.innerHTML =
      '<span id="hero-text" class="hero-text" aria-hidden="true"></span>' +
      '<span id="hero-caret" class="hero-caret" aria-hidden="true"></span>' +
      (wantsWave
        ? '<span id="hero-wave-slot" class="hero-wave-slot" aria-hidden="true">' + WAVE_SVG + '</span>'
        : '');
    nameBlock.appendChild(h1);
    if (S.tagline && S.showTaglineInHero !== false) {
      nameBlock.appendChild(el('p', 'font-mono text-base sm:text-lg font-bold text-signal uppercase tracking-wide pt-1', S.tagline));
    }
    left.appendChild(nameBlock);
    if (S.intro) left.appendChild(el('p', 'text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed text-ink/90 max-w-2xl', S.intro));

    if (S.buttons && S.buttons.length) {
      var btnRow = el('div', 'flex flex-wrap items-center gap-4 pt-2');
      S.buttons.forEach(function (b) {
        var base = 'retro-btn inline-flex items-center gap-2 px-7 py-4 font-mono text-sm sm:text-base font-bold uppercase tracking-wider ';
        var cls = base + (b.style === 'primary' ? 'bg-signal text-cream' : 'bg-cream text-ink hover:bg-amberretro');
        var node;
        if (b.action === 'cv') {
          node = el('button', cls, '<span>' + (b.label || '') + '</span>');
          node.type = 'button';
          node.setAttribute('data-open-cv', '1');
        } else {
          node = el('a', cls, '<span>' + (b.label || '') + '</span><span aria-hidden="true">&rarr;</span>');
          node.href = b.href || '#';
          if (/^https?:/.test(b.href || '')) { node.target = '_blank'; node.rel = 'noopener noreferrer'; }
        }
        btnRow.appendChild(node);
      });
      left.appendChild(btnRow);
    }
    var dots = socialRow(S);
    if (dots) left.appendChild(dots);
    grid.appendChild(left);

    host.appendChild(slideshow(S));
    host.appendChild(grid);
  }


  /* ---------- sections --------------------------------------------- */

  function renderSections() {
    var host = mount('sections-root');
    if (!host) return;
    (window.SECTIONS || []).forEach(function (sec) {
      var s = el('section', 'scroll-mt-32');
      s.id = sec.id;
      if (sec.title) s.appendChild(sectionHeader(sec));
      var blocks = sec.blocks || [];
      var inner = blocks.length > 1 ? el('div', 'space-y-10') : s;
      blocks.forEach(function (b) { inner.appendChild(renderBlock(b)); });
      if (inner !== s) s.appendChild(inner);
      host.appendChild(s);
    });
  }

  /* ---------- navigation tabs (auto-built from SECTIONS) ----------- */

  function renderNav() {
    var S = window.SITE || {};
    var track = mount('nav-track');
    if (!track) return;

    var items = [{ key: 'home', label: 'Home', href: '#home' }];
    (window.SECTIONS || []).forEach(function (sec) {
      items.push({ key: sec.id, label: sec.nav || sec.title || sec.id, href: '#' + sec.id });
    });

    items.forEach(function (it, i) {
      var a = el('a', 'nav-crate font-mono text-[10px] sm:text-xs font-bold uppercase tracking-tight text-center py-1.5 px-1' + (i === 0 ? ' is-locked' : ''), it.label);
      a.href = it.href;
      a.setAttribute('data-nav', it.key);
      track.appendChild(a);
    });

    if (S.cv && S.cv.enabled) {
      var btn = el('button', 'nav-crate font-mono text-[10px] sm:text-xs font-bold uppercase tracking-tight text-center py-1.5 px-1 bg-amberretro/30 hover:bg-amberretro', 'CV');
      btn.type = 'button';
      btn.setAttribute('data-nav', 'cv');
      btn.setAttribute('data-open-cv', '1');
      track.appendChild(btn);
    }

    /* widen the scroll track so tabs stay readable on small screens */
    var stage = mount('nav-stage');
    if (stage) stage.style.minWidth = Math.max(600, items.length * 86) + 'px';
  }

  /* ---------- brand + footer + head ------------------------------- */

  function renderChrome() {
    var S = window.SITE || {};
    var brand = mount('brand-name');
    if (brand) { brand.textContent = S.name || ''; }

    var note = mount('footer-note');
    if (note) note.textContent = S.footerNote || '';

    var year = mount('footer-year');
    if (year) year.textContent = new Date().getFullYear();

    if (S.meta) {
      if (S.meta.title) document.title = S.meta.title;
      var d = document.querySelector('meta[name="description"]');
      if (d && S.meta.description) d.setAttribute('content', S.meta.description);
    }
  }

  /* ---------- CV modal -------------------------------------------- */

  function renderCV() {
    var S = window.SITE || {};
    var cv = S.cv || {};
    var host = mount('cv-body');
    if (!host) return;
    if (!cv.enabled) {
      var modal = mount('cv-modal');
      if (modal) modal.remove();
      return;
    }

    /* header */
    var head = el('div', 'border-b-2 border-ink pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3');
    var hl = el('div');
    hl.appendChild(el('h2', 'font-display font-bold text-3xl tracking-tight', S.name || ''));
    if (S.tagline) hl.appendChild(el('p', 'font-mono text-xs font-bold text-signal uppercase mt-1', S.tagline));
    head.appendChild(hl);
    if (cv.headerLines && cv.headerLines.length) {
      var hr = el('div', 'font-mono text-[11px] text-muted sm:text-right leading-relaxed');
      cv.headerLines.forEach(function (l) { hr.appendChild(el('div', '', l)); });
      head.appendChild(hr);
    }
    host.appendChild(head);

    /* blocks, pairing "half" blocks two per row */
    var blocks = cv.blocks || [];
    var i = 0;
    while (i < blocks.length) {
      var b = blocks[i];
      if (b.half && blocks[i + 1] && blocks[i + 1].half) {
        var row = el('div', 'grid grid-cols-1 sm:grid-cols-2 gap-6' + (b.divider ? ' pt-2 border-t border-ink/25' : ''));
        row.appendChild(cvBlock(b));
        row.appendChild(cvBlock(blocks[i + 1]));
        host.appendChild(row);
        i += 2;
      } else {
        var solo = el('div', b.divider ? 'pt-2 border-t border-ink/25' : '');
        solo.appendChild(cvBlock(b));
        host.appendChild(solo);
        i += 1;
      }
    }
  }

  function cvBlock(b) {
    var wrap = el('div', 'space-y-2');
    wrap.appendChild(el('h3', 'font-mono text-xs font-bold uppercase tracking-wider bg-paper border border-ink px-2 py-1 inline-block', b.title || ''));

    if (b.type === 'bullets') {
      var ul = el('ul', 'text-xs space-y-1.5 text-ink/90 list-disc pl-4');
      (b.items || []).forEach(function (t) { ul.appendChild(el('li', '', t)); });
      wrap.appendChild(ul);
    } else if (b.type === 'text') {
      wrap.appendChild(el('p', 'font-mono text-[11px] leading-relaxed text-ink/90', b.body || ''));
    } else {
      var stack = el('div', 'space-y-3 text-sm');
      (b.items || []).forEach(function (it) {
        var d = el('div');
        if (it.heading) d.appendChild(el('div', 'font-bold', it.heading));
        if (it.meta)    d.appendChild(el('div', 'font-mono text-[11px] text-muted', it.meta));
        if (it.body)    d.appendChild(el('p', 'text-xs text-ink/85 mt-1', it.body));
        stack.appendChild(d);
      });
      wrap.appendChild(stack);
    }
    return wrap;
  }

  /* ---------- public API ------------------------------------------- */

  return {
    renderAll: function () {
      renderChrome();
      renderNav();
      renderHero();
      renderSections();
      renderCV();
    },
    bibtex: BIBTEX
  };
})();
