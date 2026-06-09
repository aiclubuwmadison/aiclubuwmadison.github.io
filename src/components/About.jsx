import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

// Wave + particle decoration for Areas section
const AREA_DOTS = [];

const AreasDecoration = () => (
  <svg className="about-areas-deco" viewBox="0 0 800 300" fill="none" aria-hidden="true">
    <path d="M-20,240 C160,175 290,65 470,45 S700,85 820,60"  stroke="rgba(197,5,12,0.28)" strokeWidth="1.6" fill="none"/>
    <path d="M-20,260 C165,190 298,78 478,58 S708,98 828,73"  stroke="rgba(197,5,12,0.18)" strokeWidth="1.1" fill="none"/>
    <path d="M-20,278 C170,205 306,92 486,72 S716,112 836,87" stroke="rgba(197,5,12,0.11)" strokeWidth="0.8" fill="none"/>
    <path d="M-20,222 C155,160 282,50 462,30 S692,70 812,47"  stroke="rgba(197,5,12,0.14)" strokeWidth="0.7" fill="none"/>
    {AREA_DOTS.map(({ x, y, opacity }, i) => (
      <circle key={i} cx={x} cy={y} r={1.8} fill={`rgba(197,5,12,${opacity})`}/>
    ))}
  </svg>
);

// Isometric cube: (x,y) = center of top diamond, s = size
const IsoCube = ({ x, y, s = 20, color = 'white' }) => {
  const w = Math.round(s * 0.866);
  const h = Math.round(s * 0.5);
  const p = {
    white: ['#FFFFFF','#F0F0F0','#E4E4E4'],
    gray:  ['#F3F3F3','#E7E7E7','#DADADA'],
    red:   ['#E8464E','#C5050C','#9B0409'],
    pink:  ['#FCEAEA','#F3CCCD','#E8B3B5'],
  }[color] || ['#FFF','#F0F0F0','#E4E4E4'];
  const top   = `${x},${y-h} ${x+w},${y} ${x},${y+h} ${x-w},${y}`;
  const right = `${x+w},${y} ${x},${y+h} ${x},${y+h+s} ${x+w},${y+s}`;
  const left  = `${x-w},${y} ${x},${y+h} ${x},${y+h+s} ${x-w},${y+s}`;
  return (
    <>
      <polygon points={left} fill={p[2]}/>
      <polygon points={right} fill={p[1]}/>
      <polygon points={top} fill={p[0]}/>
    </>
  );
};

// Positions cubes on an isometric grid; (di,dj,dk) = grid offset
const G = (di, dj, dk, ox, oy, s = 20) => ({
  x: ox + di * Math.round(s * 0.866) - dj * Math.round(s * 0.866),
  y: oy + (di + dj) * Math.round(s * 0.5) - dk * s,
  s,
});

const ResearchIllus = () => {
  const O = [100, 108];
  return (
    <svg viewBox="0 0 200 160" fill="none" style={{width:'100%',height:'100%'}}>
      <IsoCube {...G(-1,0,0,...O)} color="white"/>
      <IsoCube {...G(-1,1,0,...O)} color="gray"/>
      <IsoCube {...G(0,1,0,...O)} color="white"/>
      <IsoCube {...G(0,0,0,...O)} color="white"/>
      <IsoCube {...G(1,1,0,...O)} color="gray"/>
      <IsoCube {...G(1,0,0,...O)} color="white"/>
      <IsoCube {...G(2,0,0,...O)} color="white"/>
      <IsoCube {...G(-1,0,1,...O)} color="pink"/>
      <IsoCube {...G(0,0,1,...O)} color="red"/>
      <IsoCube {...G(1,0,1,...O)} color="pink"/>
      <IsoCube {...G(2,0,1,...O)} color="white"/>
    </svg>
  );
};

