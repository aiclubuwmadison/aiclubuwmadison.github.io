import React from 'react';
import { Grid, Container } from '@material-ui/core';

const Footer = () => {

    return (
        <footer className="site-footer">
          <nav>
            <Container>
              <Grid container>
                <Grid item xs={7}>
                  <span> Hello </span>
                </Grid>
                <Grid item xs={5}>
                  <span> World </span>
                </Grid>
              </Grid>
            </Container>
          </nav>
        </footer>
    );
};

export default Footer;