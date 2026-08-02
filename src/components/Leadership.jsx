import { useState, useRef, useEffect } from 'react';
import './Leadership.css';

const PORTRAIT_PLACEHOLDER = '/images/portraits/_placeholder.svg';

function useResolvedPortrait(file) {
  const target = `/images/portraits/${file}`;
  const [src, setSrc] = useState(target);
  const [prevTarget, setPrevTarget] = useState(target);

  if (target !== prevTarget) {
    setPrevTarget(target);
    setSrc(target);
  }

  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setSrc(target);
    probe.onerror = () => setSrc(PORTRAIT_PLACEHOLDER);
    probe.src = target;
    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, [target]);
  return src;
}

function useWaveCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let lastW = 0;
    let lastH = 0;

    function render(w, h) {
      const NUM_CURVES  = 28;
      const DOTS_EACH   = 65;

      for (let c = 0; c < NUM_CURVES; c++) {
        const p = c / NUM_CURVES;           // 0 → 1 across the fan

        // All curves originate from a single focal point bottom-left
        const sx = w * 0.08;
        const sy = h * 0.92;

        // Fan control points sweep upward-right as p increases
        const cp1x = w * (0.18 + p * 0.22);
        const cp1y = h * (0.75 - p * 0.55);
        const cp2x = w * (0.42 + p * 0.30);
        const cp2y = h * (0.45 - p * 0.35);
        const ex   = w * (0.65 + p * 0.38);
        const ey   = h * (0.55 - p * 0.50);

        for (let d = 0; d < DOTS_EACH; d++) {
          const t  = d / DOTS_EACH;
          const mt = 1 - t;

          // Cubic Bézier
          const x = mt*mt*mt*sx + 3*mt*mt*t*cp1x + 3*mt*t*t*cp2x + t*t*t*ex;
          const y = mt*mt*mt*sy + 3*mt*mt*t*cp1y + 3*mt*t*t*cp2y + t*t*t*ey;

          // Dots largest/darkest at curve start, fade out at end
          const dotR = Math.max(0.4, 2.8 * (1 - t * 0.75) * (1 - p * 0.45));
          const alpha = 0.55 * (1 - t * 0.65) * (0.25 + (1 - p) * 0.75);

          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(197,5,12,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    }

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      if (w === lastW && h === lastH) {
        ctx.clearRect(0, 0, w, h);
        render(w, h);
        return;
      }
      lastW = w;
      lastH = h;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      render(w, h);
    }

    draw();
    let rafId;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        draw();
      });
    });
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);
  return ref;
}

const ROLE_DESC = {
  'President':                          'Leading strategy and driving the vision forward.',
  'Vice President':                     'Building teams and empowering leaders.',
  'Secretary':                          'Keeping things organized and everyone aligned.',
  'Marketing Head':                     'Telling our story and growing our reach.',
  'Communications Manager':             'Connecting ideas, people, and opportunities.',
  'Event Organizer':                    'Creating experiences that bring us together.',
  'Project Manager':                    'Guiding teams to ship real AI systems.',
  'Treasurer':                          'Keeping us funded and financially sound.',
  'Club Meetings Manager':              'Making every meeting count.',
  'Director of Marketing':              'Shaping our brand and voice.',
  'Events Manager':                     'Orchestrating memorable experiences.',
  'Social Media Manager':               'Building our community online.',
  'Student Tech Advisor':               'Bridging tech and leadership.',
  'Editorial Assistant':                'Crafting the story of AI@UW.',
  'Head of PR':                         'Building bridges beyond campus.',
  'Event Head':                         'Bringing the community together.',
  'Head of Project and Study Groups':   'Growing our learning tracks.',
  'Webmaster':                          'Keeping our digital presence sharp.',
};

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const Socials = ({ link }) => (
  link ? (
    <div className="lead-socials">
      <a href={link} target="_blank" rel="noopener noreferrer" className="lead-social-btn" aria-label="LinkedIn">
        <IconLinkedIn />
      </a>
    </div>
  ) : null
);

