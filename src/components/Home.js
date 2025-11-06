import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, Chip, Tabs, Tab, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Interactive particle background
const ParticleField = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef();
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const bounds = () => ({ w: canvas.clientWidth, h: canvas.clientHeight });

    const resize = () => {
      const { w, h } = bounds();
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };

    const initParticles = () => {
      const { w, h } = bounds();
      const count = Math.min(120, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1.2 + Math.random() * 1.6,
      }));
    };

    const draw = () => {
      const { w, h } = bounds();
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        if (mouse.current.x !== null) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist2 = dx * dx + dy * dy;
          const influence = 90;
          if (dist2 < influence * influence) {
            const f = (influence - Math.sqrt(dist2)) / influence * 0.6;
            p.vx += (dx / Math.sqrt(dist2 || 1)) * f * 0.2;
            p.vy += (dy / Math.sqrt(dist2 || 1)) * f * 0.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(60, 72, 107, 0.8)';
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max = 120;
          if (d2 < max * max) {
            const alpha = 0.15 * (1 - Math.sqrt(d2) / max);
            ctx.strokeStyle = `rgba(60, 72, 107, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    const onResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    draw();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="home-hero-canvas" />;
};

// Typewriter subtitle for hero
const Typewriter = ({ items, speed = 120, pause = 1000 }) => {
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = items[idx % items.length];

    if (!deleting && subIdx === phrase.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && subIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % items.length);
      return;
    }

    const t = setTimeout(() => setSubIdx((v) => v + (deleting ? -1 : 1)), deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [idx, subIdx, deleting, items, speed, pause]);

  return (
    <span className="typewriter">
      {items[idx % items.length].substring(0, subIdx)}
      <span className="cursor">|</span>
    </span>
  );
};

// Animated stat counter
const Stat = ({ label, target, duration = 1200 }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return (
    <div className="stat">
      <div className="stat-value">{value}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const features = [
  { title: 'Projects', desc: 'Hands-on teams building end-to-end ML systems, from data to deployment.', to: '/involvement' },
  { title: 'Research', desc: 'Reading groups, replication studies, and original investigations with mentors.', to: '/about' },
  { title: 'Study Groups', desc: 'Peer-led tracks for ML, DL, NLP, CV, RL, and MLOps fundamentals.', to: '/study' },
  { title: 'Seminars', desc: 'Talks, panels, and workshops with industry and academic leaders.', to: '/seminars' },
  { title: 'Mentorship', desc: 'Peer and alumni mentors to accelerate your AI journey.', to: '/mentorship' },
  { title: 'Community', desc: 'Hack nights, socials, and collaborations across disciplines.', to: '/about' },
];

const domainData = [
  { label: 'Machine Learning', chips: ['Supervised', 'Unsupervised', 'Evaluation'], text: 'From regression and classification to clustering and model selection, build strong ML foundations.', to: '/study' },
  { label: 'Deep Learning', chips: ['CNNs', 'Transformers', 'Multimodal'], text: 'Neural architectures for images, text, audio, and multi-sensor learning with state-of-the-art techniques.', to: '/involvement' },
  { label: 'NLP', chips: ['LLMs', 'Prompting', 'RAG'], text: 'Language models, retrieval, and responsible deployment for real applications.', to: '/involvement' },
  { label: 'Computer Vision', chips: ['Detection', 'Segmentation', '3D'], text: 'Perception systems powering robotics, assistive tech, and scientific discovery.', to: '/involvement' },
  { label: 'Reinforcement Learning', chips: ['Policy Gradients', 'Model-based', 'Bandits'], text: 'Decision-making under uncertainty, from simulation to the real world.', to: '/study' },
  { label: 'Robotics', chips: ['Control', 'SLAM', 'Embodied AI'], text: 'Integrating perception, control, and planning for autonomous systems.', to: '/involvement' },
  { label: 'AI Ethics', chips: ['Fairness', 'Privacy', 'Safety'], text: 'Critical perspectives on impact, bias, and governance of AI systems.', to: '/seminars' },
  { label: 'AI + Health', chips: ['Medical Imaging', 'Clinical NLP', 'Wearables'], text: 'Collaborations on diagnostics, outcomes modeling, and equitable health insights.', to: '/involvement' },
  { label: 'AI + Finance', chips: ['Forecasting', 'Risk', 'Fraud'], text: 'Time series, anomaly detection, and decision support for markets and fintech.', to: '/involvement' },
  { label: 'AI + Climate', chips: ['Remote Sensing', 'Forecasting', 'Optimization'], text: 'Models for climate resilience, energy efficiency, and sustainability.', to: '/involvement' },
  { label: 'AI + Social Good', chips: ['Civic Tech', 'Accessibility', 'Education'], text: 'Human-centered AI projects that positively impact communities.', to: '/involvement' },
  { label: 'MLOps', chips: ['Data', 'Deployment', 'Monitoring'], text: 'From notebooks to production: versioning, serving, and continuous evaluation.', to: '/involvement' },
];

const partners = [
  { src: 'images/logos/google.png', alt: 'Google' },
  { src: 'images/logos/amazon.png', alt: 'Amazon' },
  { src: 'images/logos/facebook.png', alt: 'Facebook' },
  { src: 'images/logos/stanford.png', alt: 'Stanford' },
  { src: 'images/logos/acm.png', alt: 'ACM' },
];

const Home = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="home-root">
      {/* HERO */}
      <section className="home-hero gradient-bg">
        <ParticleField />
        <div className="home-hero-overlay" />
        <Container className="home-hero-content">
          <Typography variant="h2" className="home-hero-title">AI@UW</Typography>
          <Typography variant="h6" className="home-hero-subtitle">
            Interdisciplinary{' '}
            <Typewriter items={[
              'Machine Learning',
              'Deep Learning',
              'Generative AI',
              'NLP',
              'Computer Vision',
              'Robotics',
              'Reinforcement Learning',
            ]} />
            {' '}at UW–Madison
          </Typography>
          <div className="home-hero-ctas">
            <Button size="large" color="primary" variant="contained" component={Link} to="/involvement">Join a Project</Button>
            <Button size="large" color="secondary" variant="outlined" component={Link} to="/study">Learn & Study</Button>
            <Button size="large" variant="outlined" component={Link} to="/seminars">Attend Events</Button>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="home-section">
        <Container>
          <div className="stats-grid">
            <Stat label="Members" target={2000} />
            <Stat label="Projects" target={100} />
            <Stat label="Events / yr" target={40} />
            <Stat label="Partners" target={10} />
          </div>
        </Container>
      </section>

      {/* DOMAIN EXPLORER */}
      <section className="home-section glass" id="domains">
        <Container>
          <Typography variant="h4" className="home-section-title">Explore AI Domains</Typography>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="on"
            className="home-tabs"
          >
            {domainData.map((d, i) => (
              <Tab label={d.label} key={d.label} />
            ))}
          </Tabs>
          <Box className="domain-panel">
            <Typography variant="subtitle1" className="domain-text">{domainData[tab].text}</Typography>
            <div className="home-chips">
              {domainData[tab].chips.map((c) => (
                <Chip key={c} label={c} className="home-chip" />
              ))}
            </div>
            <div className="domain-cta">
              <Button size="small" color="primary" variant="contained" component={Link} to={domainData[tab].to}>
                Explore {domainData[tab].label}
              </Button>
            </div>
          </Box>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="home-section">
        <Container>
          <Typography variant="h4" className="home-section-title">What We Offer</Typography>
          <Grid container spacing={3}>
            {features.map((f) => (
              <Grid item xs={12} sm={6} md={4} key={f.title}>
                <Card className="home-card tilt">
                  <CardContent>
                    <Typography variant="h6" className="home-card-title">{f.title}</Typography>
                    <Typography variant="body2" className="home-card-desc">{f.desc}</Typography>
                    <Button size="small" color="primary" component={Link} to={f.to} className="home-card-cta">
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* HIGHLIGHTS */}
      <section className="home-section" id="highlights">
        <Container>
          <Typography variant="h4" className="home-section-title">Recent Highlights</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card className="home-card">
                <CardContent>
                  <Typography variant="subtitle1" className="home-card-title">Fireside Chat w/ AmFam</Typography>
                  <Typography variant="body2" className="home-card-desc">Industry perspectives on GenAI, ethics, and real-world deployment.</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="home-card">
                <CardContent>
                  <Typography variant="subtitle1" className="home-card-title">Research Reading Group</Typography>
                  <Typography variant="body2" className="home-card-desc">Weekly papers across LLMs, RL, multimodal models, and interpretability.</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="home-card">
                <CardContent>
                  <Typography variant="subtitle1" className="home-card-title">Project Showcases</Typography>
                  <Typography variant="body2" className="home-card-desc">Student demos spanning healthcare, finance, climate, and the arts.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* PARTNERS */}
      <section className="home-section glass">
        <Container>
          <Typography variant="h5" className="home-section-title">Partners & Friends</Typography>
          <div className="partners-marquee">
            <div className="partners-track">
              {partners.concat(partners).map((p, i) => (
                <div className="partner-item" key={`${p.alt}-${i}`}>
                  <img src={p.src} alt={p.alt} height="40" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="home-section home-cta">
        <Container>
          <Typography variant="h4" className="home-section-title">Ready to build the future of AI?</Typography>
          <div className="home-hero-ctas">
            <Button size="large" color="primary" variant="contained" component={Link} to="/involvement">Get Involved</Button>
            <Button size="large" color="secondary" variant="outlined" component={Link} to="/contact">Contact Us</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;