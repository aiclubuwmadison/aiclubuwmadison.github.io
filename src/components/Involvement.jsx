import { useState, useEffect, useMemo, useRef } from 'react';
import './Involvement.css';
import { Link } from 'react-router-dom';
import RisingHeading from './RisingHeading';
import { useScrollReveal, usePointerGlow } from '../utils/motion';
import {
  User,
  Calendar,
  Mail,
  GraduationCap,
  Lightbulb,
  Clock,
  Users,
  LogIn,
  UserPlus,
  MessageCircle,
  Search,
  X,
  SearchX,
} from 'lucide-react';

const FAQS = [
  {
    q: 'I am a Freshman in CS. Is this club for me?',
    a: (
      <>
        Absolutely! Our meetings are targeted towards students at all levels in their AI journeys. This school year will be new for all of us, so we encourage freshmen to join our Discord at <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noopener noreferrer">discord.gg/TTSykcZAg4</a> to stay in the loop on upcoming workshops and other virtual events.
      </>
    ),
    tag: 'Beginners',
    topic: 'Getting started',
    keywords: 'freshman beginner new member no experience discord workshops',
    Icon: User,
  },
  {
    q: 'When are the meetings?',
    a: (
      <>
        Our intent is for individual groups (i.e. study groups &amp; project groups) to set up their own regular meeting times. Contact group leaders over <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noopener noreferrer">discord.gg/TTSykcZAg4</a> for their regular meeting schedule.
      </>
    ),
    tag: 'Schedule',
    topic: 'Meetings',
    keywords: 'meeting times schedule when where study group leaders',
    Icon: Calendar,
  },
  {
    q: "How do I join AI@UW's official mailing list?",
    a: (
      <>
        Our email list is moderated through Google Forms — If you'd like to receive emails regarding club events and projects, please join our discord and sign up through the linktr.ee on our instagram page <a href="https://www.instagram.com/aiclubuw/" target="_blank" rel="noopener noreferrer">instagram.com/aiclubuw</a> or the following <a href="https://linktr.ee/aiclubuw" target="_blank" rel="noopener noreferrer">linktr.ee/aiclubuw.</a>
      </>
    ),
    tag: 'Mailing list',
    topic: 'Community',
    keywords: 'mailing list email newsletter signup instagram linktree google form',
    Icon: Mail,
  },
  {
    q: 'I am an AI@UW Alumni. How do I stay in touch?',
    a: (
      <>
        Join our <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noopener noreferrer">Discord</a>, <a href="https://www.instagram.com/aiclubuw/" target="_blank" rel="noopener noreferrer">Instagram</a> or, <a href="https://www.linkedin.com/company/aiclub-uwmadison" target="_blank" rel="noopener noreferrer">LinkedIn</a> network.
      </>
    ),
    tag: 'Alumni',
    topic: 'Community',
    keywords: 'alumni graduate stay in touch discord instagram linkedin network',
    Icon: GraduationCap,
  },
  {
    q: 'If I have a project idea, how can I find people to help me?',
    a: (
      <>
        The best way to get your project off the ground is to email us a week or two before the semester starts. This way, we can help you create a couple of slides to pitch your project at our kickoff meeting. If you want to start a project mid-semester, you can try to find support for your idea via describing it in our discord.
      </>
    ),
    tag: 'Projects',
    topic: 'Projects',
    keywords: 'project idea pitch teammates kickoff email semester start',
    Icon: Lightbulb,
  },
  {
    q: 'How much time per week should I expect to spend on the project or the study groups? (Is every meeting mandatory?)',
    a: (
      <>
        It depends on which groups you are in. Generally speaking, if you are in study groups, the expected time commitment would be 2-3 hours weekly (if there is a programming assignment, you might expect to spend more time working on that). However, project groups might be slightly more time-consuming. We don't recommend getting involved in more than two groups in a given semester.
      </>
    ),
    tag: 'Commitment',
    topic: 'Meetings',
    keywords: 'time commitment hours per week mandatory attendance workload',
    Icon: Clock,
  },
  {
    q: 'How do I know if I am qualified to join in the project groups?',
    a: (
      <>
        Project groups will be advertised in our newsletters at the start of each semester as well as during our kickoff meetings. Prerequisites will be listed next to each project description (on newsletter/kickoff slides).
      </>
    ),
    tag: 'Prerequisites',
    topic: 'Projects',
    keywords: 'qualified prerequisites requirements skills experience project groups',
    Icon: Users,
  },
  {
    q: 'If I missed the first several meetings, can I still join in the groups? (Can I join in the groups halfway through the semester?)',
    a: (
      <>
        You should message the group leader over discord <a href="https://discord.gg/TTSykcZAg4" target="_blank" rel="noopener noreferrer">discord.gg/TTSykcZAg4</a> to find out. Some groups progress in content, while some have meetings which act as standalone events (and don't depend on past meetings).
      </>
    ),
    tag: 'Joining late',
    topic: 'Getting started',
    keywords: 'missed meetings join late midsemester halfway catch up',
    Icon: LogIn,
  },
  {
    q: 'Can I join multiple groups?',
    a: (
      <>
        We strongly recommend students do not attempt to be involved with more than two project groups.
      </>
    ),
    tag: 'Multiple groups',
    topic: 'Getting started',
    keywords: 'multiple groups how many join two limit',
    Icon: UserPlus,
  },
];

const TOPICS = ['All', 'Getting started', 'Meetings', 'Projects', 'Community'];

const HEADING_LINES = ['Ask anything.', "We're here to help"];

const topicCount = (topic) =>
  topic === 'All' ? FAQS.length : FAQS.filter((f) => f.topic === topic).length;

/* Split a question around the search term so matches can be marked. */
const highlight = (text, term) => {
  if (!term) return text;
  const at = text.toLowerCase().indexOf(term);
  if (at === -1) return text;

  return (
    <>
      {text.slice(0, at)}
      <mark className="faq-mark">{text.slice(at, at + term.length)}</mark>
      {text.slice(at + term.length)}
    </>
  );
};

const Involvement = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All');
  const searchRef = useRef(null);

  /* Soft glow that trails the cursor across the question card. */
  const { ref: cardRef, onPointerMove: trackGlow } = usePointerGlow();

  const toggleFaq = (q) => setOpenFaq((prev) => (prev === q ? null : q));

  const term = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      FAQS.filter((f) => {
        if (topic !== 'All' && f.topic !== topic) return false;
        if (!term) return true;
        return `${f.q} ${f.tag} ${f.topic} ${f.keywords}`.toLowerCase().includes(term);
      }),
    [term, topic],
  );

  const isFiltered = term !== '' || topic !== 'All';

  const resetFilters = () => {
    setQuery('');
    setTopic('All');
  };

  useEffect(() => {
    document.title = 'FAQs | AI@UW';
  }, []);

  /* "/" jumps to search from anywhere on the page. */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      e.preventDefault();
      searchRef.current?.focus();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useScrollReveal('.atmos-involvement .atmos-reveal');

  return (
    <div className="atmos-root atmos-involvement">
      <div className="atmos-shell">
        <div className="atmos-faq-layout">

          <div className="atmos-faq-left">
            <span className="faq-label">FAQ</span>
            <RisingHeading
              className="faq-heading"
              lines={HEADING_LINES}
              trailing={<span className="faq-heading-period">.</span>}
            />
            <p className="faq-subtitle">Joining, meetings, projects, and mailing list.</p>

            <div className="faq-contact-card atmos-lift">
              <div className="faq-contact-card-icon">
                <MessageCircle size={20} />
              </div>
              <div className="faq-contact-card-body-wrap">
                <p className="faq-contact-card-title">Still have questions?</p>
                <p className="faq-contact-card-body">Can't find what you're looking for? Reach out to us — we'd love to hear from you.</p>
                <Link to="/contact" className="faq-contact-card-link">
                  Contact Us <span className="atmos-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="atmos-faq-right">
            <div className="faq-toolbar atmos-reveal">
              <div className="faq-search-wrap">
                <Search className="faq-search-icon" size={16} aria-hidden="true" />
                <input
                  ref={searchRef}
                  type="search"
                  className="faq-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
                  placeholder="Search questions…"
                  aria-label="Search questions"
                />
                {query && (
                  <button
                    type="button"
                    className="faq-search-clear"
                    onClick={() => {
                      setQuery('');
                      searchRef.current?.focus();
                    }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
                {!query && <kbd className="faq-search-kbd" aria-hidden="true">/</kbd>}
              </div>

              <div className="faq-chips" role="group" aria-label="Filter questions by topic">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`faq-chip atmos-chip${topic === t ? ' is-active' : ''}`}
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                  >
                    {t}
                    <span className="faq-chip-count">{topicCount(t)}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="faq-result-count" aria-live="polite">
              {isFiltered
                ? `${filtered.length} of ${FAQS.length} questions`
                : `${FAQS.length} questions`}
            </p>

            <div className="faq-right-card atmos-glow" ref={cardRef} onPointerMove={trackGlow}>
              {filtered.length === 0 && (
                <div className="faq-empty">
                  <div className="faq-empty-icon"><SearchX size={22} /></div>
                  <p className="faq-empty-title">No questions match “{query.trim()}”.</p>
                  <p className="faq-empty-body">
                    Try a different word, or ask us directly — we answer fast.
                  </p>
                  <div className="faq-empty-actions">
                    <button type="button" className="faq-empty-reset" onClick={resetFilters}>
                      Clear filters
                    </button>
                    <Link to="/contact" className="faq-empty-link">Contact Us →</Link>
                  </div>
                </div>
              )}

              <ul className="atmos-faq-list" key={`${topic}|${term}`}>
                {filtered.map((item, i) => {
                  const isOpen = openFaq === item.q;
                  const btnId = `faq-btn-${i}`;
                  const panelId = `faq-panel-${i}`;

                  return (
                    <li
                      key={item.q}
                      className={`atmos-faq-row${isOpen ? ' is-open' : ''}`}
                      style={{ '--i': i }}
                    >
                      <div className="atmos-faq-item">
                        <button
                          type="button"
                          id={btnId}
                          className="atmos-faq-toggle-btn"
                          onClick={() => toggleFaq(item.q)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <div className="faq-row-inner">
                            <div className="faq-row-icon atmos-icon-badge"><item.Icon size={17} /></div>
                            <div className="faq-row-text-wrap">
                              <h2 className="atmos-faq-q">{highlight(item.q, term)}</h2>
                            </div>
                          </div>
                          <span className={`atmos-faq-toggle-icon${isOpen ? ' is-open' : ''}`} aria-hidden="true">›</span>
                        </button>
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          className={`atmos-faq-answer-panel atmos-panel${isOpen ? ' is-open' : ''}`}
                        >
                          <div className="atmos-faq-answer-inner">
                            <div className="atmos-faq-a">
                              <span className="faq-row-tag">{item.tag}</span>
                              <p className="atmos-faq-a-body">{item.a}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Involvement;
