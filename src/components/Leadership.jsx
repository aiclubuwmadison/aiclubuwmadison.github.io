import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Network,
  MessageSquare,
  Eye,
  Bot,
  HeartHandshake,
  Users,
  FolderGit2,
  LayoutGrid,
  CalendarDays,
} from 'lucide-react';
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
  <div className="lead-socials">
    {link && (
      <a href={link} target="_blank" rel="noreferrer" className="lead-social-btn" aria-label="LinkedIn">
        <IconLinkedIn />
      </a>
    )}
    <span className="lead-social-btn lead-social-btn--inert" aria-label="Email">
      <Mail size={14} strokeWidth={2} aria-hidden="true" />
    </span>
  </div>
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

const ArchiveSection = ({ id, num, title, meta, data, isOpen, onToggle }) => (
  <div className="atmos-archive">
    <button type="button" className="atmos-archive-toggle" onClick={() => onToggle(id)}
      aria-expanded={isOpen} aria-controls={`${id}-panel`}>
      <span className="atmos-archive-label">
        <span className="atmos-archive-num">{num}</span>
        <span className="atmos-archive-title">{title}</span>
      </span>
      <span className="atmos-archive-meta">
        <span>{meta}</span>
        <span className={`atmos-archive-glyph${isOpen ? ' is-open' : ''}`}>›</span>
      </span>
    </button>
    <div id={`${id}-panel`} className={`atmos-archive-panel${isOpen ? ' is-open' : ''}`} role="region">
      <div className="atmos-archive-panel-inner">
        <ArchiveRoster data={data} />
      </div>
    </div>
  </div>
);

