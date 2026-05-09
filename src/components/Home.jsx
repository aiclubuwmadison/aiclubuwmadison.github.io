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
          <div className="atmos-hero-meta">
            <span className="atmos-dot" aria-hidden="true" />
            <span>An interdisciplinary collective</span>
            <span className="atmos-hero-meta-index">No. 01 — Volume MMXXVI</span>
          </div>

          <h1
            className="atmos-wordmark"
            data-shadow="AI@UW"
            aria-label="AI@UW"
          >
            <span className="atmos-glyph atmos-g1">A</span>
            <span className="atmos-glyph atmos-g2">I</span>
            <span className="atmos-glyph atmos-g3 atmos-at">@</span>
            <span className="atmos-glyph atmos-g4">U</span>
            <span className="atmos-glyph atmos-g5">W</span>
          </h1>

          <div className="atmos-hero-row">
            <p className="atmos-hero-tagline atmos-reveal atmos-d2">
              A studio for{' '}
              <em>
                machine learning, deep learning, generative&nbsp;AI, NLP,
                computer&nbsp;vision &amp; robotics
              </em>{' '}
              — at UW–Madison.
            </p>
            <div>
              <p className="atmos-hero-statement atmos-reveal atmos-d3">
                <strong>AI@UW</strong> is a student-led collective for serious work
                in applied and theoretical artificial intelligence. We build
                end-to-end systems, run reading groups, and host seminars with
                industry and academic leaders — with the patience of a lab and
                the rigor of a journal.
              </p>
              <div className="atmos-cta-row atmos-reveal atmos-d4">
                <Link className="atmos-btn atmos-btn-primary" to="/involvement">
                  Join the Collective <span className="atmos-arr">→</span>
                </Link>
                <Link className="atmos-btn atmos-btn-ghost" to="/about">
                  Read the Manifesto
                </Link>
              </div>
            </div>
          </div>

          <div className="atmos-hero-notes atmos-reveal atmos-d4">
            <div className="atmos-note-col">
              Members <em>150+ active</em>
            </div>
            <div className="atmos-note-col">
              Projects <em>Five concurrent teams</em>
            </div>
            <div className="atmos-note-col">
              Seminars <em>Ten convened annually</em>
            </div>
            <div className="atmos-note-col">
              Partners <em>Google · Amazon · Meta · ACM · Stanford</em>
            </div>
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

      <footer>
        <div className="atmos-shell atmos-foot">
          <span>© AI@UW · The Artificial Intelligence Collective at UW–Madison</span>
          <span className="atmos-pag">
            Folio <span className="atmos-pag-cur">01</span> / 24
          </span>
          <span>Madison, Wisconsin · 43.0747° N</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
