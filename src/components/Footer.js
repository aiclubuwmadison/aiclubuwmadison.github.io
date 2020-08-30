import React from 'react';
import { Grid, Container } from '@material-ui/core';

const Footer = () => {

    return (
        <footer className="site-footer">
          <nav>
            <Container>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo_full.png`}
                width={192}
              />
              <div style={{float: "right"}}>
                <div class="social"><a style={{textDecoration: "none", color: "#bbb"}} href="https://www.facebook.com/AIatUW/" target="_blank">&#62232;</a></div>
                <div class="social"><a title="Suggestions Box" style={{textDecoration: "none", color: "#bbb"}} href="https://forms.gle/cKfuybyBQzv9vc8d8" target="_blank">&#x260E;</a></div>
                <div class="social"><a style={{textDecoration: "none", color: "#bbb"}} href="https://www.linkedin.com/company/ai-at-uw/" target="_blank">&#62220;</a></div>
              </div>
            </Container>
          </nav>
        </footer>
    );
};

export default Footer;