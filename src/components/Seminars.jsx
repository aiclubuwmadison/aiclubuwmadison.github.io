import { useState, useEffect, useRef, useMemo } from 'react';
import './Seminars.css';

const seminars = [
  {
    type: 'talk',
    title: 'Agentic AI — How It Developed — Can You Create Your Own Agentic AI',
    displayDate: 'Nov 2025',
    date: '2025-11-01',
    tags: ['Agents', 'Safety', 'RL', 'LLM Tools'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `A compact, responsible guide to agentic AI: definitions, history (reactive systems → planners → RL → LLM+tool agents), and practical blueprints for building safe agents. We break down agent anatomy: perception, state/memory, policy/planner, tools/actuators, reward/objectives, and safety modules. The talk demonstrates three safe starter projects (reflex agent, toy RL agent, LLM-as-planner with strict tool sandboxes), discusses evaluation (task success, robustness, safety metrics), and lists engineering practices (simulators, staged rollout, human-in-the-loop, kill switches). Critical cautionary topics include specification gaming, reward hacking, access control, and legal/ethical constraints. Students leave with small, sandboxed project ideas and a safety-first roadmap to prototype agents responsibly.`,
  },
  {
    type: 'talk',
    title: 'How LLMs Work — HDS Usage in Them',
    displayDate: 'Oct 2025',
    date: '2025-10-10',
    tags: ['LLMs', 'Transformers', 'HDS'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `An accessible tour of large language models (LLMs) tied to high-dimensional-statistics intuition. Topics: tokenization, embeddings, transformer blocks, pretraining/fine-tuning, decoding. HDS: concentration for embeddings, √d scaling in attention, low-rank structure, sparsity, and why overparameterization can still generalize. Practical diagnostics: probing embeddings, attention visualization, calibration, and memory/memorization issues. Includes simple code sketches (tiny attention forward pass, sampling loop, embedding nearest-neighbor). Focus: geometric intuition and pragmatic rules for scaling, normalization, and evaluation.`,
  },
  {
    type: 'talk',
    title: 'Stochastic Optimization in ML',
    displayDate: 'Oct 2025',
    date: '2025-10-01',
    tags: ['Optimization', 'SGD', 'Adam'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Why stochastic optimization powers modern ML and how to use it effectively. We motivate mini-batch gradients and build intuition for noise, bias, and variance. Algorithms: SGD, momentum, Nesterov, AdaGrad/RMSprop, Adam/AdamW, and variance-reduced (SVRG). High-dimensional insights: implicit regularization, batch/learning-rate scaling, and why stochasticity can improve generalization. Demos: SGD vs Adam, LR sweeps, gradient norms. Practical recipes: LR schedules, warmup, clipping, and diagnostics for stable training.`,
  },
  {
    type: 'talk',
    title: 'Transformers — How They Use Inference and HDS',
    displayDate: 'Sep 2025',
    date: '2025-09-01',
    tags: ['Transformers', 'Inference', 'HDS'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Concept-forward explanation of transformer operations (embeddings, self-attention, MHA, positional encodings, residuals/LayerNorm) and inference modes (greedy, beam, top-k/p). We connect high-dimensional statistics—concentration, scaling, low-rank approximations, sparsity—to practical behavior and approximations. Hands-on snippets include a minimal attention forward pass and a pretrained-embedding demo. Takeaways: geometric intuition and rules-of-thumb (scale & normalize, probe representations, use approximate attention judiciously).`,
  },
  {
    type: 'talk',
    title: 'Probability and Stochastic Processes in Finance',
    displayDate: 'May 2025',
    date: '2025-05-01',
    tags: ['Finance', 'Probability', 'Stochastic'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Probability essentials and canonical stochastic processes for finance—random walk, Poisson process, Brownian motion, Markov chains, and GBM. Intuition for filtration, martingales, stationarity/ergodicity. Applications: GBM-based asset models, risk-neutral pricing intuition, jump-diffusion, Monte Carlo pricing, and basic volatility models (GARCH). Short Python simulations (GBM, Monte Carlo options, Poisson jumps) illuminate randomness, assumptions, and limitations (heavy tails, volatility clustering).`,
  },
  {
    type: 'talk',
    title: 'Deep Learning in Biology (Genetics and Oncology)',
    displayDate: 'Apr 2025',
    date: '2025-04-01',
    tags: ['Bio', 'Genomics', 'DL'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `A primer on deep learning for genetics and cancer. Biology basics (DNA, variants, expression, tumor heterogeneity) and modalities (sequence, bulk/single-cell RNA-seq, histopathology) mapped to architectures: 1D CNNs and transformers for sequences, VAEs/autoencoders for expression denoising, GNNs for molecular/spatial interactions, and transfer learning for histology. Covers preprocessing, evaluation (patient-level splits, calibration), and ethics (privacy, consent, validation). Three compact sketches—sequence CNN, expression autoencoder, transfer-learned histology classifier—show end-to-end pipelines.`,
  },
  {
    type: 'talk',
    title: 'Inference in ML',
    displayDate: 'Mar 2025',
    date: '2025-03-01',
    tags: ['Uncertainty', 'Bayesian', 'Causal'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Clarifies "inference" across ML workflows: parameter inference, predictive uncertainty, causal inference, and simulation-based inference. Tools: MLE, bootstrap, Bayesian posteriors (MCMC/VI), conformal prediction, deep ensembles, MC-dropout, and doubly-robust estimators. Emphasis on assumptions (exchangeability, no unmeasured confounding) and diagnostics (calibration, coverage, sharpness). Demos: bootstrap intervals, Bayesian linear posterior, and split-conformal wrappers.`,
  },
  {
    type: 'talk',
    title: 'HDS in ML',
    displayDate: 'Feb 2025',
    date: '2025-02-01',
    tags: ['HDS', 'Regularization', 'Random Matrices'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `High-dimensional statistics (HDS) and why modern ML needs structure/regularization. Ideas: concentration, curse/blessing of dimensionality, sparsity, RIP, and random-matrix intuition. Connections to practice: LASSO recovery, covariance shrinkage, JL projections, randomized PCA, Graphical LASSO, compressed sensing. Intuitive rates like √(s log p / n) and why log p appears, with demos for LASSO and random projection.`,
  },
  {
    type: 'talk',
    title: 'Deep Learning — In Finance',
    displayDate: 'Dec 2024',
    date: '2024-12-01',
    tags: ['Finance', 'DL', 'Risk'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Deep learning applications in quantitative finance with risk-aware engineering. Topics: order-book representation learning, sequence models for forecasting, CNNs for alt data, GNNs for cross-asset structure, and generative models for stress scenarios. Emphasis on costs, backtesting pitfalls, walk-forward validation, model risk, and deployment. Compact PyTorch MLP example for a minimal prediction pipeline and governance best practices.`,
  },
  {
    type: 'talk',
    title: 'LangChains — Usage of Memory in ML',
    displayDate: 'Nov 2024',
    date: '2024-11-01',
    tags: ['LLMs', 'RAG', 'Memory'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `How LLM applications use memory for multi-step dialogue, stateful agents, and retrieval-augmented generation. Memory types: short-term, long-term, and episodic/working. Patterns: vector embeddings + nearest-neighbor retrieval, caches/summaries, compaction. Design trade-offs: context windows, latency vs freshness, privacy, and effects on coherence/hallucination. Demo: embeddings + FAISS retrieval in a loop with a memory-update policy. Practical takeaways: memory hygiene, retrieval quality metrics, and safe-memory practices.`,
  },
  {
    type: 'talk',
    title: 'ML Maths — Hierarchical Clustering',
    displayDate: 'Oct 2024',
    date: '2024-10-05',
    tags: ['Clustering', 'Dendrograms', 'Distance'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `An intuitive, math-light introduction to hierarchical clustering. Agglomerative/divisive approaches, linkage criteria (single, complete, average, Ward), and dendrogram interpretation. Distance metrics (Euclidean, cosine, correlation), linkage effects on cluster shapes, and preprocessing (scaling, outliers, cut heights). Emphasis on algorithmic steps, computational trade-offs, and when hierarchy is preferable (interpretability, nested structure, small datasets). Includes notebook demos using scipy/sklearn and practical pitfalls (chaining, sensitivity).`,
  },
  {
    type: 'talk',
    title: 'Dimensionality Reduction and PCA in ML',
    displayDate: 'Oct 2024',
    date: '2024-10-01',
    tags: ['PCA', 'SVD', 'UMAP/t-SNE'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Why reduce dimension (denoise, visualize, speed) with linear methods (PCA, truncated SVD), probabilistic PCA, and nonlinear methods (MDS, Isomap, t-SNE, UMAP). Geometric PCA interpretation, explained variance, component selection, randomized/incremental PCA. Pitfalls (centering/scaling, missing data), pipelines (preprocess, features, compression), demos for visualization and speedups, and when to use linear vs nonlinear reductions.`,
  },
];

const workshops = [
  {
    type: 'workshop',
    title: 'AWS SageMaker — End-to-End Training, Tuning, and Deployment',
    displayDate: 'Workshop',
    date: '2024-09-01',
    tags: ['AWS', 'SageMaker', 'SDK', 'TensorFlow', 'Tuning', 'Deploy'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Hands-on SageMaker fundamentals: create an execution role, stage code/data in S3, and use the SageMaker Python SDK to submit TensorFlow training jobs. Run small hyperparameter searches with HyperparameterTuner, package artifacts, deploy a real-time endpoint, and invoke it from a client. Emphasis on cost-conscious choices (compact instances like ml.m5.large, few epochs) and responsible lifecycle management (delete endpoints). Exercises include tweaking a minimal TF training script, running a constrained tuning job, and deploying a second model for comparison.`,
  },
  {
    type: 'workshop',
    title: 'TensorFlow and Keras — Practical Deep Learning Workflow',
    displayDate: 'Workshop',
    date: '2024-08-01',
    tags: ['TensorFlow', 'Keras', 'tf.data', 'CNN', 'TensorBoard', 'TFLite'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Core TF/Keras workflow for small-scale DL: reproducible envs, efficient tf.data pipelines with augmentation, and a CNN trained on CIFAR-10. Topics: model building, training/validation, callbacks (EarlyStopping, ModelCheckpoint), saving/loading (SavedModel), and exporting for serving or conversion (TFLite). Performance/debuggability: AUTOTUNE, GPU checks, mixed precision guidance, and TensorBoard logging. Labs: build a batched augmented pipeline and train a simple CNN with checkpoints/early stopping, then export the best model.`,
  },
];

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

const IconBookmark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);


const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

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
        <button className="atmos-sem-bookmark" aria-label="Bookmark">
          <IconBookmark />
        </button>
      </div>
      <p className={`atmos-sem-abstract${expanded ? ' atmos-sem-abstract--expanded' : ''}`}>
        {item.description}
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
    document.title = 'Seminars | AI@UW';
  }, []);

  const [activeTab, setActiveTab] = useState('all');
  const [topicFilter, setTopicFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="atmos-root atmos-seminars">
      <div className="atmos-shell">

        {/* HERO */}
        <header className="atmos-sem-hero atmos-reveal">
          <div className="atmos-sem-hero-text">
            <h1 className="atmos-sem-title">
              An archive of<br />
              <span style={{color:'var(--atmos-badger)'}}>talks</span> &amp; workshops<span className="atmos-sem-title-dot">.</span>
            </h1>
          </div>
          <div className="atmos-sem-hero-image" aria-hidden="true">
            <img src="/images/seminars/hero.jpg" alt="" fetchpriority="high" />
          </div>
        </header>

        {/* FILTER BAR */}
        <div className="atmos-sem-filter-bar">
          <div className="atmos-sem-tabs">
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
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            >
              <option value="">All Topics</option>
              {allTopics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              className="atmos-sem-select"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All Years</option>
              {allYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <div className="atmos-sem-search-wrap">
              <input
                className="atmos-sem-search"
                placeholder="Search talks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="atmos-sem-search-icon"><IconSearch /></span>
            </div>
          </div>
        </div>

        {/* PAST SEMINARS */}
        {showTalks && (
          <section className="atmos-sem-section">
            <div className="atmos-sem-sub">
              <div>
                <div className="atmos-sem-sub-eyebrow">Past Seminars</div>
                <h2 className="atmos-sem-sub-title">Talks given by our speakers.</h2>
              </div>
              {hasMoreTalks && (
                <a
                  className="atmos-sem-view-all"
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveTab('talks'); }}
                >
                  View all talks <IconArrow />
                </a>
              )}
            </div>
            {displayedTalks.length > 0 ? (
              <div className="atmos-sem-cards">
                {displayedTalks.map((s) => (
                  <SeminarCard item={s} key={`${s.title}-${s.date}`} />
                ))}
              </div>
            ) : (
              <p className="atmos-sem-empty">No talks match your filters.</p>
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
              {activeTab === 'all' && (
                <a
                  className="atmos-sem-view-all"
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveTab('workshops'); }}
                >
                  View all workshops <IconArrow />
                </a>
              )}
            </div>
            {filteredWorkshops.length > 0 ? (
              <div className="atmos-sem-cards atmos-sem-cards--workshop">
                {filteredWorkshops.map((w) => (
                  <SeminarCard item={w} key={w.title} />
                ))}
              </div>
            ) : (
              <p className="atmos-sem-empty">No workshops match your filters.</p>
            )}
          </section>
        )}

      </div>
    </div>
  );
};

export default Seminars;
