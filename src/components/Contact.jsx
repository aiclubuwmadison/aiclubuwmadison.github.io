import { useEffect, useState } from 'react';
import { Mail, Newspaper, MapPin, ArrowRight, Check } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Contact | AI@UW';
  }, []);

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
            <div className="atmos-contact-left">
              <h1 className="atmos-contact-title">
                Get in
                <br />
                <span className="atmos-contact-amp">touch.</span>
              </h1>

              <p className="atmos-contact-lede">
                Email, Discord, or the form below.
              </p>

              <ul className="atmos-channel-list">
                <li>
                  <a
                    className="atmos-channel-card"
                    href="mailto:aiclubuwmadison@gmail.com"
                  >
                    <span className="atmos-channel-icon" aria-hidden="true">
                      <Mail strokeWidth={1.8} />
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Email</span>
                      <span className="atmos-channel-sub">aiclubuwmadison@gmail.com</span>
                    </span>
                    <span className="atmos-channel-arr" aria-hidden="true">
                      <ArrowRight strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="atmos-channel-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://discord.gg/TTSykcZAg4"
                  >
                    <span className="atmos-channel-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.27 5.33A18.13 18.13 0 0 0 14.7 4l-.21.42a17.3 17.3 0 0 0-4.97 0L9.3 4a18.13 18.13 0 0 0-4.57 1.33C2.05 9.27 1.32 13.1 1.68 16.88a18.4 18.4 0 0 0 5.57 2.81c.45-.61.85-1.26 1.19-1.94-.65-.24-1.27-.54-1.86-.89.16-.11.31-.23.46-.35a13 13 0 0 0 11.92 0c.15.12.3.24.46.35-.59.35-1.21.65-1.86.9.34.67.74 1.32 1.19 1.93a18.4 18.4 0 0 0 5.57-2.81c.43-4.39-.74-8.18-3.05-11.55ZM8.52 14.5c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.13 0 2.03 1 2 2.2 0 1.21-.88 2.2-2 2.2Zm6.96 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.13 0 2.03 1 2 2.2 0 1.21-.87 2.2-2 2.2Z" />
                      </svg>
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Discord</span>
                      <span className="atmos-channel-sub">Join our workspace</span>
                    </span>
                    <span className="atmos-channel-arr" aria-hidden="true">
                      <ArrowRight strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="atmos-channel-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://eepurl.com/dMyKlQ"
                  >
                    <span className="atmos-channel-icon" aria-hidden="true">
                      <Newspaper strokeWidth={1.8} />
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Newsletter</span>
                      <span className="atmos-channel-sub">Subscribe to our updates</span>
                    </span>
                    <span className="atmos-channel-arr" aria-hidden="true">
                      <ArrowRight strokeWidth={1.8} />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="atmos-channel-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://maps.google.com/?q=University+of+Wisconsin-Madison"
                  >
                    <span className="atmos-channel-icon" aria-hidden="true">
                      <MapPin strokeWidth={1.8} />
                    </span>
                    <span className="atmos-channel-body">
                      <span className="atmos-channel-title">Location</span>
                      <span className="atmos-channel-sub">UW&ndash;Madison</span>
                    </span>
                    <span className="atmos-channel-arr" aria-hidden="true">
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
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
