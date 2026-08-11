import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Newspaper, MapPin, ArrowRight, Check } from 'lucide-react';
import './Contact.css';
import RisingHeading from './RisingHeading';
import { useScrollReveal, usePointerGlow } from '../utils/motion';

const GUIDE_MS = 3000;

/** Curved arrow from the nav Join CTA to the contact form (fixed overlay). */
const JoinFormGuide = ({ active, targetId }) => {
  const [geometry, setGeometry] = useState(null);

  const measure = useCallback(() => {
    const form = document.getElementById(targetId);
    if (!form) return;

    const desktopCta = document.querySelector('.atmos-nav-cta');
    const mobileCta = document.querySelector('.atmos-nav-mobile-cta');
    let fromEl = null;

    if (desktopCta) {
      const style = window.getComputedStyle(desktopCta);
      if (style.display !== 'none' && style.visibility !== 'hidden' && desktopCta.getBoundingClientRect().width > 0) {
        fromEl = desktopCta;
      }
    }
    if (!fromEl && mobileCta) {
      const rect = mobileCta.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) fromEl = mobileCta;
    }

    const to = form.getBoundingClientRect();
    const from = fromEl
      ? fromEl.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: 72, width: 0, height: 0, bottom: 72, right: window.innerWidth / 2 };

    const x1 = from.left + from.width / 2;
    const y1 = from.bottom + 4;
    // Aim at the Contact Us heading area
    const tipX = to.left + Math.min(72, to.width * 0.28);
    const tipY = to.top + 36;
    // Line stops just above the chevron so dashes don't collide with the tip
    const x2 = tipX;
    const y2 = tipY - 12;
    const midY = y1 + (y2 - y1) * 0.5;
    const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${y1 + (y2 - y1) * 0.25}, ${x2} ${y2}`;

    // Explicit chevron tip (SVG markers + dash animation often render as a blob)
    const size = 12;
    const wing = size * 0.75;
    const leftX = tipX - wing;
    const leftY = tipY - size;
    const rightX = tipX + wing;
    const rightY = tipY - size;
    const head = `M ${leftX} ${leftY} L ${tipX} ${tipY} L ${rightX} ${rightY}`;

    setGeometry({
      path,
      head,
      w: window.innerWidth,
      h: window.innerHeight,
      x2: tipX,
      y2: tipY,
    });
  }, [targetId]);

  useEffect(() => {
    if (!active) {
      const clearId = window.setTimeout(() => setGeometry(null), 0);
      return () => window.clearTimeout(clearId);
    }

    const t0 = window.setTimeout(measure, 0);
    const t1 = window.setTimeout(measure, 120);
    const t2 = window.setTimeout(measure, 480);
    const t3 = window.setTimeout(measure, 900);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [active, measure]);

  if (!active || !geometry) return null;

  return (
    <div className="join-form-guide" aria-hidden="true">
      <svg
        className="join-form-guide-svg"
        width={geometry.w}
        height={geometry.h}
        viewBox={`0 0 ${geometry.w} ${geometry.h}`}
      >
        <path
          d={geometry.path}
          className="join-form-guide-path"
          fill="none"
        />
        <path
          d={geometry.head}
          className="join-form-guide-head"
          fill="none"
        />
      </svg>
      <span
        className="join-form-guide-pulse"
        style={{ left: geometry.x2, top: geometry.y2 }}
      />
    </div>
  );
};

const Contact = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showJoinGuide, setShowJoinGuide] = useState(false);

  useEffect(() => {
    document.title = 'Contact | AI@UW';
  }, []);

  // Guide arrow from "Join the club" → Contact Us section (~3s)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromJoin =
      params.get('join') === '1' ||
      location.hash === '#contact-us' ||
      location.hash === '#join-form' || // legacy
      Boolean(location.state?.guideToContact) ||
      Boolean(location.state?.guideToForm); // legacy

    if (!fromJoin) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let endTimer = 0;
    const targetId = 'contact-us';

    const scrollTimer = window.setTimeout(() => {
      const target = document.getElementById(targetId);
      target?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      if (!reducedMotion) {
        setShowJoinGuide(true);
        target?.classList.add('is-join-guided');
      }
    }, 60);

    endTimer = window.setTimeout(() => {
      setShowJoinGuide(false);
      document.getElementById(targetId)?.classList.remove('is-join-guided');
    }, GUIDE_MS + 60);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(endTimer);
      setShowJoinGuide(false);
      document.getElementById(targetId)?.classList.remove('is-join-guided');
    };
  }, [location.search, location.hash, location.state, location.key]);

  useScrollReveal('.atmos-channel-card, .atmos-contact-right', { groupSize: 4 });

  const { ref: channelsRef, onPointerMove: trackGlow } = usePointerGlow({
    childSelector: '.atmos-channel-card',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);

    const fullMessage = `Name: ${name.trim() || 'Anonymous'}\nEmail: ${email.trim() || 'Not provided'}\n\nMessage:\n${message.trim()}`;

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/formResponse';
    const formData = new URLSearchParams();
    formData.append('entry.216942505', fullMessage);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to send message. Please try again or email us directly at aiclubuwmadison@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="atmos-root atmos-contact">
      <section className="atmos-contact-hero">
        <div className="atmos-shell">
          <div className="atmos-contact-row">
            <div className="atmos-contact-left" id="contact-us">
              <RisingHeading
                className="atmos-contact-title"
                lines={[
                  'Get in',
                  [{ word: 'touch.', className: 'atmos-contact-amp' }],
                ]}
              />

              <p className="atmos-contact-lede atmos-rise" style={{ '--d': '400ms' }}>
                Email, Discord, or the form below.
              </p>

              <ul className="atmos-channel-list" ref={channelsRef} onPointerMove={trackGlow}>
                <li>
                  <a
                    className="atmos-channel-card atmos-lift atmos-glow"
                    href="mailto:aiclubuwmadison@gmail.com"
                  >
                    <span className="atmos-channel-icon atmos-icon-badge" aria-hidden="true">
                      <Mail strokeWidth={1.8} />
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Email</span>
                      <span className="atmos-channel-sub">aiclubuwmadison@gmail.com</span>
                    </span>
                    <span className="atmos-channel-arr atmos-arrow" aria-hidden="true">
                      <ArrowRight strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="atmos-channel-card atmos-lift atmos-glow"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://discord.gg/TTSykcZAg4"
                  >
                    <span className="atmos-channel-icon atmos-icon-badge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.27 5.33A18.13 18.13 0 0 0 14.7 4l-.21.42a17.3 17.3 0 0 0-4.97 0L9.3 4a18.13 18.13 0 0 0-4.57 1.33C2.05 9.27 1.32 13.1 1.68 16.88a18.4 18.4 0 0 0 5.57 2.81c.45-.61.85-1.26 1.19-1.94-.65-.24-1.27-.54-1.86-.89.16-.11.31-.23.46-.35a13 13 0 0 0 11.92 0c.15.12.3.24.46.35-.59.35-1.21.65-1.86.9.34.67.74 1.32 1.19 1.93a18.4 18.4 0 0 0 5.57-2.81c.43-4.39-.74-8.18-3.05-11.55ZM8.52 14.5c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.13 0 2.03 1 2 2.2 0 1.21-.88 2.2-2 2.2Zm6.96 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.13 0 2.03 1 2 2.2 0 1.21-.87 2.2-2 2.2Z" />
                      </svg>
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Discord</span>
                      <span className="atmos-channel-sub">Join our workspace</span>
                    </span>
                    <span className="atmos-channel-arr atmos-arrow" aria-hidden="true">
                      <ArrowRight strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="atmos-channel-card atmos-lift atmos-glow"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://eepurl.com/dMyKlQ"
                  >
                    <span className="atmos-channel-icon atmos-icon-badge" aria-hidden="true">
                      <Newspaper strokeWidth={1.8} />
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Newsletter</span>
                      <span className="atmos-channel-sub">Subscribe to our updates</span>
                    </span>
                    <span className="atmos-channel-arr atmos-arrow" aria-hidden="true">
                      <ArrowRight strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="atmos-channel-card atmos-lift atmos-glow"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://maps.google.com/?q=University+of+Wisconsin-Madison"
                  >
                    <span className="atmos-channel-icon atmos-icon-badge" aria-hidden="true">
                      <MapPin strokeWidth={1.8} />
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Location</span>
                      <span className="atmos-channel-sub">UW&ndash;Madison</span>
                    </span>
                    <span className="atmos-channel-arr atmos-arrow" aria-hidden="true">
                      <ArrowRight strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="atmos-contact-right">
              <div className="atmos-form-head">
                <span className="atmos-form-eyebrow">Send us your thoughts</span>
              </div>

              <p className="atmos-contact-lede" style={{ margin: 0 }}>
                Name and email are optional.
              </p>

              {submitted ? (
                <div className="contact-success-panel">
                  <div className="contact-success-icon" aria-hidden="true">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="contact-success-title">Message Sent!</h3>
                  <p className="contact-success-message">
                    Thank you for reaching out. We have received your suggestion and will review it shortly.
                  </p>
                  <button
                    type="button"
                    className="contact-success-back-btn"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-group">
                    <label htmlFor="contact-name" className="contact-form-label">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      className="contact-form-input"
                      placeholder="Alex Badger"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="contact-email" className="contact-form-label">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      className="contact-form-input"
                      placeholder="abadger@wisc.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="contact-message" className="contact-form-label">
                      Comments / Suggestions
                    </label>
                    <textarea
                      id="contact-message"
                      className="contact-form-textarea"
                      placeholder="Share your thoughts, suggestions, or questions with us..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="atmos-btn-primary contact-form-submit-btn"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Submit Message'}
                  </button>
                </form>
              )}

              <p className="atmos-contact-lede" style={{ margin: 0 }}>
                Here is the{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?usp=publish-editor"
                >
                  full page option
                </a>
                .
              </p>
            </div>
          </div>

        </div>
      </section>

      <JoinFormGuide active={showJoinGuide} targetId="contact-us" />
    </div>
  );
};

export default Contact;
