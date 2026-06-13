import { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import './PitchBuilder.css';

const THEMES = [
  { id: 'obsidian', name: 'Obsidian Night', bgClass: 'theme-obsidian', bgHex: '#0b0f19', g1: 'rgba(197, 5, 12, 0.25)', g2: 'rgba(124, 58, 237, 0.20)' },
  { id: 'midnight', name: 'Midnight Azure', bgClass: 'theme-midnight', bgHex: '#020617', g1: 'rgba(2, 132, 199, 0.25)', g2: 'rgba(139, 92, 246, 0.22)' },
  { id: 'emerald', name: 'Teal Forest', bgClass: 'theme-emerald', bgHex: '#022c22', g1: 'rgba(20, 184, 166, 0.22)', g2: 'rgba(5, 150, 105, 0.18)' },
  { id: 'crimson', name: 'UW Crimson', bgClass: 'theme-crimson', bgHex: '#3f0709', g1: 'rgba(245, 158, 11, 0.22)', g2: 'rgba(197, 5, 12, 0.30)' }
];

const ROLES_LIST = [
  'NLP Developer',
  'Computer Vision Engineer',
  'Robotics Specialist',
  'Agent Engineer',
  'MLOps / Infrastructure',
  'UI/UX Designer',
  'Fullstack Web Developer'
];

const PitchBuilder = () => {
  const [projectName, setProjectName] = useState('EcoRouter');
  const [tagline, setTagline] = useState('CO2-optimized routing for clean city navigation');
  const [problem, setProblem] = useState(
    'Traditional navigation systems only optimize for speed or distance. Commuters have no way to choose routes that minimize carbon footprint or avoid high-pollution corridors, making sustainable transit decisions difficult.'
  );
  const [selectedRoles, setSelectedRoles] = useState(['NLP Developer', 'UI/UX Designer', 'Fullstack Web Developer']);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRef = useRef(null);
  const downloadTimeoutRef = useRef(null);

  useEffect(() => {
    document.title = 'Project Pitch Builder | AI@UW';
    return () => clearTimeout(downloadTimeoutRef.current);
  }, []);

  const handleRoleToggle = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const drawTextWithWrap = (ctx, text, x, y, maxWidth, lineHeight) => {
    const paragraphs = text.split('\n');
    let currentY = y;

    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      if (paragraph.trim() === '') {
        currentY += lineHeight * 0.6; // Small spacing for empty paragraph
        continue;
      }
      const words = paragraph.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
      if (i < paragraphs.length - 1) {
        currentY += lineHeight * 1.25; // Add paragraph spacing
      }
    }
    return currentY;
  };

  const drawRoundedRect = (ctx, x, y, width, height, radius, fillColor, strokeColor) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (document.fonts) {
        await document.fonts.ready;
      }
    } catch (e) {
      console.warn('Failed to wait for fonts ready:', e);
    }
    // Give state a small window to reflect downloading if needed
    downloadTimeoutRef.current = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = 1920;
      const h = 1080;

      // 1. Draw base theme background
      ctx.fillStyle = selectedTheme.bgHex;
      ctx.fillRect(0, 0, w, h);

      // 2. Draw glowing atmospheric circles (radial gradients)
      // Top-Left / Bottom-Left Glow
      const grad1 = ctx.createRadialGradient(200, 200, 50, 200, 200, 700);
      grad1.addColorStop(0, selectedTheme.g1);
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(200, 200, 700, 0, Math.PI * 2);
      ctx.fill();

      // Bottom-Right Glow
      const grad2 = ctx.createRadialGradient(w - 200, h - 200, 50, w - 200, h - 200, 800);
      grad2.addColorStop(0, selectedTheme.g2);
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(w - 200, h - 200, 800, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw tech dot-grid pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      const dotSpacing = 60;
      for (let x = 60; x < w - 60; x += dotSpacing) {
        for (let y = 60; y < h - 60; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw hairline framing border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(50, 50, w - 100, h - 100);

      // 5. Draw Header Branding
      // Small logo/brand mark text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = 'bold 16px "Space Mono", monospace';
      ctx.fillText('AI @ UW–MADISON', 100, 110);

      // Draw red Badger dot next to logo
      ctx.fillStyle = '#C5050C';
      ctx.beginPath();
      ctx.arc(255, 104, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '14px "Space Mono", monospace';
      ctx.fillText('STUDENT PROJECT PITCH', w - 300, 110);

      // 6. Draw Project Title & Tagline
      ctx.fillStyle = '#ffffff';
      ctx.font = '400 84px "Instrument Serif", Georgia, serif';
      ctx.fillText(projectName || 'Untitled Project', 100, 270);

      ctx.fillStyle = '#C5050C'; // UW Red Accent
      if (selectedTheme.id === 'midnight') ctx.fillStyle = '#38bdf8'; // Sky blue for contrast
      if (selectedTheme.id === 'emerald') ctx.fillStyle = '#34d399'; // Emerald for contrast
      ctx.font = 'italic 400 36px "Instrument Serif", Georgia, serif';
      ctx.fillText(tagline || 'Short project tagline goes here', 100, 345);

      // Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(100, 410);
      ctx.lineTo(w - 100, 410);
      ctx.stroke();

      // 7. Draw two-column details
      // Left Column: The Problem Statement
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = 'bold 14px "Space Mono", monospace';
      ctx.fillText('THE PROBLEM & CHALLENGE', 100, 470);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '500 28px/1.6 "Space Grotesk", system-ui, sans-serif';
      drawTextWithWrap(
        ctx,
        problem || 'State the problem your project solves.',
        100,
        530,
        1050,
        46
      );

      // Right Column: Roles Needed
      const colRightX = 1250;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = 'bold 14px "Space Mono", monospace';
      ctx.fillText('ROLES & COLLABORATORS NEEDED', colRightX, 470);

      if (selectedRoles.length === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = 'italic 400 22px "Instrument Serif", Georgia, serif';
        ctx.fillText('Open membership - all skills welcome.', colRightX, 530);
      } else {
        let currentY = 530;
        selectedRoles.forEach((role) => {
          // Draw a capsule badge for each role
          const badgeWidth = 450;
          const badgeHeight = 64;
          const radius = 12;

          drawRoundedRect(
            ctx,
            colRightX,
            currentY,
            badgeWidth,
            badgeHeight,
            radius,
            'rgba(255, 255, 255, 0.04)',
            'rgba(255, 255, 255, 0.08)'
          );

          // Draw left accent bar in role badge
          ctx.fillStyle = '#C5050C';
          if (selectedTheme.id === 'midnight') ctx.fillStyle = '#0284c7';
          if (selectedTheme.id === 'emerald') ctx.fillStyle = '#059669';
          ctx.fillRect(colRightX + 1, currentY + 12, 4, 40);

          // Role text
          ctx.fillStyle = '#ffffff';
          ctx.font = '600 20px "Space Grotesk", system-ui, sans-serif';
          ctx.fillText(role, colRightX + 28, currentY + 39);

          currentY += 84;
        });
      }

      // 8. Trigger download
      const link = document.createElement('a');
      link.download = `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-pitch.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setIsDownloading(false);
    }, 200);
  };

  return (
    <div className="atmos-root atmos-pitch">
      <section className="pitch-hero atmos-page-hero">
        <div className="atmos-shell atmos-page-hero-content">
          <p className="atmos-page-hero-eyebrow">Project Incubator</p>
          <h1 className="atmos-page-hero-title">Pitch Builder</h1>
          <p className="atmos-page-hero-lede">
            Draft your project idea and generate a beautiful pitch slide matching club standards. 
            Download it as a high-res card to share on Slack or present at recruitment night.
          </p>
        </div>
      </section>

      <section className="pitch-builder-section">
        <div className="atmos-shell pitch-builder-layout">
          {/* Left: Input Form */}
          <div className="pitch-form-card glass-panel">
            <h2 className="pitch-form-heading">Project Specs</h2>
            <p className="pitch-form-subheading">Define the core parameters of your venture.</p>

            <form onSubmit={(e) => e.preventDefault()} className="pitch-form">
              <div className="form-group">
                <label htmlFor="proj-name">Project Name</label>
                <input
                  id="proj-name"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. EcoRouter"
                  maxLength={28}
                />
              </div>

              <div className="form-group">
                <label htmlFor="proj-tagline">Tagline</label>
                <input
                  id="proj-tagline"
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. CO2-optimized routing for clean cities"
                  maxLength={55}
                />
              </div>

              <div className="form-group">
                <label htmlFor="proj-problem">The Challenge / Problem</label>
                <textarea
                  id="proj-problem"
                  rows={4}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Describe the problem, the core solution, and the stack you plan to use."
                  maxLength={220}
                />
                <span className="char-counter">{problem.length} / 220 characters</span>
              </div>

              <div className="form-group">
                <label>Roles Needed</label>
                <div className="roles-checkbox-grid">
                  {ROLES_LIST.map((role) => {
                    const isChecked = selectedRoles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        className={`role-select-chip${isChecked ? ' selected' : ''}`}
                        onClick={() => handleRoleToggle(role)}
                        aria-pressed={isChecked}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label>Background Theme</label>
                <div className="theme-selector-grid">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      className={`theme-preset-btn ${theme.bgClass}${selectedTheme.id === theme.id ? ' active' : ''}`}
                      onClick={() => setSelectedTheme(theme)}
                    >
                      <span className="theme-color-dot" />
                      <span>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Right: Real-time Preview Slide */}
          <div className="pitch-preview-col">
            <div className="pitch-preview-header">
              <span className="preview-label">Live Slide Preview</span>
              <span className="aspect-ratio-label">16:9 Aspect Ratio</span>
            </div>

            {/* The actual slide element */}
            <div className={`pitch-slide-container ${selectedTheme.bgClass}`}>
              {/* Dot Grid Layer */}
              <div className="slide-dot-grid" aria-hidden="true" />

              {/* Inset Hairline Frame */}
              <div className="slide-inner-border" aria-hidden="true" />

              {/* Header */}
              <div className="slide-header">
                <div className="slide-logo">
                  <span>AI @ UW–MADISON</span>
                  <span className="slide-logo-dot" />
                </div>
                <div className="slide-tag">STUDENT PROJECT PITCH</div>
              </div>

              {/* Main Info */}
              <div className="slide-main">
                <h3 className="slide-title">{projectName || 'Untitled Project'}</h3>
                <p className="slide-tagline">{tagline || 'Your catchy project tagline here'}</p>
              </div>

              <div className="slide-details">
                {/* Left col: problem */}
                <div className="slide-left-col">
                  <div className="slide-section-label">THE PROBLEM & CHALLENGE</div>
                  <p className="slide-problem-text">
                    {problem || 'Define the key issues and proposed solutions in this area.'}
                  </p>
                </div>

                {/* Right col: roles */}
                <div className="slide-right-col">
                  <div className="slide-section-label">ROLES NEEDED</div>
                  <div className="slide-roles-container">
                    {selectedRoles.length === 0 ? (
                      <p className="slide-empty-roles">Open membership - all skills welcome.</p>
                    ) : (
                      selectedRoles.slice(0, 3).map((role) => (
                        <div className="slide-role-badge" key={role}>
                          <span className="role-badge-accent" />
                          <span className="role-badge-text">{role}</span>
                        </div>
                      ))
                    )}
                    {selectedRoles.length > 3 && (
                      <div className="slide-role-more-badge">
                        +{selectedRoles.length - 3} more roles...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pitch-actions-bar">
              <button
                type="button"
                className="about-btn-primary download-slide-btn"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download size={16} />
                <span>{isDownloading ? 'Generating...' : 'Download Slide (PNG)'}</span>
              </button>
            </div>

            {/* Hidden canvas for drawing 1920x1080 high-res slide */}
            <canvas
              ref={canvasRef}
              width={1920}
              height={1080}
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PitchBuilder;
