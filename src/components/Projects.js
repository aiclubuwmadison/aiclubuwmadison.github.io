import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Chip, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const sampleProjects = [
  { title: 'DermAI', desc: 'Skin lesion classification with CNNs and uncertainty estimation.', chips: ['PyTorch', 'CNN', 'Grad-CAM'] },
  { title: 'MarketRL', desc: 'Policy learning for trading signals with offline RL.', chips: ['RL', 'SB3', 'Timeseries'] },
  { title: 'GenMuse', desc: 'Text-to-music generation using transformers and diffusion.', chips: ['Transformers', 'Diffusion', 'Audio'] },
  { title: 'MedVision', desc: 'Segmentation for medical imaging with UNet variants.', chips: ['CV', 'UNet', 'Dice'] },
  { title: 'CampusBot', desc: 'RAG assistant for campus information and navigation.', chips: ['LLMs', 'RAG', 'Vector DB'] },
  { title: 'EcoCast', desc: 'Climate forecasting with spatiotemporal deep learning.', chips: ['STDL', 'Geo', 'Forecasting'] },
];

const Projects = () => {
  return (
    <>
      {/* Hero */}
      <section className="page-hero gradient-bg">
        <div className="home-hero-overlay" />
        <Container className="page-hero-content">
          <Typography variant="h3" className="home-hero-title">Projects</Typography>
          <Typography variant="body1" className="home-hero-subtitle">
            End-to-end AI builds: data, modeling, evaluation, and deployment across disciplines.
          </Typography>
        </Container>
      </section>

      {/* Featured grid */}
      <Container className="page-section">
        <Typography variant="h4" className="home-section-title">Featured</Typography>
        <Grid container spacing={3}>
          {sampleProjects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.title}>
              <Card className="home-card tilt">
                <CardContent>
                  <Typography variant="subtitle1" className="home-card-title">{p.title}</Typography>
                  <Typography variant="body2" className="home-card-desc">{p.desc}</Typography>
                  <div style={{ marginTop: 8 }}>
                    {p.chips.map(k => (
                      <Chip key={k} label={k} size="small" className="home-chip" style={{ marginRight: 6, marginBottom: 6 }} />
                    ))}
                  </div>
                  <Button size="small" color="primary" style={{ marginTop: 8 }} component={Link} to="/contact">Collaborate</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to action */}
      <Container className="page-section" style={{ textAlign: 'center' }}>
        <Typography variant="h5" className="home-section-title">Have an idea you want to build?</Typography>
        <Button variant="contained" color="primary" component={Link} to="/involvement">Propose a Project</Button>
      </Container>
    </>
  );
};

export default Projects;