const FeaturedCard = ({ m }) => {
  const src = useResolvedPortrait(m.file);
  return (
    <div
      className="lead-featured-card"
      style={{ backgroundImage: `linear-gradient(to right, rgba(18,18,22,0.72) 28%, rgba(18,18,22,0.0) 55%), url('${src}')` }}
    >
      <div className="lead-featured-arrow" aria-hidden="true">↗</div>
      <span className="lead-card-role lead-card-role--light">{m.title}</span>
      <h3 className="lead-featured-name">{m.name}</h3>
      <p className="lead-featured-desc">{ROLE_DESC[m.title] || ''}</p>
      <Socials link={m.link} />
    </div>
  );
};
const RosterCard = ({ m }) => {
  const src = useResolvedPortrait(m.file);
  return (
    <div className="lead-team-card">
      <div className="lead-team-photo">
        <img
          src={src}
          alt={m.name}
          loading="lazy"
        />
      </div>
      <span className="lead-card-role">{m.title}</span>
      <h4 className="lead-team-name">{m.name}</h4>
      <p className="lead-team-desc">{ROLE_DESC[m.title] || 'Contributing to AI@UW.'}</p>
      <Socials link={m.link} />
    </div>
  );
};

const ArchiveRoster = ({ data }) => {
  const all = data.flat();
  const featured = all.slice(0, 2);
  const team = all.slice(2);

  return (
    <div className="lead-archive-roster">
      {featured.length > 0 && (
        <div className="lead-featured-grid">
          {featured.map((m) => <FeaturedCard key={m.name} m={m} />)}
        </div>
      )}

      {team.length > 0 && (
        <div className="lead-team-grid">
          {team.map((m) => (
            <RosterCard key={m.name} m={m} />
          ))}
        </div>
      )}
    </div>
  );
};

const ArchiveAvatar = ({ member }) => {
  const src = useResolvedPortrait(member.file);
  return <img src={src} alt="" loading="lazy" />;
};

const ArchiveSection = ({ id, term, title, data, isOpen, onToggle }) => {
  const members = data.flat();
  const memberCount = members.length;
  const toggleId = `${id}-toggle`;

  return (
    <li className={`atmos-archive${isOpen ? ' is-open' : ''}`}>
      <h3 className="atmos-archive-heading">
        <button id={toggleId} type="button" className="atmos-archive-toggle" onClick={() => onToggle(id)}
          aria-expanded={isOpen} aria-controls={`${id}-panel`}>
          <span className="atmos-archive-spine" aria-hidden="true">
            <span className="atmos-archive-node"><i /><i /><i /><i /><i /></span>
          </span>
          <span className="atmos-archive-label">
            <span className="atmos-archive-term">{term}</span>
            <span className="atmos-archive-title">{title}</span>
          </span>
          <span className="atmos-archive-preview" aria-hidden="true">
            <span className="atmos-archive-avatars">
              {members.slice(0, 4).map((member) => (
                <ArchiveAvatar key={member.name} member={member} />
              ))}
            </span>
            <span>{memberCount} members</span>
          </span>
          <span className="atmos-archive-action">
            <span>{isOpen ? 'Close roster' : 'View roster'}</span>
            <span className="atmos-archive-glyph" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="m5.5 7.5 4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </button>
      </h3>
      <div id={`${id}-panel`} className={`atmos-archive-panel${isOpen ? ' is-open' : ''}`}
        role="region" aria-labelledby={toggleId} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="atmos-archive-panel-inner">
          <ArchiveRoster data={data} />
        </div>
      </div>
    </li>
  );
};

