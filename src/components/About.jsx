import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let rot = 0;

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5, cy = h * 0.5;
      const maxR = Math.min(w, h) * 0.48;
      const coreR = maxR * 0.31;

      const goldenAngle = 2.39996323;
      const N = 750;

      for (let i = 1; i <= N; i++) {
        const norm = i / N;
        const r    = coreR + Math.sqrt(norm) * (maxR - coreR);
        const theta = i * goldenAngle + rot;

        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        const dotR = Math.max(0.4, 5.6 * Math.pow(1 - norm, 1.25));

        let rc, gc, bc, alpha;
        if (norm < 0.05) {
          rc=8;   gc=0;  bc=2;  alpha=0.96;
        } else if (norm < 0.18) {
          const p=(norm-0.05)/0.13;
          rc=Math.round(8+p*189); gc=0; bc=2+Math.round(p*10); alpha=0.93;
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
          <h2 className="about-what-title">Learn. Build. Grow. Together.</h2>

          <div className="about-what-cards">
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2a7 7 0 00-4 12.9V17a1 1 0 001 1h6a1 1 0 001-1v-2.1A7 7 0 0012 2z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>,
                title: 'Research',
                desc: 'Dive deep into cutting-edge AI through reading groups, tech talks, and collaborative research.',
                illus: 'research',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M16 18l6-6-6-6M8 6L2 12l6 6"/></svg>,
                title: 'Project Teams',
                desc: 'Join interdisciplinary teams to build real-world AI projects from idea to impact.',
                illus: 'projects',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
                title: 'Workshops',
                desc: 'Hands-on sessions for all levels — learn, practice, and grow your skills.',
                illus: 'workshops',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.74"/></svg>,
                title: 'Community',
                desc: 'A supportive, inclusive space to meet peers, share ideas, and make lasting connections.',
                illus: 'community',
              },
            ].map((c) => (
              <div className="about-what-card" key={c.title}>
                <div className="about-what-icon">{c.icon}</div>
                <div className={`about-what-illus about-illus-${c.illus}`} aria-hidden="true">
                  <div className="illus-shape illus-s1" />
                  <div className="illus-shape illus-s2" />
                  <div className="illus-shape illus-s3" />
                </div>
                <h3 className="about-what-card-title">{c.title}</h3>
                <p className="about-what-card-desc">{c.desc}</p>
                <a className="about-what-explore" href="#">Explore <span>→</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS WE EXPLORE ─────────────────────────────────── */}
      <section className="about-areas">
        <div className="about-shell">
          <p className="about-eyebrow">Areas We Explore</p>
          <h2 className="about-areas-title">AI is everywhere. So are we.</h2>

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
