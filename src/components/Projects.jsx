import { useState, useEffect } from 'react';
import { Cpu, MessageSquare, Eye, Sparkles, FolderGit2 } from 'lucide-react';
import './Projects.css';

const Github = ({ size = 16, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Autonomous Rover',
    tagline: 'Precision navigation on custom rover chassis',
    category: 'Robotics',
    description: 'Developed an autonomous navigation system using computer vision, RTK-GPS sensor fusion, and ROS2 to pilot a custom-built physical rover across unstructured terrain.',
    tech: ['ROS2', 'Python', 'C++', 'OpenCV', 'PyTorch'],
    team: ['Project Lead', 'Team Member 1', 'Team Member 2'],
    repo: 'https://github.com/aiclubuwmadison/autonomous-rover',
    colorPreset: 'red'
  },
  {
    id: 2,
    title: 'ClinicianAssistant',
    tagline: 'Medical summarization & event extraction LLM',
    category: 'NLP',
    description: 'Fine-tuned a Llama-3 model on open-source clinical notes datasets to summarize patient records and extract diagnostic event timelines with high medical accuracy.',
    tech: ['PyTorch', 'HuggingFace', 'Llama-3', 'FastAPI', 'React'],
    team: ['Project Lead', 'Team Member 1', 'Team Member 2'],
    repo: 'https://github.com/aiclubuwmadison/clinician-assistant',
    colorPreset: 'azure'
  },
  {
    id: 3,
    title: 'WildfireEye',
    tagline: 'Real-time aerial wildfire segmentation',
    category: 'CV',
    description: 'Built a semantic segmentation pipeline using a customized UNet architecture to identify and outline wildfire hotspots from satellite and real-time drone imagery.',
    tech: ['PyTorch', 'UNet', 'TensorRT', 'Python', 'GDAL'],
    team: ['Project Lead', 'Team Member 1', 'Team Member 2'],
    repo: 'https://github.com/aiclubuwmadison/wildfire-eye',
    colorPreset: 'orange'
  },
  {
    id: 4,
    title: 'StudyAgent',
    tagline: 'Autonomous AI study buddy & coding tutor',
    category: 'Agents',
    description: 'An autonomous agent that assists students by checking compile errors in real-time, explaining algorithms, and suggesting codebase fixes in a sandboxed Docker environment.',
    tech: ['LangChain', 'Claude API', 'Node.js', 'Docker', 'React'],
    team: ['Project Lead', 'Team Member 1', 'Team Member 2'],
    repo: 'https://github.com/aiclubuwmadison/study-agent',
    colorPreset: 'purple'
  },
  {
    id: 5,
    title: 'SwarmCoordinator',
    tagline: 'Decentralized multi-agent drone navigation',
    category: 'Robotics',
    description: 'Implemented multi-agent reinforcement learning (MARL) algorithms to coordinate drone swarms in target tracking and collision avoidance within simulated environments.',
    tech: ['ROS', 'Python', 'Ray/RLlib', 'C++', 'Gazebo'],
    team: ['Project Lead', 'Team Member 1', 'Team Member 2'],
    repo: 'https://github.com/aiclubuwmadison/swarm-coordinator',
    colorPreset: 'emerald'
  },
  {
    id: 6,
    title: 'LegalSummarizer',
    tagline: 'Plain-English translation of complex legal contracts',
    category: 'NLP',
    description: 'Fine-tuned transformer-based models specifically on a corpus of legal briefs and terms of service documents to produce highly accurate, plain-English legal summaries.',
    tech: ['PyTorch', 'HuggingFace', 'Transformers', 'Flask'],
    team: ['Project Lead', 'Team Member 1', 'Team Member 2'],
    repo: 'https://github.com/aiclubuwmadison/legal-summarizer',
    colorPreset: 'purple'
  },
  {
    id: 7,
    title: 'CampusNavigator',
    tagline: 'Agentic trip planning across transit networks',
    category: 'Agents',
    description: 'An AI agent that interacts with real-time Madison transit APIs to create optimized travel plans for students, adapting dynamically to weather, delays, and class schedules.',
    tech: ['LangGraph', 'Python', 'FastAPI', 'Google Maps API'],
    team: ['Project Lead', 'Team Member 1', 'Team Member 2'],
    repo: 'https://github.com/aiclubuwmadison/campus-navigator',
    colorPreset: 'orange'
  }
];

const CATEGORIES = ['All', 'NLP', 'CV', 'Robotics', 'Agents'];

const getCategoryIcon = (category) => {
  switch (category) {
    case 'NLP': return <MessageSquare className="project-category-icon" size={16} />;
    case 'CV': return <Eye className="project-category-icon" size={16} />;
    case 'Robotics': return <Cpu className="project-category-icon" size={16} />;
    case 'Agents': return <Sparkles className="project-category-icon" size={16} />;
    default: return <FolderGit2 className="project-category-icon" size={16} />;
  }
};