const Leadership = () => {
  useEffect(() => {
    document.title = 'Leadership | AI@UW';
  }, []);

  // IntersectionObserver for scroll reveals
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('sr-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    const elements = document.querySelectorAll(
      '.lead-officers .lead-featured-card, .lead-officers .lead-team-card, .lead-archive-wrap .atmos-archive'
    );

    elements.forEach((el, i) => {
      el.classList.add('sr-hidden');
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const [expanded, setExpanded] = useState({ dec24Dec25Leaders: false, currentLeaders: false, pastLeaders: false });
  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const waveRef = useWaveCanvas();

  const PastLeadershipData = [
    [
      { file: 'anniruddh.webp',  title: 'President',                          name: 'Anniruddh Kumar' },
      { file: '_placeholder.svg', title: 'Vice President',                     name: 'Tanish Nahata',       link: 'https://www.linkedin.com/in/tanish-nahata' },
      { file: '_placeholder.svg', title: 'Head of PR',                         name: 'Taha Sawar',          link: 'https://www.linkedin.com/in/sawar/' },
    ],
    [
      { file: 'arun.webp',       title: 'Event Head',                         name: 'Arun Sivarajah' },
      { file: 'alexey.webp',     title: 'Head of Project and Study Groups',   name: 'Alexey Gorbunov',    link: 'https://www.linkedin.com/in/alexey-gorbunov-b2153a19a/' },
      { file: 'ethan.webp',      title: 'Webmaster',                          name: 'Ethan Wheeler' },
    ],
    [
      { file: 'dane.webp',       title: 'Advisor, Harvey D. Spangler Professor of Engineering', name: 'Dane Morgan', link: 'https://directory.engr.wisc.edu/mse/faculty/morgan_dane' },
    ],
  ];

  const SeptDec24LeadershipData = [
    [
      { file: 'Monish.webp',     title: 'President',              name: 'Monish Vijay Kumar',            link: 'https://www.linkedin.com/in/monish-bangalore-vijay-kumar-a0411720a/' },
      { file: 'Monyka.webp',    title: 'Director of Marketing',  name: 'Ratcheny (Monyka) Lee',         link: 'https://www.linkedin.com/in/ratchenymonycalee/' },
      { file: 'vardaan.webp',    title: 'Secretary',              name: 'Vardaan Kapoor',                link: 'https://www.linkedin.com/in/vardaankapoor/' },
    ],
    [
      { file: 'debo.webp',       title: 'Events Manager',         name: 'Debo Jyoti Paul',               link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.webp',        title: 'Club Meetings Manager',  name: 'Ira Hande',                     link: 'https://www.linkedin.com/in/ira-hande/' },
      { file: 'akash.webp',     title: 'Treasurer',              name: 'Akash Goda',                    link: 'https://www.linkedin.com/in/akashgoda/' },
    ],
    [
      { file: 'rohun.webp',     title: 'Editorial Assistant',    name: 'Rohun Bakshi',                  link: 'https://www.linkedin.com/in/rohun-bakshi/' },
    ],
  ];

  const Dec24Dec25LeadershipData = [
    [
      { file: 'vardaan.webp',    title: 'President',              name: 'Vardaan Kapoor',                link: 'https://www.linkedin.com/in/vardaankapoor/' },
      { file: 'debo.webp',       title: 'Vice President',         name: 'Debo Jyoti Paul',               link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.webp',        title: 'Club Meetings Manager',  name: 'Ira Hande',                     link: 'https://www.linkedin.com/in/ira-hande/' },
    ],
    [
      { file: 'kashish.webp',   title: 'Communications Manager', name: 'Kashish Agarwal',               link: 'https://www.linkedin.com/in/kashishuw/' },
      { file: 'akash.webp',     title: 'Treasurer',              name: 'Akash Goda',                    link: 'https://www.linkedin.com/in/akashgoda/' },
      { file: 'charith.webp',    title: 'Secretary',              name: 'Charith Reddy Pareddy',         link: 'https://www.linkedin.com/in/charith-reddy-pareddy-61252b329/' },
    ],
    [
      { file: 'rohun.webp',     title: 'Editorial Assistant',    name: 'Rohun Bakshi',                  link: 'https://www.linkedin.com/in/rohun-bakshi/' },
      { file: 'shikha.webp',    title: 'Social Media Manager',   name: 'Shikha Ashara',                 link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'sukrut.webp',    title: 'Student Tech Advisor',   name: 'Sukrut Chikodikar',             link: 'https://www.linkedin.com/in/schikodikar/' },
    ],
  ];

  const CurrentLeadershipData = [
    [
      { file: 'hriday.webp',     title: 'President',              name: 'Hriday Sethi',                  link: 'https://www.linkedin.com/in/hridyanshsethi/' },
      { file: 'rishabh.webp',   title: 'Vice President',         name: 'Rishabh Aggarwal',              link: 'https://www.linkedin.com/in/rishabh-aggarwal-b03ab8211' },
      { file: 'samarth.webp',    title: 'Secretary',              name: 'Samarth Bhargava',              link: 'https://www.linkedin.com/in/samarth010/' },
    ],
    [
      { file: 'shikha.webp',    title: 'Marketing Head',         name: 'Shikha Ashara',                 link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'arnav.webp',      title: 'Communications Manager', name: 'Arnav Batra',                   link: 'https://www.linkedin.com/in/batraarnav/' },
      { file: 'swati.webp',      title: 'Event Organizer',        name: 'Swati Banwani',                 link: 'https://www.linkedin.com/in/swati-banwani-8497ab1b8/' },
    ],
    [
      { file: 'sam.webp',        title: 'Project Manager',        name: 'Sam Avramov',                   link: 'https://www.linkedin.com/in/samavramov/' },
      { file: 'yug.webp',        title: 'Project Manager',        name: 'Yug Marwaha',                   link: 'https://www.linkedin.com/in/yug-marwaha-881b53321' },
      { file: 'kartik.webp',     title: 'Project Manager',        name: 'Kartik Gangwar',                link: 'https://www.linkedin.com/in/kartik-gangwar' },
    ],
    [
      { file: 'jack.webp',              title: 'Project Manager', name: 'Jack Koteles',   link: 'https://www.linkedin.com/in/jackkoteles/' },
      { file: '_placeholder.svg',      title: 'Project Manager', name: 'Adhyot Singh',   link: 'https://www.linkedin.com/in/adhyotsingh/' },
    ],
  ];

  const allCurrent = CurrentLeadershipData.flat();
  const featured   = allCurrent.slice(0, 2);
  const team       = allCurrent.slice(2);

  return (
    <div className="atmos-root atmos-leadership">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="lead-hero">
        <div className="atmos-shell lead-hero-shell">
          <div className="lead-hero-left">
            <p className="atmos-page-hero-eyebrow">Leadership</p>
            <h1 className="lead-hero-title">
              The people<br /><em>behind</em> AI@UW.
            </h1>
            <p className="atmos-page-hero-lede lead-hero-lede">
              Meet the students running AI@UW.
            </p>
            <a href="#officers" className="atmos-page-hero-cta lead-hero-cta">
              Meet the team <span>↓</span>
            </a>
          </div>

          <div className="lead-hero-right">
            <canvas ref={waveRef} className="lead-wave-canvas" aria-hidden="true" />
            <div className="lead-collage">
              <div className="lead-collage-bg" aria-hidden="true" />
              <div className="lead-cc lead-cc-1">
                <img src="/images/portraits/hriday.webp"   alt="Hriday Sethi"     loading="eager" fetchpriority="high" />
              </div>
              <div className="lead-cc lead-cc-2">
                <img src="/images/portraits/rishabh.webp" alt="Rishabh Aggarwal" loading="eager" fetchpriority="high" />
              </div>
              <div className="lead-cc lead-cc-3">
                <img src="/images/portraits/shikha.webp"  alt="Shikha Ashara"    loading="eager" />
              </div>
              <div className="lead-cc lead-cc-4">
                <img src="/images/portraits/samarth.webp"  alt="Samarth Bhargava" loading="eager" />
              </div>
              <div className="lead-collage-spiral" aria-hidden="true">
                <img src="/images/logo.webp" alt="" />
              </div>
            </div>
            <p className="lead-hero-tagline">
              Built by students. Driven by curiosity. United by <em>impact</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ── OFFICERS ───────────────────────────────────────── */}
      <section className="lead-officers" id="officers">
        <div className="atmos-shell">
          <div className="lead-section-head">
            <div>
              <p className="lead-section-eyebrow">Currently Serving</p>
              <h2 className="lead-section-title">Officers &amp; Project Leads</h2>
            </div>
            <span className="lead-section-aside">2025 — 2026</span>
          </div>

          {/* Featured 2-col dark cards */}
          <div className="lead-featured-grid">
            {featured.map((m) => <FeaturedCard key={m.name} m={m} />)}
          </div>

          {/* Team cards grid */}
          <div className="lead-team-grid">
            {team.map((m) => (
              <RosterCard key={m.name} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHIVE ────────────────────────────────────────── */}
      <section className="lead-archive-section" aria-labelledby="leadership-archive-title">
        <div className="atmos-shell">
          <div className="lead-section-head lead-archive-head">
            <div className="lead-archive-headcopy">
              <p className="lead-section-eyebrow">Archive</p>
              <h2 id="leadership-archive-title" className="lead-section-title">Leadership archive</h2>
              <p className="lead-archive-intro">Explore the people who shaped AI@UW in previous terms.</p>
            </div>
            <span className="lead-archive-count">3 archived rosters</span>
          </div>

          <ol className="lead-archive-wrap">
            <ArchiveSection id="dec24Dec25Leaders" term="2024–25 term" title="December 2024 — December 2025"
              data={Dec24Dec25LeadershipData}
              isOpen={expanded.dec24Dec25Leaders} onToggle={toggle} />
            <ArchiveSection id="currentLeaders" term="Fall 2024" title="September 2024 — December 2024"
              data={SeptDec24LeadershipData}
              isOpen={expanded.currentLeaders} onToggle={toggle} />
            <ArchiveSection id="pastLeaders" term="Earlier terms" title="Earlier leadership"
              data={PastLeadershipData}
              isOpen={expanded.pastLeaders} onToggle={toggle} />
          </ol>
        </div>
      </section>

    </div>
  );
};

export default Leadership;
