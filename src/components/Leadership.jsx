import { useState } from 'react';
import Portrait from './display/Portrait';
import './Leadership.css';

const Leadership = () => {
  const [expandedSections, setExpandedSections] = useState({
    dec24Dec25Leaders: false,
    currentLeaders: false,
    pastLeaders: false,
  });

  const handleToggle = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const PastLeadershipData = [
    [
      { file: 'anniruddh.jpg', title: 'President', name: 'Anniruddh Kumar' },
      { file: 'tanish.jpg', title: 'Vice President', name: 'Tanish Nahata', link: 'https://www.linkedin.com/in/tanish-nahata' },
      { file: 'taha.jpg', title: 'Head of PR', name: 'Taha Sawar', link: 'https://www.linkedin.com/in/sawar/' },
    ],
    [
      { file: 'arun.jpg', title: 'Event Head', name: 'Arun Sivarajah' },
      { file: 'alexey.jpg', title: 'Head of Project and Study Groups', name: 'Alexey Gorbunov', link: 'https://www.linkedin.com/in/alexey-gorbunov-b2153a19a/' },
      { file: 'ethan.jpg', title: 'Webmaster', name: 'Ethan Wheeler', link: 'https://www.linkedin.com/in/ethan-wheeler-abcdef/' },
    ],
    [
      { file: 'dane.jpg', title: 'Advisor, Harvey D. Spangler Professor of Engineering', name: 'Dane Morgan', link: 'https://directory.engr.wisc.edu/mse/faculty/morgan_dane' },
    ],
  ];

  const SeptDec24LeadershipData = [
    [
      { file: 'Monish.jpg', title: 'President', name: 'Monish Vijay Kumar', link: 'https://www.linkedin.com/in/monish-bangalore-vijay-kumar-a0411720a/' },
      { file: 'Monyka.jpeg', title: 'Director of Marketing', name: 'Ratcheny (Monyka) Lee', link: 'https://www.linkedin.com/in/ratchenymonycalee/' },
      { file: 'vardaan.jpg', title: 'Secretary', name: 'Vardaan Kapoor', link: 'https://www.linkedin.com/in/vardaankapoor/' },
    ],
    [
      { file: 'debo.jpg', title: 'Events Manager', name: 'Debo Jyoti Paul', link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.png', title: 'Club Meetings Manager', name: 'Ira Hande', link: 'https://www.linkedin.com/in/ira-hande/' },
      { file: 'akash.jpeg', title: 'Treasurer', name: 'Akash Goda', link: 'https://www.linkedin.com/in/akashgoda/' },
    ],
    [
      { file: 'rohun.jpeg', title: 'Editorial Assistant', name: 'Rohun Bakshi', link: 'https://www.linkedin.com/in/rohun-bakshi/' },
    ],
  ];

  const CurrentLeadershipData = [
    [
      { file: 'hriday.png', title: 'President', name: 'Hriday Sethi', link: 'https://www.linkedin.com/in/hridyanshsethi/' },
      { file: 'rishabh.jpeg', title: 'Vice President', name: 'Rishabh Aggarwal', link: 'https://www.linkedin.com/in/rishabh-aggarwal-b03ab8211' },
      { file: 'samarth.png', title: 'Secretary', name: 'Samarth Bhargava', link: 'https://www.linkedin.com/in/samarth010/' },
    ],
    [
      { file: 'shikha.jpeg', title: 'Marketing Head', name: 'Shikha Ashara', link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'arnav.jpg', title: 'Communications Manager', name: 'Arnav Batra', link: 'https://www.linkedin.com/in/batraarnav/' },
      { file: 'swati.jpg', title: 'Event Organizer', name: 'Swati Banwani', link: 'https://matias.ma/nsfw/' },
    ],
    [
      { file: 'sam.jpg', title: 'Project Manager', name: 'Sam Avramov', link: 'https://www.linkedin.com/in/samavramov/' },
      { file: 'yug.jpg', title: 'Project Manager', name: 'Yug Marwaha', link: 'https://www.linkedin.com/in/yug-marwaha-881b53321' },
      { file: 'kartik.jpg', title: 'Project Manager', name: 'Kartik Gangwar', link: 'https://www.linkedin.com/in/kartik-gangwar' },
    ],
    [
      { file: 'jack.png', title: 'Project Manager', name: 'Jack Koteles', link: 'https://www.linkedin.com/in/jackkoteles/' },
      { file: 'sukrut.jpeg', title: 'Project Manager', name: 'Adhyot Singh', link: 'https://www.linkedin.com/in/adhyotsingh/' },
    ],
  ];

  const Dec24Dec25LeadershipData = [
    [
      { file: 'vardaan.jpg', title: 'President', name: 'Vardaan Kapoor', link: 'https://www.linkedin.com/in/vardaankapoor/' },
      { file: 'debo.jpg', title: 'Vice President', name: 'Debo Jyoti Paul', link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.png', title: 'Club Meetings Manager', name: 'Ira Hande', link: 'https://www.linkedin.com/in/ira-hande/' },
    ],
    [
      { file: 'kashish.jpeg', title: 'Communications Manager', name: 'Kashish Agarwal', link: 'https://www.linkedin.com/in/kashishuw/' },
      { file: 'akash.jpeg', title: 'Treasurer', name: 'Akash Goda', link: 'https://www.linkedin.com/in/akashgoda/' },
      { file: 'charith.png', title: 'Secretary', name: 'Charith Reddy Pareddy', link: 'https://www.linkedin.com/in/charith-reddy-pareddy-61252b329/' },
    ],
    [
      { file: 'rohun.jpeg', title: 'Editorial Assistant', name: 'Rohun Bakshi', link: 'https://www.linkedin.com/in/rohun-bakshi/' },
      { file: 'shikha.jpeg', title: 'Social Media Manager', name: 'Shikha Ashara', link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'sukrut.jpeg', title: 'Student Tech Advisor', name: 'Sukrut Chikodikar', link: 'https://www.linkedin.com/in/schikodikar/' },
    ],
  ];

  // Flatten the row-of-rows structure into a single roster.
  const flatten = (rows) => rows.flat();

  const Roster = ({ data, keyPrefix }) => (
    <div className="atmos-roster">
      {flatten(data).map((member, i) => (
        <div className="atmos-roster-tile" key={`${keyPrefix}-${i}`}>
          <Portrait
            file={member.file}
            title={member.title}
            name={member.name}
            link={member.link}
          />
        </div>
      ))}
    </div>
  );

  const ArchiveSection = ({ id, num, title, meta, data }) => {
    const isOpen = expandedSections[id];
    return (
      <div className="atmos-archive">
        <button
          type="button"
          className="atmos-archive-toggle"
          onClick={() => handleToggle(id)}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
        >
          <span className="atmos-archive-label">
            <span className="atmos-archive-num">{num}</span>
            <span className="atmos-archive-title">{title}</span>
          </span>
          <span className="atmos-archive-meta">
            <span>{meta}</span>
            <span className={`atmos-archive-glyph${isOpen ? ' is-open' : ''}`}>›</span>
          </span>
        </button>
        <div
          id={`${id}-panel`}
          className={`atmos-archive-panel${isOpen ? ' is-open' : ''}`}
          role="region"
        >
          {isOpen && <Roster data={data} keyPrefix={id} />}
        </div>
      </div>
    );
  };

  return (
    <div className="atmos-root atmos-leadership">
      <section className="atmos-leadership-hero">
        <div className="atmos-shell">
          <div className="atmos-hero-meta atmos-reveal">
            <span className="atmos-dot" />
            <span>Leadership</span>
            <span className="atmos-hero-meta-index">— Vol. I</span>
          </div>
          <h1 className="atmos-leadership-title atmos-reveal atmos-d2">
            The people <em className="atmos-leadership-amp">behind</em> AI@UW.
          </h1>
          <p className="atmos-leadership-lede atmos-reveal atmos-d3">
            Students and mentors guiding AI@UW across projects, research, and community.
          </p>
        </div>
      </section>

      <section className="atmos-leadership-section">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-num">I</span>
              <span className="atmos-section-eyebrow">Currently serving</span>
            </div>
            <h2 className="atmos-section-title">Officers &amp; Project Leads</h2>
            <div className="atmos-section-aside">2025 — 2026</div>
          </div>
          <Roster data={CurrentLeadershipData} keyPrefix="current" />
        </div>
      </section>

      <section className="atmos-leadership-section">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-num">II</span>
              <span className="atmos-section-eyebrow">Archive</span>
            </div>
            <h2 className="atmos-section-title">Past terms</h2>
            <div className="atmos-section-aside">Select a term</div>
          </div>

          <ArchiveSection
            id="dec24Dec25Leaders"
            num="II.i"
            title="December 2024 — December 2025"
            meta="View term"
            data={Dec24Dec25LeadershipData}
          />
          <ArchiveSection
            id="currentLeaders"
            num="II.ii"
            title="September 2024 — December 2024"
            meta="View term"
            data={SeptDec24LeadershipData}
          />
          <ArchiveSection
            id="pastLeaders"
            num="II.iii"
            title="Past Leadership"
            meta="View term"
            data={PastLeadershipData}
          />

          <div className="atmos-leadership-foot">
            <span>End of directory</span>
            <em>AI@UW — Madison, Wisconsin</em>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
