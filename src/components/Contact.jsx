import { useEffect } from 'react';
import { Mail, Newspaper, MapPin, ArrowRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact | AI@UW';
  }, []);

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
                We&rsquo;d love to hear from you. Reach out to collaborate,
                ask questions, or share your ideas.
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
                If there's anything else you want to say, share it via the form below or our{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?usp=publish-editor"
                >
                  full-page version
                </a>
                .
              </p>

              <div className="atmos-form-frame">
                <iframe
                  className="atmos-form-iframe"
                  title="contact-embed"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?embedded=true"
                  width="640"
                  height="640"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  scrolling="auto"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
