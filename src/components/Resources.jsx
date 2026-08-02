import { useState, useEffect } from 'react';
import {
  ExternalLink,
  Search,
  Calendar,
  User,
  ThumbsUp,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Plug,
} from 'lucide-react';
import './Resources.css';

// Fallback Mock News Data
const MOCK_NEWS_DATA = [
  {
    objectID: 'mock-1',
    title: "Introducing GPT-4o: OpenAI's new omni model integrating text, voice, and vision natively",
    url: 'https://openai.com/index/hello-gpt-4o/',
    author: 'openai_press',
    points: 842,
    num_comments: 312,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    objectID: 'mock-2',
    title: 'Direct Preference Optimization: Simple and stable LLM alignment without RLHF',
    url: 'https://arxiv.org/abs/2305.18290',
    author: 'stanford_ai',
    points: 512,
    num_comments: 148,
    created_at: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    objectID: 'mock-3',
    title: 'Claude 3.5 Sonnet sets new state-of-the-art benchmarks for graduate-level reasoning',
    url: 'https://www.anthropic.com/news/claude-3-5-sonnet',
    author: 'anthropic_dev',
    points: 730,
    num_comments: 254,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    objectID: 'mock-4',
    title: 'How LangGraph enables cyclical agentic behavior & multi-agent coordination in production',
    url: 'https://blog.langchain.dev/langgraph/',
    author: 'langchain_team',
    points: 320,
    num_comments: 94,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    objectID: 'mock-5',
    title: "AlphaFold 3 predicts structure and interactions of all life's molecules with proteins",
    url: 'https://www.nature.com/articles/s41586-024-07487-w',
    author: 'deepmind_edu',
    points: 915,
    num_comments: 412,
    created_at: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

const isSafeUrl = (urlStr) => {
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const Resources = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    document.title = 'Learning Resources | AI@UW';
  }, []);

  useEffect(() => {
    let active = true;

    const loadNewsAsync = async () => {
      try {
        const response = await fetch(
          'https://hn.algolia.com/api/v1/search_by_date?query=artificial%20intelligence&tags=story'
        );
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        if (active) {
          if (data.hits && data.hits.length > 0) {
            const cleanHits = data.hits.filter(hit => hit.title && hit.url && isSafeUrl(hit.url));
            if (cleanHits.length >= 3) {
              setNews(cleanHits.slice(0, 5));
            } else {
              setNews(MOCK_NEWS_DATA.slice(0, 5));
              setUsingFallback(true);
            }
          } else {
            setNews(MOCK_NEWS_DATA.slice(0, 5));
            setUsingFallback(true);
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn('HN API Fetch failed, loading high-quality curated fallback news instead:', err);
        if (active) {
          setNews(MOCK_NEWS_DATA.slice(0, 5));
          setUsingFallback(true);
          setLoading(false);
        }
      }
    };

    loadNewsAsync();

    return () => {
      active = false;
    };
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setUsingFallback(false);
    try {
      const response = await fetch(
        'https://hn.algolia.com/api/v1/search_by_date?query=artificial%20intelligence&tags=story'
      );
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        const cleanHits = data.hits.filter(hit => hit.title && hit.url && isSafeUrl(hit.url));
        if (cleanHits.length >= 3) {
          setNews(cleanHits.slice(0, 5));
        } else {
          setNews(MOCK_NEWS_DATA.slice(0, 5));
          setUsingFallback(true);
        }
      } else {
        setNews(MOCK_NEWS_DATA.slice(0, 5));
        setUsingFallback(true);
      }
    } catch (err) {
      console.warn('HN API Fetch failed, loading high-quality curated fallback news instead:', err);
      setNews(MOCK_NEWS_DATA.slice(0, 5));
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const filteredNews = news.filter((item) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = item.title?.toLowerCase().includes(query);
    const authorMatch = item.author?.toLowerCase().includes(query);
    return titleMatch || authorMatch;
  });

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    const cards = document.querySelectorAll('.res-news-card:not(.res-skeleton)');
    cards.forEach((el, i) => {
      if (el.classList.contains('sr-visible')) return;
      el.classList.add('sr-hidden');
      el.style.transitionDelay = `${Math.min((i % 6) * 70, 280)}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [news, searchQuery, loading]);

  return (
    <div className="atmos-root atmos-resources">
      <section className="res-hero atmos-page-hero">
        <div className="atmos-shell">
          <div className="atmos-page-hero-content">
            <p className="atmos-page-hero-eyebrow">AI@UW Knowledge Hub</p>
            <h1 className="atmos-page-hero-title">Learning Resources</h1>
            <p className="atmos-page-hero-lede">
              Live AI news, agent skills, and MCP resources for building with AI.
            </p>
            <a href="#news" className="atmos-page-hero-cta">
              Browse resources <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="res-section" id="news">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-eyebrow">AI News</span>
              <h2 className="atmos-section-title">Live AI News Feed</h2>
            </div>
          </div>

          <div className="res-news-controls">
            <div className="res-search-container">
              <Search className="res-search-icon" size={18} />
              <input
                type="text"
                placeholder="Search live AI news by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="res-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="res-search-clear"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={handleRefresh}
              className="res-refresh-btn"
              disabled={loading}
              title="Refresh News Feed"
              type="button"
            >
              <RefreshCw size={14} className={loading ? 'res-refreshing' : ''} />
              <span>Refresh Feed</span>
            </button>
          </div>

          {usingFallback && (
            <div className="res-banner-fallback">
              <AlertCircle size={16} className="res-banner-icon" />
              <span>
                Showing curated fallback news. The live Hacker News API is currently offline or rate-limiting.
              </span>
            </div>
          )}

          <div className="res-news-stream">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div className="res-news-card res-skeleton" key={i}>
                  <div className="res-skeleton-title" />
                  <div className="res-skeleton-row" />
                  <div className="res-skeleton-row short" />
                </div>
              ))
            ) : filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <a
                  key={item.objectID}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="res-news-card"
                >
                  <div className="res-news-header">
                    <h3 className="res-news-card-title">{item.title}</h3>
                  </div>

                  <div className="res-news-meta-row">
                    <span className="res-news-meta-item">
                      <User size={13} />
                      <span>{item.author}</span>
                    </span>
                    <span className="res-news-meta-item">
                      <Calendar size={13} />
                      <span>{formatDate(item.created_at)}</span>
                    </span>
                    <span className="res-news-meta-item">
                      <ThumbsUp size={13} />
                      <span>{item.points || 0} pts</span>
                    </span>
                  </div>
                  <div className="res-news-hover-hint">
                    <span>Read Article</span>
                    <ExternalLink size={12} />
                  </div>
                </a>
              ))
            ) : (
              <div className="res-news-empty">
                <p>No stories found matching "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="res-reset-search-btn"
                  type="button"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="res-section" id="skills">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-eyebrow">Agent toolkit</span>
              <h2 className="atmos-section-title">Agent Skills</h2>
            </div>
          </div>
          <p className="res-section-lede">
            Reusable skills and playbooks you can load into AI coding agents —
            procedures, conventions, and workflows that make agents more effective.
          </p>
          <div className="res-coming-soon" role="status">
            <div className="res-coming-soon-icon" aria-hidden="true">
              <Sparkles size={22} />
            </div>
            <p className="res-coming-soon-label">Coming soon</p>
            <p className="res-coming-soon-copy">
              Curated agent skills will land here soon.
            </p>
          </div>
        </div>
      </section>

      <section className="res-section res-section--last" id="mcp">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-eyebrow">Integrations</span>
              <h2 className="atmos-section-title">MCP</h2>
            </div>
          </div>
          <p className="res-section-lede">
            Model Context Protocol servers and guides — connect agents to tools,
            data sources, and services in a standard way.
          </p>
          <div className="res-coming-soon" role="status">
            <div className="res-coming-soon-icon" aria-hidden="true">
              <Plug size={22} />
            </div>
            <p className="res-coming-soon-label">Coming soon</p>
            <p className="res-coming-soon-copy">
              MCP resources and server recommendations will land here soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
