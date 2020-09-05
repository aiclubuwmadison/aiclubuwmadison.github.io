import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Subheader from './typographic/Subheader';

const Footer = () => {

    return (
        <footer className="site-footer">
            <Container>
              <Grid container>
                <Grid item xs>
                  <img
                    width={300}
                    src={`${process.env.PUBLIC_URL}/images/logo_full.png`}
                  />
                </Grid>
                <Grid item xs>
                  <Subheader variant="subheader-footer"> UW-Madison Artificial Intelligence Club </Subheader>
                  <div class="social"><a style={{textDecoration: "none", color: "#bbb"}} href="https://www.facebook.com/AIatUW/" target="_blank">Facebook</a></div>
                  <div class="social"><a title="Suggestions Box" style={{textDecoration: "none", color: "#bbb"}} href="https://forms.gle/cKfuybyBQzv9vc8d8" target="_blank">Suggestions</a></div>
                  <div class="social"><a style={{textDecoration: "none", color: "#bbb"}} href="https://www.linkedin.com/company/ai-at-uw/" target="_blank">LinkedIn</a></div>
                </Grid>
              </Grid>
            </Container>
        </footer>
    );
};

export default Footer;