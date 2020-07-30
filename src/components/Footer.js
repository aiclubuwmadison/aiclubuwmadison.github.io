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
                <div class="social">&#62220;</div>
                <div class="social">&#62217;</div>
                <div class="social">&#62232;</div>
              </div>

            </Container>
          </nav>
        </footer>
    );
};

export default Footer;