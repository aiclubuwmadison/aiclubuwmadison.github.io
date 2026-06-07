import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Cpu, 
  ExternalLink, 
  Terminal, 
  Layers, 
  Network, 
  Search, 
  Calendar, 
  User, 
  ThumbsUp, 
  RefreshCw,
  AlertCircle,
  FileText
} from 'lucide-react';
import './Resources.css';

// Core AI Skills Data
const SKILLS_DATA = [
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    description: 'Master systematic prompting techniques, including few-shot learning, chain-of-thought prompting, and structured evaluation to program model behaviors.',
    tags: ['Prompting', 'LLM', 'Beginner'],
    colorPreset: 'red'
  },
  {
    id: 'rag-systems',
    title: 'RAG Systems',
    description: 'Build reliable production retrieval pipelines. Understand vector databases, document chunking strategies, embeddings, re-ranking models, and hybrid search.',
    tags: ['Retrieval', 'Vector DB', 'System Design'],
    colorPreset: 'azure'
  },
  {
    id: 'fine-tuning',
    title: 'Fine-Tuning LLMs',
    description: 'Optimize open-source models for specific tasks. Explore parameter-efficient methods (LoRA, QLoRA), dataset preparation, tokenization, and compute constraints.',
    tags: ['Fine-Tuning', 'PyTorch', 'Advanced'],
    colorPreset: 'orange'
  },
  {
    id: 'agentic-workflows',
    title: 'Agentic Workflows',
    description: 'Design multi-agent architectures that execute complex tasks. Implement stateful execution graphs, tool calling, memory management, and self-reflection loops.',
    tags: ['Agents', 'Reasoning', 'LangGraph'],
    colorPreset: 'purple'
  }
];

// Recommended Readings Data
const READINGS_DATA = [
  {
    title: 'Attention Is All You Need',
    authors: 'Vaswani et al. (2017)',
    description: 'The seminal paper that introduced the Transformer architecture, replacing recurrent models with self-attention mechanisms and laying the foundation for modern LLMs.',
    tags: ['Core', 'Transformer', 'NLP'],
    link: 'https://arxiv.org/abs/1706.03762'
  },
  {
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    authors: 'Lewis et al. (2020)',
    description: 'Introduced RAG, combining pre-trained parametric memory with non-parametric memory (dense vector retrieval) to produce factual and up-to-date responses.',
    tags: ['RAG', 'Embeddings', 'System'],
    link: 'https://arxiv.org/abs/2005.11401'
  },
  {
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Hu et al. (2021)',
    description: 'Presented a parameter-efficient fine-tuning technique that freezes pre-trained weights and injects trainable rank decomposition matrices, drastically reducing GPU memory needs.',
    tags: ['Fine-Tuning', 'PEFT', 'Efficiency'],
    link: 'https://arxiv.org/abs/2106.09685'
  },
  {
    title: 'Reflexion: Language Agents with Active Learning',
    authors: 'Shinn et al. (2023)',
    description: 'Introduced an agentic framework that equips language models with dynamic memory and self-reflective capabilities to correct errors and improve execution iteratively.',
    tags: ['Agents', 'Evaluation', 'Self-Correction'],
    link: 'https://arxiv.org/abs/2303.11366'
  },
  {
    title: 'Sparks of Artificial General Intelligence',
    authors: 'Bubeck et al. (2023)',
    description: 'An early investigation into GPT-4, analyzing its capabilities across mathematics, coding, vision, medicine, law, psychology, and discussing limitations and steps toward AGI.',
    tags: ['AGI', 'Evaluation', 'LLM Capabilities'],
    link: 'https://arxiv.org/abs/2303.12712'
  }
];

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

