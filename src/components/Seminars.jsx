import { useState, useEffect, useRef, useMemo } from 'react';
import { Mic, Wrench } from 'lucide-react';
import './Seminars.css';

const seminars = [];
const workshops = [];

const allItems = [...seminars, ...workshops].sort((a, b) => (a.date < b.date ? 1 : -1));

const splitDate = (display) => {
  const parts = display.split(' ');
  if (parts.length === 2) return { month: parts[0].toUpperCase(), year: parts[1] };
  return { month: display.toUpperCase(), year: '' };
};

const getUtcString = (dateStr, timeStr = '18:00', durationMinutes = 60) => {
  const month = parseInt(dateStr.split('-')[1], 10);
  const offset = (month >= 3 && month < 11) ? 5 : 6;
  const start = new Date(Date.UTC(
    parseInt(dateStr.split('-')[0], 10),
    parseInt(dateStr.split('-')[1], 10) - 1,
    parseInt(dateStr.split('-')[2], 10),
    parseInt(timeStr.split(':')[0], 10) + offset,
    parseInt(timeStr.split(':')[1], 10)
  ));
  const end = new Date(start.getTime() + durationMinutes * 60000);
  
  const format = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return { start: format(start), end: format(end) };
};

const makeGoogleCalendarUrl = (item) => {
  const { start, end } = getUtcString(item.date, item.time || '18:00', item.duration || 60);
  const title = encodeURIComponent(item.title);
  const details = encodeURIComponent(`${item.description || ''}\n\nSpeaker: ${item.speaker || ''}`);
  const location = encodeURIComponent(item.location || 'Computer Sciences Building, UW-Madison');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
};

const getIcsString = (item) => {
  const { start, end } = getUtcString(item.date, item.time || '18:00', item.duration || 60);
  const title = item.title.replace(/[,;]/g, '\\$&');
  const details = (item.description || '').replace(/\n/g, '\\n').replace(/[,;]/g, '\\$&');
  const location = (item.location || 'Computer Sciences Building, UW-Madison').replace(/[,;]/g, '\\$&');
  const speaker = (item.speaker || '').replace(/[,;]/g, '\\$&');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI Club UW Madison//Website//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}\\n\\nSpeaker: ${speaker}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
};

const handleIcsDownload = (item) => {
  const icsString = getIcsString(item);
  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconExternalLink = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconDownload = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconGrid = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
  </svg>
);

const IconMic = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const IconWrench = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const getFirstSentence = (text) => {
  const match = text.match(/^(.+?[.!?])(?:\s|$)/s);
  return match ? match[1].trim() : text;
};

const SeminarCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef(null);
  const { month, year } = splitDate(item.displayDate);
  const isWorkshop = item.type === 'workshop';

  useEffect(() => {
    if (!calOpen) return;
    const handler = (e) => {
      if (calRef.current && !calRef.current.contains(e.target)) {
        setCalOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [calOpen]);

  return (
    <div className={`atmos-sem-card${isWorkshop ? ' atmos-sem-card--workshop' : ''}`}>
      <div className="atmos-sem-card-row">
        <div className={`atmos-sem-date-badge${isWorkshop ? ' atmos-sem-date-badge--workshop' : ''}`}>
          <span className="atmos-sem-date-month">{isWorkshop ? 'WS' : month}</span>
          <span className="atmos-sem-date-year">{isWorkshop ? '2024' : year}</span>
        </div>
        <div className="atmos-sem-card-content">
          <h3 className="atmos-sem-talk">{item.title}</h3>
          <p className="atmos-sem-speaker">{item.speaker.toUpperCase()}</p>
          <ul className="atmos-sem-tags">
            {item.tags.map((t) => (
              <li className="atmos-sem-tag" key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className={`atmos-sem-abstract${expanded ? ' atmos-sem-abstract--expanded' : ''}`}>
        {expanded ? item.description : getFirstSentence(item.description)}
      </p>
      <div className="atmos-sem-actions-row">
        <button className="atmos-sem-view-link" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : 'View details'} <IconArrow />
        </button>

        <div className="atmos-sem-cal-wrapper" ref={calRef}>
          <button 
            type="button"
            className="atmos-sem-cal-btn" 
            onClick={() => setCalOpen((v) => !v)}
            aria-expanded={calOpen}
            aria-haspopup="menu"
          >
            <IconCalendar /> Add to Calendar
          </button>
          
          {calOpen && (
            <div className="atmos-sem-cal-dropdown" role="menu">
              <a 
                href={makeGoogleCalendarUrl(item)} 
                target="_blank" 
                rel="noopener noreferrer" 
                role="menuitem"
                onClick={() => setCalOpen(false)}
              >
                <IconExternalLink /> Google Calendar
              </a>
              <button 
                type="button"
                role="menuitem"
                onClick={() => {
                  handleIcsDownload(item);
                  setCalOpen(false);
                }}
              >
                <IconDownload /> Apple / Outlook (.ics)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Seminars = () => {
  useEffect(() => {
    document.title = 'Events | AI@UW';
  }, []);

  const [activeTab, setActiveTab] = useState('all');
  const [topicFilter, setTopicFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const searchWrapRef = useRef(null);

  const allTopics = useMemo(() => {
    const set = new Set();
    allItems.forEach((item) => item.tags.forEach((t) => set.add(t)));
    return [...set].sort();
  }, []);

  const allYears = useMemo(() => {
    const set = new Set();
    allItems.forEach((item) => {
      const match = item.displayDate.match(/\d{4}/);
      if (match) set.add(match[0]);
    });
    return [...set].sort((a, b) => b - a);
  }, []);

  const autocompleteMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setAutocompleteOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      if (activeTab === 'talks' && item.type !== 'talk') return false;
      if (activeTab === 'workshops' && item.type !== 'workshop') return false;
      if (topicFilter && !item.tags.includes(topicFilter)) return false;
      if (yearFilter && !item.displayDate.includes(yearFilter)) return false;
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeTab, topicFilter, yearFilter, searchQuery]);

  const filteredTalks = filtered.filter((i) => i.type === 'talk');
  const filteredWorkshops = filtered.filter((i) => i.type === 'workshop');

  // On the All tab, show only the 3 latest talks as a teaser.
  const displayedTalks = activeTab === 'all' ? filteredTalks.slice(0, 3) : filteredTalks;
  const hasMoreTalks = activeTab === 'all' && filteredTalks.length > 3;

  const showTalks = activeTab === 'all' || activeTab === 'talks';
  const showWorkshops = activeTab === 'all' || activeTab === 'workshops';

  // Scroll-reveal for seminar/workshop cards. A fresh observer is created per
  // run and disconnected on cleanup, so React StrictMode's mount → unmount →
  // remount cycle can't leave cards observed by a disconnected observer (which
  // previously stranded every card at opacity:0). Cards already revealed keep
  // `sr-visible`; only not-yet-revealed cards are hidden and (re)observed, so
  // filter changes still animate in newly rendered cards.
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    const cards = document.querySelectorAll('.atmos-sem-card');
    cards.forEach((el, i) => {
      if (el.classList.contains('sr-visible')) return;
      el.classList.add('sr-hidden');
      el.style.transitionDelay = `${Math.min((i % 6) * 70, 280)}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [activeTab, topicFilter, yearFilter, searchQuery]);

  return (
    <div className="atmos-root atmos-seminars">
      <div className="atmos-shell">

        {/* HERO */}
        <header className="atmos-sem-hero atmos-reveal">
          <div className="atmos-sem-hero-text">
            <h1 className="atmos-sem-title">
              Upcoming<br />
              <span style={{color:'var(--atmos-badger)'}}>talks</span> &amp; workshops<span className="atmos-sem-title-dot">.</span>
            </h1>
            <p className="atmos-sem-lede">New AI@UW events are on the way.</p>
            <a
              className="atmos-sem-hero-cta"
              href="https://discord.gg/TTSykcZAg4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord <IconArrow />
            </a>
          </div>
          <div className="atmos-sem-hero-image" aria-hidden="true">
            <img src="/images/seminars/hero.webp" alt="" width="1200" height="800" fetchPriority="high" />
          </div>
        </header>

        {/* FILTER BAR */}
        {allItems.length > 0 && (
          <div className="atmos-sem-filter-stack">
          <div className="atmos-sem-filter-bar">
            <div className="atmos-sem-tabs-pill">
              <button
                className={`atmos-sem-tab${activeTab === 'all' ? ' active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <IconGrid /> All
              </button>
              <button
                className={`atmos-sem-tab${activeTab === 'talks' ? ' active' : ''}`}
                onClick={() => setActiveTab('talks')}
              >
                <IconMic /> Talks
              </button>
              <button
                className={`atmos-sem-tab${activeTab === 'workshops' ? ' active' : ''}`}
                onClick={() => setActiveTab('workshops')}
              >
                <IconWrench /> Workshops
              </button>
            </div>
            <div className="atmos-sem-filters">
              <select
                className="atmos-sem-select"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                aria-label="Filter by year"
              >
                <option value="">All Years</option>
                {allYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <div className="atmos-sem-search-wrap" ref={searchWrapRef}>
                <input
                  className="atmos-sem-search"
                  placeholder="Search talks..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setAutocompleteOpen(true);
                  }}
                  onFocus={() => setAutocompleteOpen(true)}
                />
                <span className="atmos-sem-search-icon"><IconSearch /></span>
                {autocompleteOpen && autocompleteMatches.length > 0 && (
                  <div className="atmos-sem-autocomplete-dropdown" role="listbox">
                    {autocompleteMatches.map((item) => (
                      <button
                        key={`${item.title}-${item.date}`}
                        type="button"
                        className="atmos-sem-autocomplete-item"
                        role="option"
                        onClick={() => {
                          setSearchQuery(item.title);
                          setAutocompleteOpen(false);
                        }}
                      >
                        <span className={`atmos-sem-autocomplete-badge atmos-sem-autocomplete-badge--${item.type}`}>
                          {item.type === 'workshop' ? 'Workshop' : 'Talk'}
                        </span>
                        <span className="atmos-sem-autocomplete-title" title={item.title}>
                          {item.title}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={`atmos-sem-topics${topicsExpanded ? ' atmos-sem-topics--open' : ''}`}>
            <button
              type="button"
              className="atmos-sem-topics-toggle"
              onClick={() => setTopicsExpanded((v) => !v)}
              aria-expanded={topicsExpanded}
            >
              <span className="atmos-sem-topics-toggle-label">Topics</span>
              {topicFilter ? (
                <span className="atmos-sem-topics-active">{topicFilter}</span>
              ) : (
                <span className="atmos-sem-topics-count">{allTopics.length} tags</span>
              )}
              <span className="atmos-sem-topics-chevron" aria-hidden="true" />
            </button>
            {topicsExpanded && (
              <div className="atmos-sem-tag-cloud">
                <button
                  type="button"
                  className={`atmos-sem-cloud-tag${!topicFilter ? ' active' : ''}`}
                  onClick={() => setTopicFilter('')}
                >
                  All
                </button>
                {allTopics.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`atmos-sem-cloud-tag${topicFilter === tag ? ' active' : ''}`}
                    onClick={() => setTopicFilter(tag === topicFilter ? '' : tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          </div>
        )}

        {/* PAST SEMINARS */}
        {showTalks && (
          <section className="atmos-sem-section">
            <div className="atmos-sem-sub">
              <div>
                <div className="atmos-sem-sub-eyebrow">Past Seminars</div>
                <h2 className="atmos-sem-sub-title">Talks given by our speakers.</h2>
              </div>
              {hasMoreTalks && (
                <button
                  type="button"
                  className="atmos-sem-view-all"
                  onClick={() => setActiveTab('talks')}
                >
                  View all talks <IconArrow />
                </button>
              )}
            </div>
            {displayedTalks.length > 0 ? (
              <div className="atmos-sem-cards">
                {displayedTalks.map((s) => (
                  <SeminarCard
                    item={s}
                    key={`${s.title}-${s.date}`}
                  />
                ))}
              </div>
            ) : (
              <div className="atmos-sem-coming-soon" role="status">
                <div className="atmos-sem-coming-soon-icon" aria-hidden="true">
                  <Mic size={22} />
                </div>
                <p className="atmos-sem-coming-soon-label">Coming soon</p>
                <p className="atmos-sem-coming-soon-copy">
                  Speaker talks and past seminars will land here soon.
                </p>
              </div>
            )}
          </section>
        )}

        {/* WORKSHOPS */}
        {showWorkshops && (
          <section className="atmos-sem-section">
            <div className="atmos-sem-sub">
              <div>
                <div className="atmos-sem-sub-eyebrow">Workshops &amp; Tutorials</div>
                <h2 className="atmos-sem-sub-title">Hands-on, applied sessions.</h2>
              </div>
              {activeTab === 'all' && filteredWorkshops.length > 0 && (
                <button
                  type="button"
                  className="atmos-sem-view-all"
                  onClick={() => setActiveTab('workshops')}
                >
                  View all workshops <IconArrow />
                </button>
              )}
            </div>
            {filteredWorkshops.length > 0 ? (
              <div className="atmos-sem-cards atmos-sem-cards--workshop">
                {filteredWorkshops.map((w) => (
                  <SeminarCard
                    item={w}
                    key={w.title}
                  />
                ))}
              </div>
            ) : (
              <div className="atmos-sem-coming-soon" role="status">
                <div className="atmos-sem-coming-soon-icon" aria-hidden="true">
                  <Wrench size={22} />
                </div>
                <p className="atmos-sem-coming-soon-label">Coming soon</p>
                <p className="atmos-sem-coming-soon-copy">
                  Hands-on workshops and tutorials will land here soon.
                </p>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
};

export default Seminars;
