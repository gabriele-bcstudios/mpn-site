// ============================================================================
// MPN — shared behaviour: glass navbar, mobile menu, pill indicator,
// toggles, reveal-on-scroll
// ============================================================================

// ---- Single place for the outside services ---------------------------------
// Where "Log in / Sign up" send people once the platform is live.
const MPN_PLATFORM = {
  login: 'https://app.mpnagency.com/login',
  signup: 'https://app.mpnagency.com/signup'
};
// Platform launch: 2 November 2026, 00:00 UK time (GMT). Before that, every Log in /
// Sign up button opens launch.html (countdown + email list). Afterwards they go to the platform.
// Base URL of the booking API. Empty = same site (the Node server in /server serves both).
const MPN_API = '';
const MPN_LAUNCH = Date.parse('2026-11-02T00:00:00Z');
// Set to true once the real platform URLs above are in place. Until then Log in / Sign up stay on launch.html.
const MPN_PLATFORM_READY = false;
const mpnOpen = () => MPN_PLATFORM_READY && Date.now() >= MPN_LAUNCH;
const mpnPlatformUrl = (kind) => (mpnOpen() ? MPN_PLATFORM[kind] : 'launch.html');
// Kit (ConvertKit) form IDs. Paste the IDs of your Kit forms here (see README-SETUP.md).
const MPN_KIT = { host: 'https://app.kit.com', launchFormId: '10106305', newsletterFormId: '10108623' };
const mpnKitSubscribe = async (formId, email) => {
  if (!formId) throw new Error('Kit form not configured');
  const body = new FormData();
  body.append('email_address', email);
  await fetch(`${MPN_KIT.host}/forms/${encodeURIComponent(formId)}/subscriptions`, { method: 'POST', body, mode: 'no-cors' });
};

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Log in / Sign up buttons go straight to the platform --------- */
  document.querySelectorAll('a[data-platform]').forEach(a => {
    const url = mpnPlatformUrl(a.dataset.platform);
    if (!url) return;
    a.href = url;
    if (/^https?:/.test(url)) a.rel = 'noopener noreferrer'; else a.removeAttribute('rel');
  });



  /* ---------- Form guard: validation, honeypot and simple rate limit -------- */
  const guardForm = (form, onOk) => {
    let last = 0;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;                       // bot filled the trap field
      if (Date.now() - last < 4000) return;             // ignore rapid repeat submits
      if (!form.checkValidity()){ form.reportValidity(); return; }
      last = Date.now();
      onOk();
    });
  };

  /* ---------- Sticky navbar glass state on scroll ------------------------ */
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap){
    const onScroll = () => {
      navWrap.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Desktop nav sliding pill indicator -------------------------- */
  const navLinks = document.querySelector('.nav-links');
  if (navLinks){
    const indicator = navLinks.querySelector('.nav-pill-indicator');
    const links = [...navLinks.querySelectorAll('a')];

    const moveIndicator = (el) => {
      if (!el || !indicator) return;
      links.forEach(l => l.classList.toggle('under', l === el));
      indicator.style.opacity = '1';
      indicator.style.width = el.offsetWidth + 'px';
      indicator.style.transform = `translateX(${el.offsetLeft - 4}px)`;
    };
    const restIndicator = () => {
      const active = navLinks.querySelector('a.active');
      if (active) moveIndicator(active);
      else if (indicator){ indicator.style.opacity = '0'; links.forEach(l => l.classList.remove('under')); }
    };

    requestAnimationFrame(restIndicator);

    links.forEach(link => {
      link.addEventListener('mouseenter', () => moveIndicator(link));
    });
    navLinks.addEventListener('mouseleave', restIndicator);

    window.addEventListener('resize', restIndicator);
  }

  /* ---------- Mobile menu -------------------------------------------------- */
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  if (burger && mobileMenu){
    const open = () => { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; };
    burger.addEventListener('click', open);
    mobileClose && mobileClose.addEventListener('click', close);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  /* ---------- Generic segmented toggle pills (pricing 1to1/Group etc) ----- */
  document.querySelectorAll('.toggle-pill').forEach(group => {
    const buttons = [...group.querySelectorAll('button')];
    const indicator = group.querySelector('.toggle-indicator');

    const place = (btn) => {
      if (!indicator) return;
      indicator.style.width = btn.offsetWidth + 'px';
      indicator.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
    };

    const current = () => group.querySelector('button.active') || buttons[0];
    requestAnimationFrame(() => place(current()));

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        place(btn);
      });
    });
    const replace = () => place(group.querySelector('button.active') || buttons[0]);
    window.addEventListener('resize', replace);
    window.addEventListener('load', replace);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(replace);
  });

  /* ---------- FAQ accordion (contacts page) --------------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn && btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); const b = i.querySelector('.faq-q'); b && b.setAttribute('aria-expanded', 'false'); });
      if (!wasOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- Contact form (contacts page) ---------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm){
    const contactErr = document.getElementById('formError');
    const contactBtn = contactForm.querySelector('button[type="submit"]');
    guardForm(contactForm, async () => {
      contactErr.textContent = '';
      contactBtn.disabled = true;
      try {
        const f = contactForm.elements;
        const r = await fetch(`${MPN_API}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: f.name.value, email: f.email.value, type: f.type.value, message: f.message.value, consent: f.consent.checked, website: f.website.value }),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || 'Sorry, your message could not be sent. Please email info@mpnagency.com.');
        contactForm.classList.add('submitted');
        contactForm.reset();
      } catch (err){
        contactErr.textContent = err.message && err.message !== 'Failed to fetch' ? err.message : 'Sorry, your message could not be sent. Please email info@mpnagency.com.';
      } finally {
        contactBtn.disabled = false;
      }
    });
  }

  /* ---------- Book a discovery call: live availability, UK-time slots, local display -------- */
  const bfcCalendar = document.getElementById('bfcCalendar');
  if (bfcCalendar){
    const LONDON = 'Europe/London';
    const monthLabel = document.getElementById('bfcMonthLabel');
    const daysEl = document.getElementById('bfcDays');
    const slotsEl = document.getElementById('bfcSlots');
    const timesTitle = document.getElementById('bfcTimesTitle');
    const tzSelect = document.getElementById('bfcTz');
    const tzNote = document.getElementById('bfcTzNote');
    const dateChip = document.getElementById('bfcDateChip');
    const timeChip = document.getElementById('bfcTimeChip');
    const ukLine = document.getElementById('bfcUk');
    const errBox = document.getElementById('bfcError');
    const submitBtn = document.getElementById('bfcSubmit');
    const bfcForm = document.getElementById('bfcForm');
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let slots = [];                       // UTC timestamps (ms) of free slots
    let byDay = new Map();                // local date key -> [timestamps]
    let tz = LONDON;
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || LONDON; } catch (e) { tz = LONDON; }
    let selectedDay = null, selectedSlot = null;
    let viewYear = new Date().getFullYear(), viewMonth = new Date().getMonth();

    const dayKey = (ms, zone) => {
      const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(ms)).map(x => [x.type, x.value]));
      return `${p.year}-${p.month}-${p.day}`;
    };
    const fmtTime = (ms, zone) => new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit' }).format(new Date(ms));
    const fmtDay = (key) => { const [y, m, d] = key.split('-').map(Number); return `${new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })}`; };
    const fmtFull = (ms, zone) => new Intl.DateTimeFormat('en-GB', { timeZone: zone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(new Date(ms));

    const group = () => {
      byDay = new Map();
      slots.forEach(ms => { const k = dayKey(ms, tz); if (!byDay.has(k)) byDay.set(k, []); byDay.get(k).push(ms); });
    };

    const renderTzNote = () => {
      tzNote.textContent = tz === LONDON
        ? 'Calls are available 09:00–20:00 UK time (London).'
        : `Times are shown in your time zone. Calls run 09:00–20:00 UK time (London).`;
    };

    const renderSlots = () => {
      slotsEl.replaceChildren();
      if (!selectedDay){ timesTitle.textContent = 'Choose a day to see available times'; return; }
      timesTitle.textContent = fmtDay(selectedDay);
      (byDay.get(selectedDay) || []).forEach(ms => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'bfc-slot' + (ms === selectedSlot ? ' selected' : '');
        const main = document.createElement('strong'); main.textContent = fmtTime(ms, tz);
        b.append(main);
        if (tz !== LONDON){ const uk = document.createElement('small'); uk.textContent = `${fmtTime(ms, LONDON)} UK`; b.append(uk); }
        b.addEventListener('click', () => { selectedSlot = ms; updateChips(); renderSlots(); });
        slotsEl.append(b);
      });
    };

    const updateChips = () => {
      dateChip.textContent = selectedDay ? fmtDay(selectedDay) : 'Pick a day';
      timeChip.textContent = selectedSlot ? fmtTime(selectedSlot, tz) : 'Pick a time';
      if (selectedSlot && tz !== LONDON){ ukLine.hidden = false; ukLine.textContent = `That is ${fmtTime(selectedSlot, LONDON)} in the UK (London).`; } else ukLine.hidden = true;
    };

    const renderCalendar = () => {
      monthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;
      daysEl.replaceChildren();
      const first = new Date(viewYear, viewMonth, 1).getDay();
      const count = new Date(viewYear, viewMonth + 1, 0).getDate();
      for (let i = 0; i < first; i++) daysEl.append(document.createElement('span'));
      for (let d = 1; d <= count; d++){
        const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'bfc-day';
        b.textContent = d;
        if (!byDay.has(key)){ b.classList.add('muted'); b.disabled = true; }
        if (key === selectedDay) b.classList.add('selected');
        b.addEventListener('click', () => { selectedDay = key; selectedSlot = null; updateChips(); renderCalendar(); renderSlots(); });
        daysEl.append(b);
      }
    };

    const fillTz = () => {
      let zones = [];
      try { zones = Intl.supportedValuesOf('timeZone'); } catch (e) { zones = [LONDON, 'Europe/Rome', 'Europe/Madrid', 'Europe/Paris', 'America/New_York', 'America/Los_Angeles', 'Asia/Dubai', 'Asia/Tokyo', 'Australia/Sydney']; }
      const first = [LONDON]; if (tz !== LONDON) first.unshift(tz);
      const all = [...new Set([...first, ...zones])];
      tzSelect.replaceChildren();
      all.forEach(z => { const o = document.createElement('option'); o.value = z; o.textContent = z === LONDON ? 'UK — London (Europe/London)' : z.replace(/_/g, ' '); if (z === tz) o.selected = true; tzSelect.append(o); });
    };
    tzSelect.addEventListener('change', () => {
      tz = tzSelect.value; selectedDay = null; selectedSlot = null;
      group(); renderTzNote(); updateChips();
      const first = [...byDay.keys()].sort()[0];
      if (first){ const [y, m] = first.split('-').map(Number); viewYear = y; viewMonth = m - 1; selectedDay = first; }
      renderCalendar(); renderSlots(); updateChips();
    });

    document.getElementById('bfcPrev').addEventListener('click', () => { viewMonth--; if (viewMonth < 0){ viewMonth = 11; viewYear--; } renderCalendar(); });
    document.getElementById('bfcNext').addEventListener('click', () => { viewMonth++; if (viewMonth > 11){ viewMonth = 0; viewYear++; } renderCalendar(); });

    const loadSlots = async (keepSelection) => {
      const r = await fetch(`${MPN_API}/api/availability`, { cache: 'no-store' });
      if (!r.ok) throw new Error('availability');
      const j = await r.json();
      slots = j.slots.map(s => Date.parse(s));
      group();
      if (!keepSelection || !byDay.has(selectedDay)){
        selectedDay = null; selectedSlot = null;
        const first = [...byDay.keys()].sort()[0];
        if (first){ const [y, m] = first.split('-').map(Number); viewYear = y; viewMonth = m - 1; selectedDay = first; }
      } else if (selectedSlot && !slots.includes(selectedSlot)) selectedSlot = null;
      renderCalendar(); renderSlots(); updateChips();
    };

    const showError = (msg) => { errBox.textContent = msg; };
    fillTz(); renderTzNote(); updateChips(); renderCalendar();
    loadSlots(false).catch(() => {
      monthLabel.textContent = 'Unavailable';
      timesTitle.textContent = 'Booking is temporarily unavailable.';
      showError('We could not load the available times. Please try again in a moment or write to info@mpnagency.com.');
      submitBtn.disabled = true;
    });

    guardForm(bfcForm, async () => {
      showError('');
      if (!selectedSlot){ showError('Please choose a day and a time first.'); return; }
      submitBtn.disabled = true; submitBtn.textContent = 'Booking…';
      try {
        const r = await fetch(`${MPN_API}/api/book`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: bfcForm.elements.name.value, email: bfcForm.elements.email.value, startUtc: new Date(selectedSlot).toISOString(), timezone: tz, consent: true, website: bfcForm.elements.website.value })
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok){ showError(j.error || 'Something went wrong. Please try again.'); if (j.refresh) await loadSlots(true); return; }
        document.getElementById('bfcDoneWhen').textContent = tz === LONDON ? fmtFull(selectedSlot, LONDON) : `${fmtFull(selectedSlot, tz)} — that is ${fmtTime(selectedSlot, LONDON)} in the UK`;
        document.getElementById('bfcGoogle').href = j.googleUrl;
        document.getElementById('bfcIcs').href = `${MPN_API}${j.icsUrl}`;
        const meet = document.getElementById('bfcMeet');
        if (j.meetLink){ meet.href = j.meetLink; meet.hidden = false; }
        bfcForm.hidden = true; document.getElementById('bfcDone').hidden = false;
      } catch (e){
        showError('We could not reach the booking service. Please try again in a moment.');
      } finally {
        submitBtn.disabled = false; submitBtn.textContent = 'Book my call';
      }
    });
  }

  /* ---------- Pricing: plan links follow the one-to-one / group toggle -------- */
  const planLinks = document.querySelectorAll('a[data-plan]');
  window.mpnSyncPlanLinks = () => {
    const cards = document.getElementById('pricingCards');
    const format = cards && cards.dataset.mode === 'group' ? 'group' : 'one';
    planLinks.forEach(a => { a.href = `choose-plan.html?plan=${a.dataset.plan}&format=${format}`; });
  };
  window.mpnSyncPlanLinks();

  /* ---------- Home search: land on the matching lesson-type page ---------- */
  const heroSearch = document.getElementById('heroSearch');
  if (heroSearch){
    heroSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = heroSearch.elements.subject.value;
      const level = heroSearch.elements.level.value;
      const page = level === 'gcse' ? 'gcse.html' : level === 'a-level' ? 'a-level.html' : 'freestyle.html';
      window.location.href = `${page}?subject=${encodeURIComponent(subject)}&level=${encodeURIComponent(level)}`;
    });
  }

  /* ---------- Plan landing page: show the chosen package -------------------- */
  const planSummary = document.getElementById('planSummary');
  if (planSummary){
    const PLANS = {
      start: { name: 'START', range: '8–12 lessons', opts: ['8 lessons · 2 a week', '12 lessons · 3 a week'], one: '£24.99', group: '£19.99' },
      progress: { name: 'PROGRESS', range: '24–36 lessons', opts: ['24 lessons · 2 a week', '36 lessons · 3 a week'], one: '£22.99', group: '£18.99' },
      mastery: { name: 'MASTERY', range: '48–72 lessons', opts: ['48 lessons · 2 a week', '72 lessons · 3 a week'], one: '£19.99', group: '£16.99' }
    };
    const q = new URLSearchParams(window.location.search);
    const key = PLANS[q.get('plan')] ? q.get('plan') : 'progress';
    const format = q.get('format') === 'group' ? 'group' : 'one';
    const subject = q.get('subject') === 'Spanish' ? 'Spanish' : q.get('subject') === 'Italian' ? 'Italian' : 'Italian / Spanish';
    const p = PLANS[key];
    document.getElementById('psName').textContent = p.name;
    document.getElementById('psRange').textContent = p.range;
    document.getElementById('psOpts').textContent = p.opts.join('\n');
    document.getElementById('psPrice').textContent = p[format];
    document.getElementById('psLang').textContent = subject;
    document.getElementById('psFormat').textContent = format === 'group' ? 'Group' : 'One-to-one';
    document.getElementById('psGroupNote').hidden = format !== 'group';
    const params = `plan=${key}&format=${format}` + (subject === 'Italian / Spanish' ? '' : `&subject=${subject}`);
    document.getElementById('psLogin').href = mpnOpen() ? `${MPN_PLATFORM.login}?${params}` : 'launch.html';
    document.getElementById('psSignup').href = mpnOpen() ? `${MPN_PLATFORM.signup}?${params}` : 'launch.html';
    document.getElementById('psChange').href = 'pricing.html#packages';
  }

  /* ---------- Lesson-type pages: echo the search the visitor made ------------ */
  const searchNote = document.getElementById('searchNote');
  if (searchNote){
    const q = new URLSearchParams(window.location.search);
    const subject = q.get('subject');
    const level = q.get('level');
    const labels = { 'freestyle-basic': 'Freestyle Basic', 'freestyle-intermediate': 'Freestyle Intermediate', 'freestyle-advanced': 'Freestyle Advanced', gcse: 'GCSE', 'a-level': 'A-level' };
    if (subject === 'Italian' || subject === 'Spanish'){
      const type = searchNote.dataset.type;
      const lvl = labels[level] || (type === 'freestyle' ? 'Freestyle' : type === 'gcse' ? 'GCSE' : 'A-level');
      searchNote.textContent = `Your search: ${subject} · ${lvl}` + (type === 'freestyle' ? '' : ' — launching soon');
      searchNote.hidden = false;
    }
  }

  /* ---------- Pricing: show the level picked in the home search ------------- */
  const levelNote = document.getElementById('levelNote');
  if (levelNote){
    const level = new URLSearchParams(window.location.search).get('level');
    const names = { 'freestyle-basic': 'Freestyle Basic (A1–A2)', 'freestyle-intermediate': 'Freestyle Intermediate (B1–B2)', 'freestyle-advanced': 'Freestyle Advanced (C1–C2)' };
    if (names[level]){
      levelNote.querySelector('[data-level-name]').textContent = names[level];
      levelNote.hidden = false;
    }
  }

  /* ---------- Pricing: one-to-one / group plan toggle ---------------------- */
  const pricingCards = document.getElementById('pricingCards');
  const pricingToggle = document.querySelector('[data-pricing-toggle]');
  if (pricingCards && pricingToggle){
    pricingToggle.querySelectorAll('button[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        pricingCards.dataset.mode = mode;
        if (window.mpnSyncPlanLinks) window.mpnSyncPlanLinks();
        const note = document.querySelector('.mini-offers');
        if (note) note.dataset.mode = mode;
      });
    });
    const note0 = document.querySelector('.mini-offers'); if (note0) note0.dataset.mode = 'one';
  }

  /* ---------- Chip groups (mini toggle groups on pricing/how-to-start) ---- */
  document.querySelectorAll('.mini-toggle-group').forEach(group => {
    const chips = [...group.querySelectorAll('.chip')];
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (chip.classList.contains('disabled')) return;
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  });

  /* ---------- Hero image carousel — "sfoglia" flip-through effect --------- */
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel){
    let images = [];
    try { images = JSON.parse(heroCarousel.dataset.images || '[]'); } catch(e){ images = []; }

    if (images.length > 1){
      const frontSlot = heroCarousel.querySelector('.hero-slot-front');
      const peekSlot = heroCarousel.querySelector('.hero-slot-peek');
      const dots = [...heroCarousel.querySelectorAll('.hero-dots button')];

      let frontIdx = 0;
      let peekIdx = 1;

      const crossfade = (slot, src) => {
        const layers = slot.querySelectorAll('.hero-slide');
        const activeLayer = slot.querySelector('.hero-slide.active');
        const hiddenLayer = [...layers].find(l => l !== activeLayer);
        hiddenLayer.referrerPolicy = 'no-referrer';
        hiddenLayer.src = src;
        hiddenLayer.classList.add('active');
        activeLayer.classList.remove('active');
      };

      const flipSlot = (slot) => {
        slot.classList.remove('flip');
        void slot.offsetWidth;
        slot.classList.add('flip');
      };

      const setDot = (idx) => {
        dots.forEach((d,i) => d.classList.toggle('active', i === idx));
      };

      const advance = () => {
        frontIdx = peekIdx;
        peekIdx = (peekIdx + 1) % images.length;
        crossfade(frontSlot, images[frontIdx]);
        crossfade(peekSlot, images[peekIdx]);
        flipSlot(frontSlot);
        flipSlot(peekSlot);
        setDot(frontIdx);
      };

      const goTo = (idx) => {
        if (idx === frontIdx) return;
        frontIdx = idx;
        peekIdx = (idx + 1) % images.length;
        crossfade(frontSlot, images[frontIdx]);
        crossfade(peekSlot, images[peekIdx]);
        flipSlot(frontSlot);
        flipSlot(peekSlot);
        setDot(frontIdx);
        resetTimer();
      };

      let timer = setInterval(advance, 4200);
      const resetTimer = () => { clearInterval(timer); timer = setInterval(advance, 4200); };

      peekSlot.addEventListener('click', () => goTo(peekIdx));
      dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    }
  }

  /* ---------- Testimonials rotating wheel (home page) ---------------------- */
  const testiWheel = document.getElementById('testiWheel');
  if (testiWheel){
    const getCards = () => ({
      left: testiWheel.querySelector('.testi-card[data-pos="left"]'),
      center: testiWheel.querySelector('.testi-card[data-pos="center"]'),
      right: testiWheel.querySelector('.testi-card[data-pos="right"]')
    });

    const rotate = (dir) => {
      const { left, center, right } = getCards();
      if (dir === 1){
        // flow right -> center -> left (exits) -> re-enters from the right
        const exiting = left;
        exiting.classList.add('jump');
        exiting.dataset.pos = 'enter-right';
        void exiting.offsetWidth;
        exiting.classList.remove('jump');

        center.dataset.pos = 'left';
        right.dataset.pos = 'center';
        exiting.dataset.pos = 'right';
      } else {
        const exiting = right;
        exiting.classList.add('jump');
        exiting.dataset.pos = 'enter-left';
        void exiting.offsetWidth;
        exiting.classList.remove('jump');

        center.dataset.pos = 'right';
        left.dataset.pos = 'center';
        exiting.dataset.pos = 'left';
      }
    };

    let wheelTimer = setInterval(() => rotate(1), 5500);
    const resetWheelTimer = () => { clearInterval(wheelTimer); wheelTimer = setInterval(() => rotate(1), 5500); };

    const prevBtn = testiWheel.querySelector('.testi-nav.prev');
    const nextBtn = testiWheel.querySelector('.testi-nav.next');
    prevBtn && prevBtn.addEventListener('click', () => { rotate(-1); resetWheelTimer(); });
    nextBtn && nextBtn.addEventListener('click', () => { rotate(1); resetWheelTimer(); });
  }

  /* ---------- Stacked cards: same height so they dock and release together --- */
  (function equalStackCards(){
    const groups = [...document.querySelectorAll('.stack-cards')].filter(g => !g.closest('#build-plan'));
    if (!groups.length) return;
    const run = () => {
      groups.forEach(g => {
        const cards = [...g.querySelectorAll('.stack-card')];
        cards.forEach(c => { c.style.minHeight = ''; });
        if (window.innerWidth <= 980) return;
        const max = Math.max(...cards.map(c => c.offsetHeight));
        cards.forEach(c => { c.style.minHeight = max + 'px'; });
      });
    };
    run();
    window.addEventListener('resize', run);
    window.addEventListener('load', run);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
  })();

  /* ---------- Pricing: step tracker follows the stacked cards, cards dock blue - */
  (function stepTracker(){
    const tracker = document.getElementById('stepTracker');
    const cards = document.querySelectorAll('#build-plan .stack-card');
    if (!tracker || !cards.length) return;
    const items = [...tracker.children];
    const update = () => {
      let idx = 0;
      cards.forEach((c, i) => { if (c.getBoundingClientRect().top <= window.innerHeight * 0.55) idx = i; });
      items.forEach((li, i) => li.classList.toggle('active', i === idx));
      const stickyTop = parseFloat(getComputedStyle(cards[0]).top) || 140;
      const sticky = getComputedStyle(cards[0]).position === 'sticky';
      cards.forEach(c => c.classList.toggle('is-docked', sticky && c.getBoundingClientRect().top <= stickyTop + 2));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  })();

  /* ---------- Site-wide navigation helpers ------------------------------------ */
  (function navigationHelpers(){
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const main = document.querySelector('main');
    if (!main) return;

    const pages = {
      'students.html': ['Lessons', null],
      'freestyle.html': ['Freestyle', null],
      'gcse.html': ['GCSE', null],
      'a-level.html': ['A-level', null],
      'choose-plan.html': ['Get your plan', null],
      'launch.html': ['Platform launch', null],
      'pricing.html': ['Pricing', null],
      'how-to-start.html': ['How it works', null],
      'contacts.html': ['Contact', null],
      'book-a-discovery-call.html': ['Book a discovery call', null],
      'about-us.html': ['About us', 'About MPN'],
      'our-values.html': ['Our values', 'About MPN'],
      'education.html': ['Education', 'Our values'],
      'events.html': ['Events', 'Our values'],
      'innovation.html': ['Innovation', 'Our values'],
      'privacy-values.html': ['Privacy', 'Our values'],
      'accessibility.html': ['Accessibility', 'Our values'],
      'how-to-become-a-tutor.html': ['Become a tutor', 'For tutors'],
      'requirements.html': ['Tutor requirements', 'For tutors'],
      'how-can-i-earn.html': ['Tutor pay', 'For tutors'],
      'work-smart.html': ['How tutoring works', 'For tutors'],
      'tutor-faq.html': ['Tutor FAQs', 'For tutors'],
      'tutor-certification.html': ['Certification', 'For tutors'],
      'my-account.html': ['Tutor account', 'For tutors'],
      'privacy-policy.html': ['Privacy Policy', 'Legal'],
      'terms-of-use.html': ['Terms of Use', 'Legal'],
      'sales-and-refund.html': ['Refund Policy', 'Legal'],
      'cookie-policy.html': ['Cookie Policy', 'Legal'],
      'legal.html': ['Legal information', 'Legal'],
      'sitemap.html': ['Sitemap', null]
    };
    const info = pages[file];

    /* "On this page" table of contents for long legal / policy pages */
    const legal = document.querySelector('.legal-content');
    if (legal){
      const heads = [...legal.querySelectorAll('h2')];
      if (heads.length >= 4){
        const toc = document.createElement('nav');
        toc.className = 'page-toc';
        toc.setAttribute('aria-label', 'On this page');
        const title = document.createElement('p');
        title.className = 'page-toc-title';
        title.textContent = 'On this page';
        const ol = document.createElement('ol');
        heads.forEach((h, i) => {
          if (!h.id) h.id = 'sec-' + (i + 1);
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#' + h.id;
          a.textContent = h.textContent.replace(/^\d+\.\s*/, '');
          li.appendChild(a);
          ol.appendChild(li);
        });
        toc.append(title, ol);
        legal.insertBefore(toc, legal.firstChild);
      }
    }

    /* "Where next?" cards before the closing call-to-action */
    const cta = document.getElementById('cta');
    const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&h=460&q=80`;
    const studentCards = [
      ['students.html', 'Explore lessons', 'See how every lesson works and what is included.', '1758612214848-04e700d192ce'],
      ['pricing.html', 'See plans & prices', 'Compare Freestyle plans for Italian and Spanish.', '1590769398823-a62d7ecc25e6'],
      ['how-to-start.html', 'How it works', 'From sign-up to your first lesson in four steps.', '1760623681430-9224e69d9683'],
      ['book-a-discovery-call.html', 'Book a discovery call', 'Talk to our team and shortlist your tutors.', '1531534809446-724fcafe9e97'],
      ['contacts.html#faq', 'Read the FAQ', 'Quick answers about tokens, lessons and booking.', '1759984782050-981de6a25d55']
    ];
    const tutorCards = [
      ['how-to-become-a-tutor.html', 'Become a tutor', 'Teach Italian or Spanish with MPN.', '1616587894289-86480e533129'],
      ['requirements.html', 'Requirements', 'What you need to apply.', '1759984782050-981de6a25d55'],
      ['how-can-i-earn.html', 'Tutor pay', 'How earnings work, clearly explained.', '1590769398823-a62d7ecc25e6'],
      ['tutor-faq.html', 'Tutor FAQs', 'Answers to the most common questions.', '1616587226960-4a03badbe8bf']
    ];
    const isTutor = info && info[1] === 'For tutors';
    const pool = isTutor ? tutorCards : studentCards;
    const cards = pool.filter(c => c[0].split('#')[0] !== file).slice(0, 3);
    if (cta && info && file !== 'sitemap.html' && file !== 'book-a-discovery-call.html'){
      const sec = document.createElement('section');
      sec.className = 'container next-steps';
      const h2 = document.createElement('h2');
      h2.className = 'next-title';
      h2.innerHTML = 'Where to <em class="italic">next?</em>';
      const grid = document.createElement('div');
      grid.className = 'next-grid';
      cards.forEach(c => {
        const a = document.createElement('a');
        a.className = 'next-card';
        a.href = c[0];
        a.innerHTML = `<img src="${img(c[3])}" alt="" loading="lazy" referrerpolicy="no-referrer"><div><h3>${c[1]}</h3><p>${c[2]}</p><span>Go <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>`;
        grid.appendChild(a);
      });
      sec.append(h2, grid);
      cta.parentNode.insertBefore(sec, cta);
    }

    /* back-to-top */
    const top = document.createElement('button');
    top.className = 'back-to-top';
    top.type = 'button';
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(top);
    const toggleTop = () => top.classList.toggle('show', window.scrollY > 900);
    toggleTop();
    window.addEventListener('scroll', toggleTop, { passive: true });
  })();

  /* ---------- Launch page: countdown + email list (Kit) ------------------------ */
  (function launchPage(){
    const box = document.getElementById('countdown');
    if (!box) return;
    const target = MPN_LAUNCH;
    const two = n => String(n).padStart(2, '0');
    const els = { d: document.getElementById('cdDays'), h: document.getElementById('cdHours'), m: document.getElementById('cdMins'), s: document.getElementById('cdSecs') };
    const live = document.getElementById('launchLive');
    const form = document.getElementById('launchForm');
    const tick = () => {
      const left = target - Date.now();
      if (left <= 0){
        box.hidden = true;
        document.querySelector('.launch-note').hidden = true;
        if (mpnOpen()){
          if (form) form.hidden = true;
          if (live) live.hidden = false;
        } else {
          const badge = document.getElementById('launchBadge');
          if (badge) badge.textContent = 'Coming soon';
          const h1 = document.querySelector('h1');
          if (h1) h1.innerHTML = 'Our platform is <em>almost ready</em>';
          const lede = document.querySelector('.launch-lede');
          if (lede) lede.textContent = 'We are putting the finishing touches on it. Leave your email and we will let you know the moment the platform is live.';
        }
        return false;
      }
      els.d.textContent = String(Math.floor(left / 86400000));
      els.h.textContent = two(Math.floor(left / 3600000) % 24);
      els.m.textContent = two(Math.floor(left / 60000) % 60);
      els.s.textContent = two(Math.floor(left / 1000) % 60);
      return true;
    };
    if (tick()){ const t = setInterval(() => { if (!tick()) clearInterval(t); }, 1000); }

    if (form){
      const msg = document.getElementById('launchMsg');
      guardForm(form, async () => {
        const email = form.elements.email.value.trim();
        msg.className = 'lf-msg';
        try {
          await mpnKitSubscribe(MPN_KIT.launchFormId, email);
          msg.classList.add('ok');
          msg.textContent = 'You are on the list! We will email you as soon as the platform is live.';
          form.reset();
        } catch (err){
          msg.classList.add('err');
          msg.textContent = 'Sorry, we could not save your email right now. Please try again later or write to info@mpnagency.com.';
        }
      });
    }
  })();

  /* ---------- Newsletter popup: shown once per visitor -------------------- */
  (function initNewsletterPopup(){
    const STORAGE_KEY = 'mpnNewsletterSeen';
    let seen = false;
    try { seen = localStorage.getItem(STORAGE_KEY) === '1'; } catch(e){ seen = false; }
    if (seen || !(MPN_KIT.newsletterFormId || MPN_KIT.launchFormId) || document.getElementById('countdown')) return;

    const markSeen = () => { try { localStorage.setItem(STORAGE_KEY, '1'); } catch(e){} };

    const overlay = document.createElement('div');
    overlay.className = 'newsletter-popup-overlay';
    overlay.innerHTML = `
      <div class="newsletter-popup" role="dialog" aria-modal="true" aria-label="Subscribe to our newsletter">
        <button type="button" class="newsletter-popup-close" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
        </button>
        <div class="newsletter-popup-img">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80" alt="Learners enjoying a language lesson" referrerpolicy="no-referrer">
        </div>
        <div class="newsletter-popup-body">
          <span class="badge">Newsletter</span>
          <h3>Stay in the <em class="italic">loop</em></h3>
          <p>Tips for learning Italian and Spanish, new features and the occasional offer. No spam, unsubscribe any time.</p>
          <form class="newsletter-popup-form" id="newsletterPopupForm">
            <input type="email" name="email" placeholder="Enter your email address" required maxlength="254" autocomplete="email" spellcheck="false" aria-label="Email address">
            <label class="newsletter-consent"><input type="checkbox" name="consent" required><span>I agree to receive emails from MPN. I can unsubscribe at any time (<a href="privacy-policy.html">Privacy Policy</a>).</span></label>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
          <p class="newsletter-popup-success" id="newsletterPopupSuccess">Thanks for subscribing! Keep an eye on your inbox.</p>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const close = () => {
      overlay.classList.remove('open');
      markSeen();
      setTimeout(() => overlay.remove(), 400);
    };

    overlay.querySelector('.newsletter-popup-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

    const form = overlay.querySelector('#newsletterPopupForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()){ form.reportValidity(); return; }
      try {
        await mpnKitSubscribe(MPN_KIT.newsletterFormId || MPN_KIT.launchFormId, form.elements.email.value.trim());
        form.classList.add('submitted');
        markSeen();
        setTimeout(close, 1800);
      } catch (err){
        form.reportValidity();
      }
    });

    setTimeout(() => overlay.classList.add('open'), 1200);
  })();

});