const Leadership = () => {
  useEffect(() => {
    document.title = 'Leadership | AI@UW';
  }, []);

  const [expanded, setExpanded] = useState({ dec24Dec25Leaders: false, currentLeaders: false, pastLeaders: false });
  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const waveRef = useWaveCanvas();

  const PastLeadershipData = [
    [
      { file: 'anniruddh.jpg',  title: 'President',                          name: 'Anniruddh Kumar' },
      { file: '_placeholder.svg', title: 'Vice President',                     name: 'Tanish Nahata',       link: 'https://www.linkedin.com/in/tanish-nahata' },
      { file: '_placeholder.svg', title: 'Head of PR',                         name: 'Taha Sawar',          link: 'https://www.linkedin.com/in/sawar/' },
    ],
    [
      { file: 'arun.jpg',       title: 'Event Head',                         name: 'Arun Sivarajah' },
      { file: 'alexey.jpg',     title: 'Head of Project and Study Groups',   name: 'Alexey Gorbunov',    link: 'https://www.linkedin.com/in/alexey-gorbunov-b2153a19a/' },
      { file: 'ethan.jpg',      title: 'Webmaster',                          name: 'Ethan Wheeler',       link: 'https://www.linkedin.com/in/ethan-wheeler-abcdef/' },
    ],
    [
      { file: 'dane.jpg',       title: 'Advisor, Harvey D. Spangler Professor of Engineering', name: 'Dane Morgan', link: 'https://directory.engr.wisc.edu/mse/faculty/morgan_dane' },
    ],
  ];

  const SeptDec24LeadershipData = [
    [
      { file: 'Monish.jpg',     title: 'President',              name: 'Monish Vijay Kumar',            link: 'https://www.linkedin.com/in/monish-bangalore-vijay-kumar-a0411720a/' },
      { file: 'Monyka.jpeg',    title: 'Director of Marketing',  name: 'Ratcheny (Monyka) Lee',         link: 'https://www.linkedin.com/in/ratchenymonycalee/' },
      { file: 'vardaan.jpg',    title: 'Secretary',              name: 'Vardaan Kapoor',                link: 'https://www.linkedin.com/in/vardaankapoor/' },
    ],
    [
      { file: 'debo.jpg',       title: 'Events Manager',         name: 'Debo Jyoti Paul',               link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.png',        title: 'Club Meetings Manager',  name: 'Ira Hande',                     link: 'https://www.linkedin.com/in/ira-hande/' },
      { file: 'akash.jpeg',     title: 'Treasurer',              name: 'Akash Goda',                    link: 'https://www.linkedin.com/in/akashgoda/' },
    ],
    [
      { file: 'rohun.jpeg',     title: 'Editorial Assistant',    name: 'Rohun Bakshi',                  link: 'https://www.linkedin.com/in/rohun-bakshi/' },
    ],
  ];

  const Dec24Dec25LeadershipData = [
    [
      { file: 'vardaan.jpg',    title: 'President',              name: 'Vardaan Kapoor',                link: 'https://www.linkedin.com/in/vardaankapoor/' },
      { file: 'debo.jpg',       title: 'Vice President',         name: 'Debo Jyoti Paul',               link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.png',        title: 'Club Meetings Manager',  name: 'Ira Hande',                     link: 'https://www.linkedin.com/in/ira-hande/' },
    ],
    [
      { file: 'kashish.jpeg',   title: 'Communications Manager', name: 'Kashish Agarwal',               link: 'https://www.linkedin.com/in/kashishuw/' },
      { file: 'akash.jpeg',     title: 'Treasurer',              name: 'Akash Goda',                    link: 'https://www.linkedin.com/in/akashgoda/' },
      { file: 'charith.png',    title: 'Secretary',              name: 'Charith Reddy Pareddy',         link: 'https://www.linkedin.com/in/charith-reddy-pareddy-61252b329/' },
    ],
    [
      { file: 'rohun.jpeg',     title: 'Editorial Assistant',    name: 'Rohun Bakshi',                  link: 'https://www.linkedin.com/in/rohun-bakshi/' },
      { file: 'shikha.jpeg',    title: 'Social Media Manager',   name: 'Shikha Ashara',                 link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'sukrut.jpeg',    title: 'Student Tech Advisor',   name: 'Sukrut Chikodikar',             link: 'https://www.linkedin.com/in/schikodikar/' },
    ],
  ];

  const CurrentLeadershipData = [
    [
      { file: 'hriday.png',     title: 'President',              name: 'Hriday Sethi',                  link: 'https://www.linkedin.com/in/hridyanshsethi/' },
      { file: 'rishabh.jpeg',   title: 'Vice President',         name: 'Rishabh Aggarwal',              link: 'https://www.linkedin.com/in/rishabh-aggarwal-b03ab8211' },
      { file: 'samarth.png',    title: 'Secretary',              name: 'Samarth Bhargava',              link: 'https://www.linkedin.com/in/samarth010/' },
    ],
    [
      { file: 'shikha.jpeg',    title: 'Marketing Head',         name: 'Shikha Ashara',                 link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'arnav.jpg',      title: 'Communications Manager', name: 'Arnav Batra',                   link: 'https://www.linkedin.com/in/batraarnav/' },
      { file: 'swati.jpg',      title: 'Event Organizer',        name: 'Swati Banwani',                 link: 'https://www.linkedin.com/in/swati-banwani-8497ab1b8/' },
    ],
    [
      { file: 'sam.jpg',        title: 'Project Manager',        name: 'Sam Avramov',                   link: 'https://www.linkedin.com/in/samavramov/' },
      { file: 'yug.png',        title: 'Project Manager',        name: 'Yug Marwaha',                   link: 'https://www.linkedin.com/in/yug-marwaha-881b53321' },
      { file: 'kartik.jpg',     title: 'Project Manager',        name: 'Kartik Gangwar',                link: 'https://www.linkedin.com/in/kartik-gangwar' },
    ],
    [
      { file: 'jack.png',              title: 'Project Manager', name: 'Jack Koteles',   link: 'https://www.linkedin.com/in/jackkoteles/' },
      { file: '_placeholder.svg',      title: 'Project Manager', name: 'Adhyot Singh',   link: 'https://www.linkedin.com/in/adhyotsingh/' },
    ],
  ];

  const allCurrent = CurrentLeadershipData.flat();
  const featured   = allCurrent.slice(0, 2);
  const team       = allCurrent.slice(2);

  const FOCUS_TOPICS = [
    { Icon: Network,        label: 'Machine Learning' },
    { Icon: MessageSquare,  label: 'NLP' },
    { Icon: Eye,            label: 'Computer Vision' },
    { Icon: Bot,            label: 'Robotics' },
    { Icon: HeartHandshake, label: 'AI for Social Good' },
    { Icon: Users,          label: 'Human-AI Interaction' },
  ];

  return (
    <div className="atmos-root atmos-leadership">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="lead-hero">
        <div className="atmos-shell lead-hero-shell">
          <div className="lead-hero-left">
            <h1 className="lead-hero-title">
              The people<br /><em>behind</em> AI@UW.
            </h1>
            <p className="lead-hero-lede">
              Students and mentors guiding AI@UW across projects, research, and community.
            </p>
            <a href="#officers" className="lead-hero-cta">
              Meet the team <span>↓</span>
            </a>
          </div>

          <div className="lead-hero-right">
            <canvas ref={waveRef} className="lead-wave-canvas" aria-hidden="true" />
            <div className="lead-collage">
              <div className="lead-collage-bg" aria-hidden="true" />
              <div className="lead-cc lead-cc-1">
                <img src="/images/portraits/hriday.png"   alt="Hriday Sethi"     loading="eager" fetchpriority="high" />
              </div>
              <div className="lead-cc lead-cc-2">
                <img src="/images/portraits/rishabh.jpeg" alt="Rishabh Aggarwal" loading="eager" fetchpriority="high" />
              </div>
              <div className="lead-cc lead-cc-3">
                <img src="/images/portraits/shikha.jpeg"  alt="Shikha Ashara"    loading="eager" />
              </div>
              <div className="lead-cc lead-cc-4">
                <img src="/images/portraits/samarth.png"  alt="Samarth Bhargava" loading="eager" />
              </div>
              <div className="lead-collage-spiral" aria-hidden="true">
                <img src="/images/logo.png" alt="" />
              </div>
            </div>
            <p className="lead-hero-tagline">
              Built by students.<br />
              Driven by curiosity.<br />
              United by <em>impact</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <div className="atmos-shell">
        <div className="lead-stats">
          <div className="lead-stat">
            <Users className="lead-stat-icon" strokeWidth={1.7} aria-hidden="true" />
            <div><span className="lead-stat-num">2000+</span><span className="lead-stat-label">Members</span></div>
          </div>
          <div className="lead-stat">
            <FolderGit2 className="lead-stat-icon" strokeWidth={1.7} aria-hidden="true" />
            <div><span className="lead-stat-num">40+</span><span className="lead-stat-label">Active Projects</span></div>
          </div>
          <div className="lead-stat">
            <LayoutGrid className="lead-stat-icon" strokeWidth={1.7} aria-hidden="true" />
            <div><span className="lead-stat-num">15+</span><span className="lead-stat-label">Research Groups</span></div>
          </div>
          <div className="lead-stat">
            <CalendarDays className="lead-stat-icon" strokeWidth={1.7} aria-hidden="true" />
            <div><span className="lead-stat-num">Weekly</span><span className="lead-stat-label">Seminars &amp; Workshops</span></div>
          </div>
        </div>
      </div>

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

      {/* ── FOCUS SECTION ──────────────────────────────────── */}
      <section className="lead-focus">
        <div className="atmos-shell">
          <div className="lead-focus-card">
            <div className="lead-focus-left">
              <p className="lead-section-eyebrow">What We&rsquo;re Focused On</p>
              <h2 className="lead-focus-title">Building the future through AI.</h2>
            </div>
            <div className="lead-focus-topics">
              {FOCUS_TOPICS.map(({ Icon, label }) => (
                <div className="lead-focus-topic" key={label}>
                  <span className="lead-focus-topic-icon">
                    <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
            <div className="lead-focus-cta">
              <p>Interested in leading a project or team?</p>
              <Link to="/contact" className="lead-focus-link">
                Become a Member <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHIVE ────────────────────────────────────────── */}
      <section className="lead-archive-section">
        <div className="atmos-shell">
          <div className="lead-section-head">
            <div>
              <p className="lead-section-eyebrow">Archive</p>
              <h2 className="lead-section-title">Past terms</h2>
            </div>
            <span className="lead-section-aside lead-archive-select">
              Select a term
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4 6h8M4 9.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

          <div className="lead-archive-wrap">
            <ArchiveSection id="dec24Dec25Leaders" num="I" title="December 2024 — December 2025"
              meta="View term" data={Dec24Dec25LeadershipData}
              isOpen={expanded.dec24Dec25Leaders} onToggle={toggle} />
            <ArchiveSection id="currentLeaders" num="II" title="September 2024 — December 2024"
              meta="View term" data={SeptDec24LeadershipData}
              isOpen={expanded.currentLeaders} onToggle={toggle} />
            <ArchiveSection id="pastLeaders" num="III" title="Past Leadership"
              meta="View term" data={PastLeadershipData}
              isOpen={expanded.pastLeaders} onToggle={toggle} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Leadership;