const ProjectsIllus = () => (
  <svg viewBox="0 0 200 160" fill="none" style={{width:'100%',height:'100%'}}>
    {/* Back card */}
    <g transform="translate(110,55) rotate(-10)">
      <rect x="-55" y="0" width="110" height="72" rx="4" fill="#F5F5F5" stroke="#E8E8E8" strokeWidth="1"/>
      <line x1="-38" y1="22" x2="30" y2="22" stroke="#E0E0E0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="-38" y1="34" x2="16" y2="34" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="-38" y1="46" x2="24" y2="46" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* Mid card */}
    <g transform="translate(103,68) rotate(-5)">
      <rect x="-55" y="0" width="110" height="72" rx="4" fill="#F8F8F8" stroke="#E5E5E5" strokeWidth="1"/>
      <line x1="-38" y1="22" x2="30" y2="22" stroke="#E0E0E0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="-38" y1="34" x2="20" y2="34" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* Front card with red stripe */}
    <g transform="translate(96,80)">
      <rect x="-55" y="0" width="110" height="72" rx="4" fill="white" stroke="#EBEBEB" strokeWidth="1"/>
      <rect x="-55" y="0" width="10" height="72" rx="3" fill="#C5050C"/>
      <line x1="-30" y1="20" x2="35" y2="20" stroke="#EBEBEB" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="-30" y1="32" x2="20" y2="32" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
      <line x1="-30" y1="44" x2="28" y2="44" stroke="#F0F0F0" strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>
);

const WorkshopsIllus = () => {
  const O = [100, 115]; const s = 14;
  return (
    <svg viewBox="0 0 200 160" fill="none" style={{width:'100%',height:'100%'}}>
      {/* 4×3 base grid */}
      {[[-1,1,0,'white'],[-1,0,0,'white'],[-1,-1,0,'white'],
        [0,1,0,'white'],[0,0,0,'white'],[0,-1,0,'pink'],
        [1,1,0,'white'],[1,0,0,'pink'],[1,-1,0,'white'],
        [2,1,0,'white'],[2,0,0,'white'],[2,-1,0,'white'],
        [-1,0,1,'gray'],[0,0,1,'red'],[1,0,1,'white'],
        [0,-1,1,'red'],[2,0,1,'pink'],
      ].map(([di,dj,dk,c],i) => (
        <IsoCube key={i} {...G(di,dj,dk,...O,s)} color={c}/>
      ))}
    </svg>
  );
};

