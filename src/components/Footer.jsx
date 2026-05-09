import { Grid, Container } from '@mui/material';
import Subheader from './typographic/Subheader';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Grid container>
          <Grid xs>
            <img
              width={300}
              src="/images/logo_full.png"
              alt="AI@UW logo"
            />
          </Grid>
          <Grid xs>
            <Subheader variant="subheader-footer">
              Artificial Intelligence Club at UW-Madison
            </Subheader>
            <div className="social">
              <a
                style={{ textDecoration: 'none', color: '#bbb' }}
                href="https://www.instagram.com/aiclubuw/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
            <div className="social">
              <a
                title="Suggestions Box"
                style={{ textDecoration: 'none', color: '#bbb' }}
                href="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noreferrer"
              >
                Suggestions
              </a>
            </div>
            <div className="social">
              <a
                style={{ textDecoration: 'none', color: '#bbb' }}
                href="https://www.linkedin.com/company/aiclub-uwmadison"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
