import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BodyText from './typographic/BodyText';
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

      // Golden-angle (Fibonacci) spiral — creates the galaxy vortex look.
      // sqrt(i/N) distributes dots evenly by area; golden angle avoids alignment.
      const goldenAngle = 2.39996323; // radians ≈ 137.508°
      const N = 750;

      for (let i = 1; i <= N; i++) {
        const norm = i / N;                              // 0→1 inner to outer
        const r    = coreR + Math.sqrt(norm) * (maxR - coreR);
        const theta = i * goldenAngle + rot;

        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        // Dot radius: large near core, tiny at edges
        const dotR = Math.max(0.4, 5.6 * Math.pow(1 - norm, 1.25));

        // Colour gradient: near-black → dark-red → bright-red → faint-pink
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

      {/* ── HERO ─────────────────────────────────────────────── */}
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

          {/* White center circle with logo */}
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

      {/* ── ORIGIN ───────────────────────────────────────────── */}
      <section className="about-section-row">
        <div className="about-section-meta">
          <div className="about-section-index">
            <span className="about-section-num">01</span>
            <span className="about-section-tag">Origin</span>
          </div>
          <div className="about-section-aside">
            <span className="about-aside-label">Est. 2017</span>
            <em>Seven undergrads. Now over two thousand.</em>
          </div>
        </div>

        <div className="about-section-body">
          <BodyText>
            AI@UW is the largest Artificial Intelligence club at UW-Madison. We
            aim to build a community of students from all backgrounds united by
            a shared interest in AI. Starting as just 7 undergrads in 2017 by
            Chris Endermann, we have since expanded our reach to over 2000
            undergrads, graduate students, and faculty. We pride ourselves on
            our interdisciplinary approach to learning and building — people of
            all backgrounds and academic interests have a place in our
            organization.
          </BodyText>
        </div>

        <div className="about-section-visual about-orbital" aria-hidden="true">
          <div className="orbit-squash">
            <div className="orbit-path" />
            <div className="orbit-spin">
              <div className="orbit-dot" />
            </div>
          </div>
          <div className="orbit-particle op1" />
          <div className="orbit-particle op2" />
          <div className="orbit-particle op3" />
        </div>
      </section>

      {/* ── PRACTICE ─────────────────────────────────────────── */}
      <section className="about-section-row">
        <div className="about-section-meta">
          <div className="about-section-index">
            <span className="about-section-num">02</span>
            <span className="about-section-tag">Practice</span>
          </div>
          <div className="about-section-aside">
            <span className="about-aside-label">
              Project Teams · Research · Workshops
            </span>
            <em>Theory and application, side by side.</em>
          </div>
        </div>

        <div className="about-section-body">
          <BodyText>
            AI@UW is a vibrant, interdisciplinary community where students from
            all fields — computer science, engineering, life sciences, business,
            humanities, and more — collaborate to explore, innovate, and apply
            artificial intelligence. We organize hands-on project teams,
            research groups, and workshops covering the full spectrum of AI.
          </BodyText>
          <BodyText>
            Whether you&apos;re a beginner or an expert, AI@UW welcomes you to
            learn, create, and lead. Please{' '}
            <a className="link-text" href="mailto:aiclubuwmadison@gmail.com">
              contact us
            </a>{' '}
            if you have any questions.
          </BodyText>
        </div>

        <div className="about-section-visual about-tracks">
          {[
            { label: 'ML & DL',          svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M16 18l6-6-6-6M8 6L2 12l6 6"/></svg> },
            { label: 'NLP',              svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
            { label: 'Computer Vision',  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/></svg> },
            { label: 'Robotics',         svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M9 21v-4h6v4M12 10V5"/><circle cx="12" cy="3" r="2"/><circle cx="8" cy="15" r="1" fill="currentColor"/><circle cx="16" cy="15" r="1" fill="currentColor"/></svg> },
            { label: 'Ethics',           svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
            { label: 'Impact',           svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.74"/></svg> },
          ].map((t) => (
            <div key={t.label} className="track-chip">
              <span className="track-chip-icon">{t.svg}</span>
              <span className="track-chip-label">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
