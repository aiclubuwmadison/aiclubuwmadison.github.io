import { Link } from 'react-router-dom';

const offerings = [
  {
    num: '01',
    title: 'Projects',
    desc: 'Hands-on teams building end-to-end ML systems, from data to deployment — with code review, weekly demos, and shipped artefacts.',
    meta: 'Applied',
    to: '/involvement',
  },
  {
    num: '02',
    title: 'Research',
    desc: 'Reading groups, replication studies, and original investigations conducted under faculty and industry mentors.',
    meta: 'Theoretical',
    to: '/about',
  },
  {
    num: '03',
    title: 'Study Groups',
    desc: 'Peer-led tracks for ML, DL, NLP, CV, RL, and MLOps — taught from first principles, paced for depth, not coverage.',
    meta: 'Curriculum',
    to: '/involvement',
  },
  {
    num: '04',
    title: 'Seminars',
    desc: 'Talks, panels, and workshops convened with leaders from the academy and the field. Hosted on campus, recorded for the archive.',
    meta: 'Public',
    to: '/seminars',
  },
  {
    num: '05',
    title: 'Mentorship',
    desc: 'A two-tier programme: peer mentors for first-years, and alumni mentors now at the labs and companies you would like to be at.',
    meta: 'One-to-one',
    to: '/involvement',
  },
  {
    num: '06',
    title: 'Community',
    desc: 'Hack nights, socials, and cross-disciplinary collaborations — because the most interesting work happens in the margins.',
    meta: 'Informal',
    to: '/about',
  },
];

const Home = () => {
  return (
    <div className="atmos-root">
      <section className="atmos-hero">
        <div className="atmos-shell">
          <div className="atmos-hero-grid">
            {/* LEFT */}
            <div className="atmos-hero-left">
              <div className="atmos-hero-meta">
                <span className="atmos-dot" aria-hidden="true" />
                <span>AI@UW &middot; Madison, WI &middot; Est. 2017</span>
              </div>
              <h1 className="atmos-wordmark-new" aria-label="AI@UW — The AI Club at UW-Madison">
                The AI club<br />at UW&ndash;Madison.
              </h1>
              <p className="atmos-hero-tagline">
                A studio for <em>machine learning, deep learning, generative AI, NLP, computer vision &amp; robotics</em> — built by students.
              </p>
              <div className="atmos-cta-row">
                <Link className="atmos-btn atmos-btn-primary" to="/contact">
                  Become a Member <span className="atmos-arr">→</span>
                </Link>
                <Link className="atmos-btn atmos-btn-ghost" to="/seminars">
                  Explore Events
                </Link>
              </div>
            </div>
            {/* RIGHT — visual */}
            <div className="atmos-hero-right">
              <div className="atmos-hero-visual">
                <div className="atmos-spiral-ring atmos-sr-1" />
                <div className="atmos-spiral-ring atmos-sr-2" />
                <div className="atmos-spiral-ring atmos-sr-3" />
                <img src="/images/logo.png" alt="" className="atmos-spiral-logo" aria-hidden="true" />
              </div>
              <div className="atmos-hero-float-cards">
                <div className="atmos-float-card atmos-fc-tl">
                  <span className="atmos-fc-icon">📖</span>
                  <div><div className="atmos-fc-title">Learn</div><div className="atmos-fc-sub">Together</div></div>
                </div>
                <div className="atmos-float-card atmos-fc-tr">
                  <span className="atmos-fc-icon">⚙️</span>
                  <div><div className="atmos-fc-title">Build</div><div className="atmos-fc-sub">Projects</div></div>
                </div>
                <div className="atmos-float-card atmos-fc-bl">
                  <span className="atmos-fc-icon">💡</span>
                  <div><div className="atmos-fc-title">Explore</div><div className="atmos-fc-sub">Ideas</div></div>
                </div>
                <div className="atmos-float-card atmos-fc-br">
                  <span className="atmos-fc-icon">🌟</span>
                  <div><div className="atmos-fc-title">Create</div><div className="atmos-fc-sub">Impact</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="atmos-hero-notes atmos-reveal atmos-d4">
            <div className="atmos-note-col">Members <em>150+ active</em></div>
            <div className="atmos-note-col">Projects <em>Five concurrent teams</em></div>
            <div className="atmos-note-col">Seminars <em>Ten convened annually</em></div>
            <div className="atmos-note-col">Partners <em>Google · Amazon · Meta · ACM · Stanford</em></div>
          </div>
        </div>
      </section>

      <section>
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <div className="atmos-section-eyebrow">
                <span className="atmos-section-num">II</span>What we offer
              </div>
              <h2 className="atmos-section-title">
                A handful of careful programmes, not a catalogue.
              </h2>
            </div>
            <div className="atmos-section-aside">Index 01 — 06 / 06</div>
          </div>

          <ol className="atmos-index-list">
            {offerings.map((o) => (
              <li key={o.num} className="atmos-index-row">
                <Link to={o.to} className="atmos-index-link">
                  <span className="atmos-index-num">{o.num}</span>
                  <span className="atmos-index-title">{o.title}</span>
                  <span className="atmos-index-desc">{o.desc}</span>
                  <span className="atmos-index-meta">
                    {o.meta} <span className="atmos-arr">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
};

export default Home;
