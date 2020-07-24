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
            </Container>
          </nav>
        </footer>
    );
};

export default Footer;