/* =========================================================================
   PROJECTS.JS (assets)  —  Renders content/projects.js in three places:
   the home page cards, the showcase page, and a project's detail page.
   Self-contained: it does not need render.js, so the sub-pages stay light.
   You normally do not need to edit this. Edit content/projects.js instead.
   ========================================================================= */

window.MSProjects = (function () {
  'use strict';

  /* Sub-pages set window.MS_BASE = "../../" so image paths written from the
     site root resolve from any depth, including over file://. */
  function base() { return window.MS_BASE || ''; }
  function url(p) { return p ? base() + p : p; }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  var BADGE = {
    signal: 'bg-signal text-cream border border-ink',
    scope:  'bg-scope text-cream border border-ink',
    amber:  'bg-amberretro text-ink border border-ink',
    ink:    'bg-ink text-cream border border-ink',
    paper:  'bg-paper text-ink border border-ink'
  };

  /* An archived project drops out of every listing and its detail page stops
     serving the write-up. Good for shelving a project; NOT a way to keep
     something confidential — the data file and images would still sit in the
     repo and be downloadable. For that, take it out of the repo. */
  function all() {
    return (window.PROJECTS || []).filter(function (p) { return !p.archived; });
  }
  function bySlug(s) {
    var p = window.PROJECTS || [];
    for (var i = 0; i < p.length; i++) if (p[i].slug === s) return p[i];
    return null;
  }

  /* ---------- one card, used on the home page and the showcase -------- */

  function card(p) {
    var linked = !!p.detail;
    var node = el(linked ? 'a' : 'article', 'project-card retro-card flex flex-col h-full' + (linked ? ' is-linked' : ''));
    if (linked) {
      node.href = url('projects/' + p.slug + '/');
      node.setAttribute('aria-label', p.title + ' — read more');
    }

    /* media first: this is the thing people look at. Where a project has
       no photograph yet, a drawn panel keeps the card the right shape
       instead of leaving a hole. */
    var fig = el('div', 'project-media');
    if (p.media && p.media.src) {
      fig.appendChild(mediaNode(p.media.src, p.media.alt || p.title || '', p.media.poster));
    } else {
      fig.classList.add('is-blank');
      fig.innerHTML = '<span class="project-media-code">' + (p.code || '') + '</span>';
    }
    node.appendChild(fig);

    var body = el('div', 'p-5 sm:p-6 flex flex-col flex-1');

    var head = el('div', 'flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2.5 mb-4 min-h-[1.75rem]');
    /* the project codes were shelf numbers for a shelf nobody browses,
       so the badge carries the status only, where there is one */
    if (p.status) {
      head.appendChild(el('span', 'font-mono text-xs font-bold uppercase px-2 py-0.5 ' + (BADGE[p.badgeColor] || BADGE.signal), p.status));
    }
    if (p.kicker) head.appendChild(el('span', 'font-mono text-[11px] font-semibold uppercase text-muted', p.kicker));
    body.appendChild(head);

    body.appendChild(el('h3', 'font-display font-bold text-ink text-lg leading-snug mb-2', p.title || ''));
    if (p.summary) body.appendChild(el('p', 'text-sm text-ink/85 leading-relaxed mb-4', p.summary));

    var foot = el('div', 'mt-auto');
    if (p.tags && p.tags.length) {
      var row = el('div', 'pt-3 border-t border-ink/25 flex flex-wrap gap-1.5 font-mono text-[11px]');
      p.tags.forEach(function (t) { row.appendChild(el('span', 'px-2 py-0.5 bg-paper border border-ink', t)); });
      foot.appendChild(row);
    }
    if (linked) {
      foot.appendChild(el('span', 'project-more font-mono text-[11px] font-bold uppercase text-signal mt-3 inline-flex items-center gap-1.5',
        'Read the write-up <span aria-hidden="true">&rarr;</span>'));
    }
    body.appendChild(foot);
    node.appendChild(body);
    return node;
  }

  function grid(list, columns) {
    var cls = columns === 2
      ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    var g = el('div', cls);
    list.forEach(function (p) { g.appendChild(card(p)); });
    return g;
  }

  /* ---------- home page: every project, in a mixed rhythm ------------- */

  /* Two wide cards then three narrow ones, repeating. The wide ones carry
     the media at a size worth looking at; the rest keep the page from
     becoming a column of identical blocks. */
  function renderFeatured(block) {
    var list = all();
    var g = el('div', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch');
    list.forEach(function (p, i) {
      var wide = (i % 5) < 2;                       /* 2 wide, then 3 */
      var c = card(p);
      c.className += wide ? ' lg:col-span-3' : ' lg:col-span-2';
      if (wide) c.classList.add('is-wide');
      g.appendChild(c);
    });
    return g;
  }

  /* ---------- the showcase page --------------------------------------- */

  function renderShowcase(host) {
    if (!host) return;
    host.appendChild(grid(all(), 3));
  }

  /* ---------- the detail page ----------------------------------------- */

  /* A page can carry twenty clips. Only the ones on screen are allowed to run,
     so the browser is never decoding the whole set at once. */
  var seen = null;
  function watch(v) {
    if (!window.IntersectionObserver) return;
    if (!seen) {
      seen = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var t = e.target;
          if (e.isIntersecting) { var r = t.play(); if (r && r.catch) r.catch(function () {}); }
          else if (!t.paused) t.pause();
        });
      }, { rootMargin: '150px 0px' });
    }
    v.autoplay = false;
    requestAnimationFrame(function () { seen.observe(v); });
  }

  function isVideo(src) { return /\.(mp4|webm)(\?|$)/i.test(src || ''); }

  /* a still image or a silent looping clip, depending on the file extension */
  function mediaNode(src, alt, poster) {
    if (isVideo(src)) {
      var v = el('video');
      v.src = url(src);
      v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.preload = 'metadata';
      watch(v);
      if (poster) v.poster = url(poster);
      if (alt) v.setAttribute('aria-label', alt);
      return v;
    }
    var img = el('img');
    img.src = url(src);
    img.alt = alt || '';
    img.loading = 'lazy';
    return img;
  }

  function figure(src, alt, caption, cls, poster) {
    var f = el('figure', 'project-figure' + (cls ? ' ' + cls : ''));
    f.appendChild(mediaNode(src, alt, poster));
    if (caption) f.appendChild(el('figcaption', 'font-mono text-[11px] leading-relaxed text-muted pt-2.5', caption));
    return f;
  }

  function detailBlock(b) {
    switch (b.type) {
      case 'heading2':
        return el('h2', 'font-display font-bold text-2xl sm:text-3xl text-ink border-b-2 border-ink pb-3 pt-4', b.label || '');

      case 'prose': {
        var w = el('div', 'space-y-3');
        if (b.heading) w.appendChild(el('h3', 'font-display font-bold text-xl text-ink', b.heading));
        (b.body || []).forEach(function (t) {
          w.appendChild(el('p', 'text-[15px] leading-relaxed text-ink/90 max-w-4xl', t));
        });
        return w;
      }

      /* two short prose items side by side, so a wide page is not half empty */
      case 'prose-pair': {
        var pr = el('div', 'grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start');
        (b.items || []).forEach(function (it) {
          var col = el('div', 'space-y-3');
          if (it.heading) col.appendChild(el('h3', 'font-display font-bold text-xl text-ink', it.heading));
          (it.body || []).forEach(function (t) {
            col.appendChild(el('p', 'text-[15px] leading-relaxed text-ink/90', t));
          });
          pr.appendChild(col);
        });
        return pr;
      }

      case 'steps': {
        var s = el('div', 'space-y-3');
        if (b.heading) s.appendChild(el('h3', 'font-display font-bold text-xl text-ink mb-1', b.heading));
        var ul = el('ul', 'grid grid-cols-1 lg:grid-cols-2 gap-3 items-start');
        (b.items || []).forEach(function (it) {
          var li = el('li', 'flex items-start gap-3 retro-card p-4');
          li.appendChild(el('span', 'font-mono text-xs font-bold text-signal mt-0.5 shrink-0', it.n || ''));
          li.appendChild(el('span', 'text-sm leading-relaxed text-ink/90',
            (it.label ? '<strong class="text-ink">' + it.label + '</strong> ' : '') + (it.text || '')));
          ul.appendChild(li);
        });
        s.appendChild(ul);
        return s;
      }

      /* A protocol: prose on the left, its clips on the right. Fills the page
         width without stretching the text to an unreadable line length, and
         gives the architecture diagram roughly twice the width it had in a
         three-across row. */
      case 'protocol': {
        var row = el('div', 'grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 lg:gap-8 items-start');

        var txt = el('div', 'space-y-3');
        if (b.heading) txt.appendChild(el('h3', 'font-display font-bold text-xl text-ink', b.heading));
        (b.body || []).forEach(function (t) {
          txt.appendChild(el('p', 'text-[15px] leading-relaxed text-ink/90', t));
        });
        row.appendChild(txt);

        var media = el('div', 'space-y-4');
        if (b.arch) {
          media.appendChild(figure(b.arch, b.heading + ' — control architecture',
            'Control architecture: the per-agent signal path, with the law simulated top-right.'));
        }
        var pair = el('div', 'grid grid-cols-1 sm:grid-cols-2 gap-4');
        if (b.hardware) {
          pair.appendChild(figure(b.hardware, b.heading + ' — flown on the Crazyflie swarm',
            'The real five-Crazyflie swarm, replayed from the .mcap log in Foxglove.'));
        }
        if (b.sim) {
          pair.appendChild(figure(b.sim, b.heading + ' — Gazebo simulation', 'The same law in Gazebo Harmonic.'));
        }
        if (pair.childNodes.length) media.appendChild(pair);
        row.appendChild(media);

        var wrap = el('div', 'space-y-5');
        wrap.appendChild(row);
        if (b.results) {
          /* full page width: these plots are 1600 px of small axis labels */
          wrap.appendChild(figure(b.results, b.heading + ' — simulation and hardware traces', b.resultsCaption));
        }
        return wrap;
      }

      case 'figure':
        return figure(b.src, b.alt, b.caption, b.hero ? 'is-hero' : null, b.poster);

      case 'figures': {
        var g = el('div', 'grid grid-cols-1 ' + (b.columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3') + ' gap-5');
        (b.items || []).forEach(function (it) { g.appendChild(figure(it.src, it.alt, it.caption, null, it.poster)); });
        return g;
      }

      case 'table': {
        var t = el('div', 'space-y-3');
        if (b.heading) t.appendChild(el('h3', 'font-display font-bold text-xl text-ink', b.heading));
        var box = el('div', 'bg-cream border-2 border-ink shadow-hard overflow-x-auto');
        var tbl = el('table', 'w-full text-sm');
        if (b.headers && b.headers.length) {
          var thead = el('thead');
          var tr = el('tr', 'bg-ink text-cream font-mono text-[11px] font-bold uppercase tracking-wider');
          b.headers.forEach(function (h, i) {
            tr.appendChild(el('th', 'text-left px-4 py-2.5' + (i ? '' : ' w-1/3'), h));
          });
          thead.appendChild(tr); tbl.appendChild(thead);
        }
        var tb = el('tbody');
        (b.rows || []).forEach(function (r, ri) {
          var row = el('tr', ri % 2 ? 'bg-paper/50' : '');
          r.forEach(function (c, ci) {
            row.appendChild(el('td', 'px-4 py-2.5 border-t border-ink/20 ' + (ci ? 'font-mono' : 'font-semibold'), c));
          });
          tb.appendChild(row);
        });
        tbl.appendChild(tb); box.appendChild(tbl); t.appendChild(box);
        if (b.note) t.appendChild(el('p', 'font-mono text-[11px] leading-relaxed text-muted max-w-4xl', b.note));
        return t;
      }

      case 'callout': {
        var tone = b.tone === 'info' ? 'info' : 'warn';
        var c = el('aside', 'project-callout is-' + tone);
        c.appendChild(el('div', 'font-mono text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2',
          '<span class="callout-dot"></span><span>' + (b.heading || '') + '</span>'));
        (b.body || []).forEach(function (t) {
          c.appendChild(el('p', 'text-sm leading-relaxed text-ink/90 mb-2', t));
        });
        if (b.items && b.items.length) {
          var ul = el('ul', 'space-y-2 mt-2');
          b.items.forEach(function (t) {
            var li = el('li', 'text-sm leading-relaxed text-ink/90 pl-4 relative');
            li.innerHTML = '<span class="absolute left-0 top-[0.55em] w-1.5 h-1.5 bg-ink inline-block"></span>' + t;
            ul.appendChild(li);
          });
          c.appendChild(ul);
        }
        return c;
      }

      case 'tags': {
        var g2 = el('div', 'space-y-3');
        if (b.heading) g2.appendChild(el('h3', 'font-display font-bold text-xl text-ink', b.heading));
        var row2 = el('div', 'flex flex-wrap gap-2 font-mono text-[11px]');
        (b.items || []).forEach(function (t) {
          row2.appendChild(el('span', 'px-2.5 py-1 bg-cream border-2 border-ink shadow-hard-sm', t));
        });
        g2.appendChild(row2);
        return g2;
      }

      default:
        return el('p', 'font-mono text-xs text-signal', 'Unknown detail block: ' + String(b.type));
    }
  }

  function renderDetail(slug, host) {
    if (!host) return;
    var p = bySlug(slug);
    if (p && p.archived) {
      host.appendChild(el('div', 'retro-card p-6 font-mono text-sm',
        'This write-up is not published yet.<br><a class="underline text-signal" href="' + url('index.html') + '">Back to the portfolio</a>'));
      return;
    }
    if (!p || !p.detail) {
      host.appendChild(el('p', 'font-mono text-sm text-signal',
        'No project found for "' + String(slug) + '". Check the slug in content/projects.js.'));
      return;
    }
    var d = p.detail;
    document.title = p.title + ' — Mikhael Sunil';
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', (d.tagline || p.summary || '').replace(/<[^>]+>/g, ''));

    /* header */
    var head = el('header', 'space-y-4 border-b-2 border-ink pb-7');
    var badges = el('div', 'flex flex-wrap items-center gap-2 font-mono text-xs');
    badges.appendChild(el('span', 'font-bold uppercase px-2 py-0.5 ' + (BADGE[p.badgeColor] || BADGE.signal), p.code));
    if (p.status) badges.appendChild(el('span', 'font-bold uppercase px-2 py-0.5 bg-paper border border-ink', p.status));
    if (p.kicker) badges.appendChild(el('span', 'text-muted font-semibold uppercase', p.kicker));
    head.appendChild(badges);
    head.appendChild(el('h1', 'font-display font-bold text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.14] tracking-tight text-ink', p.title));
    if (d.tagline) head.appendChild(el('p', 'text-base sm:text-lg leading-relaxed text-ink/85 max-w-4xl', d.tagline));
    host.appendChild(head);

    if (d.facts && d.facts.length) {
      var strip = el('dl', 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-ink border-2 border-ink');
      d.facts.forEach(function (f) {
        var cell = el('div', 'bg-cream p-3');
        cell.appendChild(el('dt', 'font-mono text-[10px] font-bold uppercase tracking-wider text-muted mb-1', f.label));
        cell.appendChild(el('dd', 'font-mono text-xs font-bold text-ink leading-snug', f.value));
        strip.appendChild(cell);
      });
      host.appendChild(strip);
    }

    if (d.hero && d.hero.src) {
      host.appendChild(figure(d.hero.src, d.hero.alt, d.hero.caption, 'is-hero', d.hero.poster));
    } else if (p.media && p.media.src) {
      host.appendChild(figure(p.media.src, p.media.alt, p.media.caption, 'is-hero', p.media.poster));
    }

    (d.blocks || []).forEach(function (b) { host.appendChild(detailBlock(b)); });

    /* other projects */
    var others = all().filter(function (o) { return o.slug !== p.slug; }).slice(0, 3);
    if (others.length) {
      var more = el('div', 'pt-6 border-t-2 border-ink space-y-5');
      more.appendChild(el('h2', 'font-display font-bold text-xl text-ink', 'Other projects'));
      more.appendChild(grid(others, 3));
      host.appendChild(more);
    }
  }

  return {
    all: all, bySlug: bySlug, card: card, grid: grid,
    renderFeatured: renderFeatured, renderShowcase: renderShowcase, renderDetail: renderDetail
  };
})();