const ProjectVisual = ({ preset }) => {
  switch (preset) {
    case 'red':
      return (
        <svg className="project-card-visual-svg" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="100" r="80" stroke="var(--atmos-badger)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.4" />
          <circle cx="200" cy="100" r="50" stroke="var(--atmos-badger)" strokeWidth="2" opacity="0.6" />
          <circle cx="200" cy="100" r="20" fill="var(--atmos-badger)" opacity="0.8" />
          <path d="M50 100 H350 M200 10 V190" stroke="var(--atmos-badger)" strokeWidth="0.75" opacity="0.3" />
        </svg>
      );
    case 'azure':
      return (
        <svg className="project-card-visual-svg" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 150 C 120 10, 280 190, 370 50" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <path d="M30 170 C 120 30, 280 210, 370 70" stroke="#0284c7" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          <path d="M30 130 C 120 -10, 280 170, 370 30" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        </svg>
      );
    case 'orange':
      return (
        <svg className="project-card-visual-svg" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="150" y="50" width="100" height="100" rx="12" stroke="#ea580c" strokeWidth="2" transform="rotate(45 200 100)" opacity="0.7" />
          <rect x="165" y="65" width="70" height="70" rx="8" stroke="#ea580c" strokeWidth="1" transform="rotate(45 200 100)" opacity="0.4" />
          <circle cx="200" cy="100" r="12" fill="#ea580c" opacity="0.8" />
        </svg>
      );
    case 'purple':
      return (
        <svg className="project-card-visual-svg" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 100 L160 50 L240 150 L320 100" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          <circle cx="80" cy="100" r="4" fill="#7c3aed" />
          <circle cx="160" cy="50" r="4" fill="#7c3aed" />
          <circle cx="240" cy="150" r="4" fill="#7c3aed" />
          <circle cx="320" cy="100" r="4" fill="#7c3aed" />
          <line x1="80" y1="100" x2="80" y2="180" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <line x1="160" y1="50" x2="160" y2="180" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <line x1="240" y1="150" x2="240" y2="180" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <line x1="320" y1="100" x2="320" y2="180" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
        </svg>
      );
    case 'emerald':
      return (
        <svg className="project-card-visual-svg" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 160 Q200 40 300 160" stroke="#059669" strokeWidth="2" fill="none" opacity="0.75" />
          <path d="M140 160 Q200 70 260 160" stroke="#059669" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M170 160 Q200 110 230 160" stroke="#059669" strokeWidth="1" fill="none" opacity="0.3" />
          <line x1="200" y1="20" x2="200" y2="160" stroke="#059669" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.4" />
        </svg>
      );
    default:
      return (
        <svg className="project-card-visual-svg" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="30" width="300" height="140" rx="10" stroke="var(--atmos-hairline)" strokeWidth="1.5" opacity="0.5" />
        </svg>
      );
  }
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    document.title = 'Student Projects | AI@UW';
  }, []);

  const filteredProjects = activeTab === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeTab);

  return (
    <div className="atmos-root atmos-projects">
      <section className="projects-hero">
        <div className="atmos-shell">
          <div className="projects-hero-content">
            <p className="projects-hero-eyebrow">AI@UW Showcase</p>
            <h1 className="projects-hero-title">Student Projects</h1>
            <p className="projects-hero-lede">
              Explore cutting-edge systems, models, and platforms built by our members. 
              From physical robots to fine-tuned transformer networks, we learn by building.
            </p>
            <div className="projects-notice-banner">
              <span className="projects-notice-badge">Template Showcase</span>
              <p className="projects-notice-text">
                Note: The projects listed below represent template showcases and hypothetical portfolio examples of the types of engineering projects AI@UW members collaborate on. Active project recruitment for this semester will open soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-grid-section">
        <div className="atmos-shell">
          {/* Tab Filters */}
          <div className="projects-tabs-container">
            <div className="projects-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`projects-tab${activeTab === cat ? ' active' : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((p) => (
              <div className="project-card" key={p.id}>
                {/* Visual Header */}
                <div className={`project-card-visual visual-${p.colorPreset}`}>
                  <ProjectVisual preset={p.colorPreset} />
                  <span className="project-card-category-badge">
                    {getCategoryIcon(p.category)}
                    {p.category}
                  </span>
                </div>

                {/* Content */}
                <div className="project-card-body">
                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-card-tagline">{p.tagline}</p>
                  <p className="project-card-desc">{p.description}</p>

                  {/* Tech Stack Chips */}
                  <div className="project-card-tech">
                    {p.tech.map((t) => (
                      <span className="project-tech-chip" key={t}>{t}</span>
                    ))}
                  </div>

                  {/* Team Credits */}
                  <div className="project-card-team">
                    <span className="project-team-label">Team:</span>
                    <span className="project-team-members">{p.team.join(', ')}</span>
                  </div>

                  {/* Repo Link */}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-repo-link"
                    >
                      <Github size={16} />
                      <span>View Repository</span>
                      <span className="project-repo-arrow">→</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
