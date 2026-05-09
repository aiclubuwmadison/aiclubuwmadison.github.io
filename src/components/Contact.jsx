import './Contact.css';

const Contact = () => {
  return (
    <div className="atmos-root atmos-contact">
      <section className="atmos-contact-hero">
        <div className="atmos-shell">
          <div className="atmos-hero-meta">
            <span className="atmos-dot" />
            <span>Contact</span>
            <span className="atmos-hero-meta-index">vi. say hello</span>
          </div>

          <div className="atmos-contact-row">
            <div className="atmos-contact-left">
              <h1 className="atmos-contact-title">
                Get in
                <br />
                touch<span className="atmos-contact-amp">.</span>
              </h1>

              <p className="atmos-contact-lede">
                Join our{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TTSykcZAg4">
                  Discord workspace
                </a>{' '}
                to communicate with other students, engage with study groups, and coordinate with
                project group members.{' '}
                <a target="_blank" rel="noopener noreferrer" href="http://eepurl.com/dMyKlQ">
                  Sign up
                </a>{' '}
                for our email newsletter to stay up-to-date on all AI@UW events. Or{' '}
                <a target="_blank" rel="noopener noreferrer" href="mailto:aiclubuwmadison@gmail.com">
                  shoot us an email
                </a>{' '}
                if you have any questions or if you'd like to reach out to our leadership.
              </p>

              <ul className="atmos-channel-list">
                <li className="atmos-channel">
                  <span className="atmos-channel-label">Email</span>
                  <span className="atmos-channel-text">
                    <a className="atmos-channel-link" href="mailto:aiclubuwmadison@gmail.com">
                      aiclubuwmadison@gmail.com
                    </a>
                  </span>
                  <span className="atmos-channel-arr">
                    <span className="atmos-arr">→</span>
                  </span>
                </li>
                <li className="atmos-channel">
                  <span className="atmos-channel-label">Discord</span>
                  <span className="atmos-channel-text">
                    <a
                      className="atmos-channel-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://discord.gg/TTSykcZAg4"
                    >
                      Join the workspace
                    </a>
                  </span>
                  <span className="atmos-channel-arr">
                    <span className="atmos-arr">→</span>
                  </span>
                </li>
                <li className="atmos-channel">
                  <span className="atmos-channel-label">Newsletter</span>
                  <span className="atmos-channel-text">
                    <a
                      className="atmos-channel-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://eepurl.com/dMyKlQ"
                    >
                      Subscribe
                    </a>
                  </span>
                  <span className="atmos-channel-arr">
                    <span className="atmos-arr">→</span>
                  </span>
                </li>
                <li className="atmos-channel">
                  <span className="atmos-channel-label">Location</span>
                  <span className="atmos-channel-text">UW–Madison</span>
                  <span className="atmos-channel-arr">WI</span>
                </li>
              </ul>
            </div>

            <div className="atmos-contact-right">
              <div className="atmos-form-head">
                <span className="atmos-form-eyebrow">Send us your thoughts</span>
                <span className="atmos-form-roman">vi.i — submission</span>
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

              <div className="atmos-form-foot">
                <span className="atmos-dot" />
                <span>Hosted on Google Forms</span>
                <em>— responses go to the AI@UW board.</em>
              </div>
            </div>
          </div>

          <div className="atmos-contact-foot">
            <span>AI@UW · Contact</span>
            <em>Madison, Wisconsin</em>
            <span>vi / vii</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