const CommunityIllus = () => {
  const nodes = [
    { x: 55,  y: 50,  r: 11, c: '#FFFFFF', s: '#E4E4E4' },
    { x: 100, y: 35,  r: 13, c: '#FCEAEA', s: '#F0CCCC' },
    { x: 145, y: 55,  r: 11, c: '#FFFFFF', s: '#E4E4E4' },
    { x: 50,  y: 110, r: 12, c: '#FCEAEA', s: '#F0CCCC' },
    { x: 100, y: 95,  r: 15, c: '#C5050C', s: '#9B0409' },
    { x: 150, y: 115, r: 11, c: '#FFFFFF', s: '#E4E4E4' },
  ];
  const edges = [[0,1],[1,2],[0,4],[2,4],[1,4],[0,3],[3,4],[4,5],[2,5]];
  return (
    <svg viewBox="0 0 200 155" fill="none" style={{width:'100%',height:'100%'}}>
      <g stroke="#DADADA" strokeWidth="1.2">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}/>
        ))}
      </g>
      {nodes.map(({ x, y, r, c, s }, i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c} stroke={s} strokeWidth="1.2"/>
      ))}
    </svg>
  );
};

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    document.title = 'About Us | AI@UW';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let rot = 0;

    let canvasW = 0;
    let canvasH = 0;

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvasW = rect.width;
      canvasH = rect.height;
    }

    function draw() {
      const w = canvasW, h = canvasH;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5, cy = h * 0.5;
      const maxR = Math.min(w, h) * 0.48;
      const coreR = maxR * 0.31;

      const goldenAngle = 2.39996323;
      const N = 750;
      const isDark = document.documentElement.dataset.theme === 'dark';

      for (let i = 1; i <= N; i++) {
        const norm = i / N;
        const r    = coreR + Math.sqrt(norm) * (maxR - coreR);
        const theta = i * goldenAngle + rot;

        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        const dotR = Math.max(0.4, 5.6 * Math.pow(1 - norm, 1.25));

        let rc, gc, bc, alpha;
        if (norm < 0.05) {
          if (isDark) { rc=245; gc=245; bc=245; alpha=0.96; }
          else        { rc=8;   gc=0;   bc=2;   alpha=0.96; }
        } else if (norm < 0.18) {
          const p=(norm-0.05)/0.13;
          if (isDark) {
            rc = Math.round(245 - p * (245 - 197));
            gc = Math.round(245 - p * (245 - 5));
            bc = Math.round(245 - p * (245 - 12));
            alpha = 0.93;
          } else {
            rc=Math.round(8+p*189); gc=0; bc=2+Math.round(p*10); alpha=0.93;
          }
        } else if (norm < 0.55) {
          rc=197; gc=5;  bc=12; alpha=0.88*(1-norm*0.35);
        } else {
          rc=230; gc=75; bc=75; alpha=0.65*(1-norm);
        }

        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rc},${gc},${bc},${alpha})`;
        ctx.fill();
      }

      rot += 0.0014;
      animId = requestAnimationFrame(draw);
    }

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setup); };
  }, []);

  return (
    <div className="atmos-root atmos-about">

      {/* ── HERO (unchanged) ─────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-left">
          <p className="about-hero-eyebrow">AI @ UW–Madison</p>
          <h1 className="about-hero-title">
            A community for{' '}
            <em>everyone</em>
            <br />
            curious about AI.
          </h1>
          <p className="about-hero-lede">
            Built by students, open to every discipline —{' '}
            from CS to the humanities.
          </p>
          <div className="about-hero-ctas">
            <Link className="about-btn-primary" to="/contact">
              Become a Member <span className="about-btn-arr">→</span>
            </Link>
            <Link className="about-btn-ghost" to="/seminars">
              Explore Events
            </Link>
          </div>
        </div>

        <div className="about-hero-right" aria-hidden="true">
          <canvas ref={canvasRef} className="about-spiral-canvas" />
          <div className="about-spiral-center">
            <img src="/images/logo.png" alt="" className="about-spiral-logo" />
          </div>
          <div className="about-float-card about-fc-tl">
            <svg className="about-fc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.74"/></svg>
            <div><div className="about-fc-title">Learn</div><div className="about-fc-sub">Together</div></div>
          </div>
          <div className="about-float-card about-fc-tr">
            <svg className="about-fc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M16 18l6-6-6-6M8 6L2 12l6 6"/></svg>
            <div><div className="about-fc-title">Build</div><div className="about-fc-sub">Projects</div></div>
          </div>
          <div className="about-float-card about-fc-bl">
            <svg className="about-fc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 18h6M12 2a7 7 0 00-4 12.9V17a1 1 0 001 1h6a1 1 0 001-1v-2.1A7 7 0 0012 2z"/></svg>
            <div><div className="about-fc-title">Explore</div><div className="about-fc-sub">Ideas</div></div>
          </div>
          <div className="about-float-card about-fc-br">
            <svg className="about-fc-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <div><div className="about-fc-title">Create</div><div className="about-fc-sub">Impact</div></div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────── */}
      <section className="about-story">
        <div className="about-shell">
          <div className="about-story-inner">
            <div className="about-story-left">
              <p className="about-eyebrow">Our Story</p>
              <h2 className="about-story-title">
                Started by 7 students.<br />Now 2000+ members.
              </h2>
              <p className="about-story-body">
                AI@UW began in 2017 when seven undergrads came together with a
                shared curiosity about artificial intelligence. Today, we've grown
                into the largest AI club at UW-Madison — a welcoming community
                for students from all backgrounds and academic interests.
              </p>
              <a className="about-story-link" href="#">
                Learn our story <span>→</span>
              </a>
            </div>

            <div className="about-story-stats">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.74"/></svg>, num: '2,000+', label: 'Members', desc: 'Across all years and majors' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>, num: '50+', label: 'Projects', desc: 'Built, shipped, and shared' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, num: '100+', label: 'Events', desc: 'Talks, workshops, and socials' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>, num: '10+', label: 'Domains', desc: 'Exploring the future of AI' },
              ].map((s) => (
                <div className="about-stat" key={s.label}>
                  <div className="about-stat-icon">{s.icon}</div>
                  <div className="about-stat-num">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                  <div className="about-stat-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────── */}
      <section className="about-what">
        <div className="about-shell">
          <p className="about-eyebrow">What We Do</p>
          <h2 className="about-what-title">
            Learn<span className="about-what-dot">.</span>{' '}
            Build<span className="about-what-dot">.</span>{' '}
            Grow<span className="about-what-dot">.</span>{' '}
            Together<span className="about-what-dot">.</span>
          </h2>

          <div className="about-what-cards">
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2a7 7 0 00-4 12.9V17a1 1 0 001 1h6a1 1 0 001-1v-2.1A7 7 0 0012 2z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>,
                title: 'Research',
                desc: 'Dive deep into cutting-edge AI through reading groups, tech talks, and collaborative research.',
                Illus: ResearchIllus,
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M16 18l6-6-6-6M8 6L2 12l6 6"/></svg>,
                title: 'Project Teams',
                desc: 'Join interdisciplinary teams to build real-world AI projects from idea to impact.',
                Illus: ProjectsIllus,
                to: '/leadership',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
                title: 'Workshops',
                desc: 'Hands-on sessions for all levels — learn, practice, and grow your skills.',
                Illus: WorkshopsIllus,
                to: '/seminars',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.74"/></svg>,
                title: 'Community',
                desc: 'A supportive, inclusive space to meet peers, share ideas, and make lasting connections.',
                Illus: CommunityIllus,
              },
            ].map(({ icon, title, desc, Illus, to }) => (
              <div className="about-what-card" key={title}>
                <div className="about-what-card-visual">
                  <div className="about-what-icon">{icon}</div>
                  <div className="about-what-illus-wrap" aria-hidden="true">
                    <Illus />
                  </div>
                </div>
                <div className="about-what-card-body">
                  <h3 className="about-what-card-title">{title}</h3>
                  <p className="about-what-card-desc">{desc}</p>
                  {to
                    ? <Link className="about-what-explore" to={to}>Explore <span>→</span></Link>
                    : <a className="about-what-explore" href="#">Explore <span>→</span></a>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS WE EXPLORE ─────────────────────────────────── */}
      <section className="about-areas">
        <AreasDecoration />
        <div className="about-shell">
          <p className="about-eyebrow">Areas We Explore</p>
          <h2 className="about-areas-title">
            AI is everywhere<span className="about-what-dot">.</span> So are we<span className="about-what-dot">.</span>
          </h2>
          <p className="about-areas-sub">
            From core machine learning to real-world impact, we explore<br />
            the full spectrum of AI and beyond.
          </p>

          <div className="about-areas-tags">
            {[
              { label: 'Machine Learning', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/></svg> },
              { label: 'NLP', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
              { label: 'Computer Vision', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/></svg> },
              { label: 'Robotics', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M9 21v-4h6v4M12 10V5"/><circle cx="12" cy="3" r="2"/></svg> },
              { label: 'Agents', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
              { label: 'Data Science', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
              { label: 'MLOps', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 00-14.14 0M4.93 19.07a10 10 0 0014.14 0"/></svg> },
              { label: 'AI Ethics', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { label: 'AI for Good', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> },
              { label: 'Human-AI Interaction', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.74"/></svg> },
            ].map((t) => (
              <div className="about-area-tag" key={t.label}>
                <span className="about-area-icon">{t.icon}</span>
                <span className="about-area-label">{t.label}</span>
              </div>
            ))}
            <div className="about-area-tag about-area-more">
              <svg className="about-area-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></svg>
              <span className="about-area-label">And more...</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="about-cta-banner">
        <div className="about-shell">
          <div className="about-cta-inner">
            <div className="about-cta-left">
              <div className="about-cta-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h3 className="about-cta-title">Have questions or want to get involved?</h3>
                <p className="about-cta-sub">We'd love to hear from you.</p>
              </div>
            </div>
            <Link className="about-cta-btn" to="/contact">
              Contact Us <span>→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