const SkillVisual = ({ preset }) => {
  switch (preset) {
    case 'red':
      return (
        <svg className="resource-card-visual-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="30" width="280" height="100" rx="8" stroke="var(--atmos-badger)" strokeWidth="1.5" opacity="0.3" />
          <path d="M80 55 L95 65 L80 75" stroke="var(--atmos-badger)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          <line x1="105" y1="75" x2="135" y2="75" stroke="var(--atmos-badger)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <line x1="80" y1="100" x2="260" y2="100" stroke="var(--atmos-badger)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          <line x1="80" y1="112" x2="200" y2="112" stroke="var(--atmos-badger)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          <circle cx="310" cy="55" r="4" fill="var(--atmos-badger)" opacity="0.6" />
          <circle cx="320" cy="55" r="4" fill="var(--atmos-badger)" opacity="0.4" />
          <circle cx="300" cy="55" r="4" fill="var(--atmos-badger)" opacity="0.8" />
        </svg>
      );
    case 'azure':
      return (
        <svg className="resource-card-visual-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M120 40 L280 40 L240 70 L80 70 Z" fill="rgba(2, 132, 199, 0.05)" stroke="#0284c7" strokeWidth="1.5" opacity="0.8" />
          <path d="M120 75 L280 75 L240 105 L80 105 Z" fill="rgba(2, 132, 199, 0.03)" stroke="#0284c7" strokeWidth="1.5" opacity="0.5" />
          <path d="M120 110 L280 110 L240 140 L80 140 Z" fill="rgba(2, 132, 199, 0.01)" stroke="#0284c7" strokeWidth="1.5" opacity="0.3" />
          <line x1="200" y1="55" x2="200" y2="125" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
          <circle cx="200" cy="55" r="4" fill="#0284c7" />
          <circle cx="200" cy="90" r="4" fill="#0284c7" />
          <circle cx="200" cy="125" r="4" fill="#0284c7" />
        </svg>
      );
    case 'orange':
      return (
        <svg className="resource-card-visual-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="120" cy="80" r="15" stroke="#ea580c" strokeWidth="2" opacity="0.7" />
          <circle cx="200" cy="50" r="15" stroke="#ea580c" strokeWidth="2" opacity="0.7" />
          <circle cx="200" cy="110" r="15" stroke="#ea580c" strokeWidth="2" opacity="0.7" />
          <circle cx="280" cy="80" r="15" stroke="#ea580c" strokeWidth="2" opacity="0.7" />
          
          <line x1="135" y1="75" x2="185" y2="55" stroke="#ea580c" strokeWidth="1" opacity="0.4" />
          <line x1="135" y1="85" x2="185" y2="105" stroke="#ea580c" strokeWidth="1" opacity="0.4" />
          <line x1="215" y1="55" x2="265" y2="75" stroke="#ea580c" strokeWidth="1" opacity="0.4" />
          <line x1="215" y1="105" x2="265" y2="85" stroke="#ea580c" strokeWidth="1" opacity="0.4" />
          
          <path d="M120 80 L280 80" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
          <path d="M200 35 L200 125" stroke="#ea580c" strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case 'purple':
      return (
        <svg className="resource-card-visual-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="130" cy="80" r="18" stroke="#7c3aed" strokeWidth="2" opacity="0.8" />
          <circle cx="270" cy="80" r="18" stroke="#7c3aed" strokeWidth="2" opacity="0.8" />
          <path d="M148 74 C 180 50, 220 50, 252 74" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M252 86 C 220 110, 180 110, 148 86" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
          
          <path d="M246 72 L254 75 L252 67" stroke="#7c3aed" strokeWidth="2" fill="#7c3aed" />
          <path d="M154 88 L146 85 L148 93" stroke="#7c3aed" strokeWidth="2" fill="#7c3aed" />
          
          <circle cx="200" cy="58" r="4" fill="#7c3aed" />
          <circle cx="200" cy="102" r="4" fill="#7c3aed" />
        </svg>
      );
    default:
      return (
        <svg className="resource-card-visual-svg" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="30" width="300" height="100" rx="10" stroke="var(--atmos-hairline)" strokeWidth="1.5" opacity="0.5" />
        </svg>
      );
  }
};

const getSkillIcon = (id) => {
  switch (id) {
    case 'prompt-engineering': return <Terminal size={18} />;
    case 'rag-systems': return <Layers size={18} />;
    case 'fine-tuning': return <Cpu size={18} />;
    case 'agentic-workflows': return <Network size={18} />;
    default: return <BookOpen size={18} />;
  }
};

const Resources = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  // Set Page Title on Mount
  useEffect(() => {
    document.title = 'Learning Resources | AI@UW';
  }, []);

  // Fetch Live AI News asynchronously on mount (avoids synchronous setState in effect body)
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
            const cleanHits = data.hits.filter(hit => hit.title && hit.url);
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

  // Manual Refresh Handler
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
        const cleanHits = data.hits.filter(hit => hit.title && hit.url);
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

  return (
    <div className="atmos-root atmos-resources">
      {/* 1. HERO / HEADER SECTION */}
      <section className="res-hero">
        <div className="atmos-shell">
          <div className="res-hero-content">
            <p className="res-hero-eyebrow">AI@UW Knowledge Hub</p>
            <h1 className="res-hero-title">Learning Resources</h1>
            <p className="res-hero-lede">
              Accelerate your engineering journey. Access core curriculum guides, 
              curated academic literature, and stay updated with live Artificial Intelligence news.
            </p>
          </div>
        </div>
      </section>

      {/* 2. LIVE AI NEWS FEED */}
      <section className="res-section">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-eyebrow">Algolia Hacker News Stream</span>
              <h2 className="atmos-section-title">Live AI News Feed</h2>
            </div>
            <span className="atmos-section-aside">01 / Signal</span>
          </div>

          {/* Search and Feedback Banner */}
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

          {/* News Stream Layout */}
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

      {/* 3. GUIDES & SKILLS DIRECTORY */}
      <section className="res-section res-section-tinted">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-eyebrow">Curriculum Directory</span>
              <h2 className="atmos-section-title">Core AI Guides</h2>
            </div>
            <span className="atmos-section-aside">02 / Skillsets</span>
          </div>

          <div className="res-skills-grid">
            {SKILLS_DATA.map((skill) => (
              <div className="res-skill-card" key={skill.id}>
                <div className={`res-card-visual visual-${skill.colorPreset}`}>
                  <SkillVisual preset={skill.colorPreset} />
                  <span className="res-card-category-badge">
                    {getSkillIcon(skill.id)}
                    {skill.title}
                  </span>
                </div>
                
                <div className="res-card-body">
                  <h3 className="res-card-title">{skill.title}</h3>
                  <p className="res-card-desc">{skill.description}</p>
                  
                  <div className="res-card-footer">
                    <div className="res-tag-group">
                      {skill.tags.map((tag) => (
                        <span className="res-tag-chip" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED READINGS */}
      <section className="res-section">
        <div className="atmos-shell">
          <div className="atmos-section-head">
            <div>
              <span className="atmos-section-eyebrow">Literature List</span>
              <h2 className="atmos-section-title">Recommended Readings</h2>
            </div>
            <span className="atmos-section-aside">03 / Research</span>
          </div>

          <div className="res-readings-list">
            {READINGS_DATA.map((reading, index) => (
              <div className="res-reading-row" key={index}>
                <div className="res-reading-left">
                  <div className="res-reading-number">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="res-reading-meta">
                    <h3 className="res-reading-title">{reading.title}</h3>
                    <span className="res-reading-author">
                      <User size={13} style={{ marginRight: '6px' }} />
                      {reading.authors}
                    </span>
                  </div>
                </div>

                <div className="res-reading-center">
                  <p className="res-reading-desc">{reading.description}</p>
                  <div className="res-reading-tags">
                    {reading.tags.map((tag) => (
                      <span className="res-reading-chip" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="res-reading-right">
                  <a 
                    href={reading.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="res-reading-link"
                    aria-label={`Read paper ${reading.title}`}
                  >
                    <FileText size={16} />
                    <span>View PDF</span>
                    <ExternalLink size={12} className="res-link-icon" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
