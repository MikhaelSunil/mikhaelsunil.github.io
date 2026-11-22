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
    left.appendChild(el('h2', 'font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-ink', sec.title || ''));
    wrap.appendChild(left);
    if (sec.meta) wrap.appendChild(el('div', 'font-mono text-xs text-muted uppercase', sec.meta));
    return wrap;
  }

  /* ---------- block: cards ----------------------------------------- */

  function titleClassFor(card, columns) {
    if (columns >= 4) return 'text-base uppercase leading-snug';
    if (columns === 3) return (card.span && card.span > 1) ? 'text-xl sm:text-2xl' : 'text-xl';
    if (columns === 2) {
      if (card.subtitle) return 'text-xl sm:text-2xl';
      if (card.body) return 'text-xl uppercase';
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
      top.appendChild(el('p', (columns >= 4 ? 'text-xs' : 'text-sm') + ' text-ink/85 leading-relaxed mb-4', card.body));
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

  function blockCards(block) {
    var columns = block.columns || 2;
    var grid = el('div', GRID[columns] || GRID[2]);
    (block.items || []).forEach(function (c) { grid.appendChild(renderCard(c, columns)); });
    return grid;
  }

  /* ---------- block: ledger (experience table) --------------------- */

  function blockLedger(block) {
    var wrap = el('div', 'bg-cream border-2 border-ink shadow-hard-lg overflow-hidden');
    var heads = block.headers || [];
    if (heads.length === 3) {
      var hr = el('div', 'hidden md:grid md:grid-cols-12 bg-ink text-cream font-mono text-[11px] font-bold uppercase tracking-wider px-5 py-2.5');
      hr.appendChild(el('div', 'col-span-3', heads[0]));
      hr.appendChild(el('div', 'col-span-4', heads[1]));
      hr.appendChild(el('div', 'col-span-5', heads[2]));
      wrap.appendChild(hr);
    }
    var rows = block.rows || [];
    rows.forEach(function (r, i) {
      var last = i === rows.length - 1;
      var row = el('div', 'grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-5 hover:bg-paper/70 transition-colors' + (last ? '' : ' border-b-2 border-ink'));

      var c1 = el('div', 'md:col-span-3 font-mono text-xs');
      if (r.tag) {
        var tagCls = r.tagColor === 'scope' ? 'bg-scope text-cream'
                   : r.tagColor === 'amber' ? 'bg-amberretro text-ink border border-ink'
                   : r.tagColor === 'ink'   ? 'bg-ink text-cream'
                   : 'bg-paper text-ink border border-ink';
        c1.appendChild(el('span', 'inline-block px-2 py-0.5 font-bold uppercase mb-1 ' + tagCls, r.tag));
      }
      if (r.log) c1.appendChild(el('div', 'text-muted text-[11px]', r.log));

      var c2 = el('div', 'md:col-span-4');
      if (r.role) c2.appendChild(el('h3', 'font-display font-bold text-base sm:text-lg text-ink', r.role));
      if (r.org)  c2.appendChild(el('div', 'font-mono text-xs font-bold mt-0.5 ' + textColor(r.orgColor, 'signal'), r.org));

      var c3 = el('div', 'md:col-span-5 text-sm text-ink/85 leading-relaxed', r.body || '');

      row.appendChild(c1); row.appendChild(c2); row.appendChild(c3);
      wrap.appendChild(row);
    });
    return wrap;
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
    if (c.heading) blurb.appendChild(el('h3', 'font-display font-bold text-2xl text-ink uppercase', c.heading));
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
      case 'cards':        return blockCards(block);
      case 'ledger':       return blockLedger(block);
      case 'publications': return blockPublications(block);
      case 'gallery':      return blockGallery(block);
      case 'contact':      return blockContact(block);
      case 'heading':
        return el('div', 'font-mono text-xs font-bold uppercase tracking-widest text-ink flex items-center gap-2',
          '<span class="w-2.5 h-2.5 bg-amberretro border border-ink inline-block"></span><span>' + (block.label || '') + '</span>');
      case 'html':
        return el('div', block.class || '', block.html || '');
      default:
        return el('div', 'font-mono text-xs text-signal',
          'Unknown block type: "' + String(block.type) + '" — check content/sections.js');
    }
  }

  /* ---------- hero -------------------------------------------------- */

  function renderHero() {
    var S = window.SITE || {};
    var host = mount('home');
    if (!host) return;

    var grid = el('div', 'grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center');

    /* left column */
    var left = el('div', 'md:col-span-7 space-y-6');
    if (S.kicker) {
      left.appendChild(el('div', 'flex flex-wrap items-center gap-2.5 font-mono text-xs',
        '<span class="px-2.5 py-1 bg-ink text-cream font-bold uppercase tracking-wider">' + S.kicker + '</span>'));
    }
    var nameBlock = el('div', 'space-y-2');
    nameBlock.appendChild(el('h1', 'font-display font-bold text-5xl sm:text-6xl leading-[0.98] tracking-tight text-ink uppercase', S.name || ''));
    if (S.tagline) {
      nameBlock.appendChild(el('p', 'font-mono text-sm sm:text-base font-bold text-signal uppercase tracking-wide pt-1', S.tagline));
    }
    left.appendChild(nameBlock);
    if (S.intro) left.appendChild(el('p', 'text-base sm:text-lg leading-relaxed text-ink/90 max-w-xl', S.intro));

    if (S.buttons && S.buttons.length) {
      var btnRow = el('div', 'flex flex-wrap items-center gap-4 pt-2');
      S.buttons.forEach(function (b) {
        var base = 'retro-btn inline-flex items-center gap-2 px-6 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider ';
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
    grid.appendChild(left);

    /* right column: portrait */
    var right = el('div', 'md:col-span-5 flex justify-center md:justify-end');
    var mat = el('div', 'w-full max-w-[330px] bg-cream border-2 border-ink shadow-hard p-3');
    var port = el('div', 'relative aspect-[4/4.5] w-full bg-paper border-2 border-ink overflow-hidden flex items-center justify-center');
    port.innerHTML =
      '<span class="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-ink/70 z-10 pointer-events-none"></span>' +
      '<span class="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-ink/70 z-10 pointer-events-none"></span>' +
      '<span class="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-ink/70 z-10 pointer-events-none"></span>' +
      '<span class="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-ink/70 z-10 pointer-events-none"></span>';

    if (S.photo) {
      var photo = el('img', 'w-full h-full object-cover object-center');
      photo.src = S.photo;
      photo.alt = S.photoAlt || S.name || '';
      port.appendChild(photo);
    } else {
      var ph = el('div', 'w-full h-full halftone-dots flex items-center justify-center relative');
      ph.innerHTML = portraitPlaceholderSVG();
      port.appendChild(ph);
    }
    mat.appendChild(port);
    right.appendChild(mat);
    grid.appendChild(right);

    host.appendChild(grid);
  }

  function portraitPlaceholderSVG() {
    return '' +
'<svg viewBox="0 0 320 360" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrated portrait placeholder">' +
'<circle cx="160" cy="148" r="96" fill="#E8E0CE" stroke="#1C1B18" stroke-width="2" stroke-dasharray="6 4" />' +
'<circle cx="160" cy="148" r="78" fill="#D49B2A" opacity="0.22" />' +
'<line x1="20" y1="148" x2="52" y2="148" stroke="#1C1B18" stroke-width="1.5" />' +
'<line x1="268" y1="148" x2="300" y2="148" stroke="#1C1B18" stroke-width="1.5" />' +
'<path d="M44 360 C50 280, 92 246, 160 246 C228 246, 270 280, 276 360 Z" fill="#1C1B18" stroke="#1C1B18" stroke-width="2.5" />' +
'<polygon points="130,246 160,296 190,246" fill="#FAF7F0" stroke="#1C1B18" stroke-width="2" />' +
'<rect x="200" y="296" width="38" height="24" fill="#D94E28" stroke="#FAF7F0" stroke-width="1.8" />' +
'<line x1="206" y1="304" x2="232" y2="304" stroke="#FAF7F0" stroke-width="2" />' +
'<line x1="206" y1="312" x2="224" y2="312" stroke="#FAF7F0" stroke-width="2" />' +
'<rect x="142" y="212" width="36" height="42" rx="10" fill="#FAF7F0" stroke="#1C1B18" stroke-width="2.5" />' +
'<path d="M112 148 C112 104, 132 84, 160 84 C188 84, 208 104, 208 148 C208 190, 188 218, 160 218 C132 218, 112 190, 112 148 Z" fill="#FAF7F0" stroke="#1C1B18" stroke-width="3" />' +
'<path d="M110 144 C108 96, 134 74, 166 76 C196 78, 212 98, 210 142 C200 118, 184 110, 158 112 C134 114, 120 124, 110 144 Z" fill="#1C1B18" />' +
'<rect x="122" y="138" width="32" height="22" rx="4" fill="#2D6A4F" fill-opacity="0.16" stroke="#1C1B18" stroke-width="2.5" />' +
'<rect x="166" y="138" width="32" height="22" rx="4" fill="#2D6A4F" fill-opacity="0.16" stroke="#1C1B18" stroke-width="2.5" />' +
'<line x1="154" y1="147" x2="166" y2="147" stroke="#1C1B18" stroke-width="2.5" />' +
'<line x1="112" y1="146" x2="122" y2="146" stroke="#1C1B18" stroke-width="2.5" />' +
'<line x1="198" y1="146" x2="208" y2="146" stroke="#1C1B18" stroke-width="2.5" />' +
'<circle cx="138" cy="149" r="2.8" fill="#1C1B18" />' +
'<circle cx="182" cy="149" r="2.8" fill="#1C1B18" />' +
'<path d="M158 158 L156 172 L164 172" fill="none" stroke="#1C1B18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' +
'<path d="M146 190 Q160 199 174 190" fill="none" stroke="#1C1B18" stroke-width="2.5" stroke-linecap="round" />' +
'<g transform="translate(50, 226)">' +
'<circle cx="0" cy="0" r="14" fill="#FAF7F0" stroke="#1C1B18" stroke-width="2" />' +
'<circle cx="0" cy="0" r="5" fill="#D94E28" stroke="#1C1B18" stroke-width="1.5" />' +
'</g></svg>';
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
    var stage = mount('forklift-stage');
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
    hl.appendChild(el('h2', 'font-display font-bold text-3xl uppercase tracking-tight', S.name || ''));
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
