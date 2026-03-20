import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Button } from '@material-ui/core';
import Header from './typographic/Header';

const Contact = () => {

    return (
        <>
            <section className="page-hero gradient-bg">
                <div className="home-hero-overlay" />
                <Container className="page-hero-content">
                    <Typography variant="h3" className="home-hero-title">Contact Us</Typography>
                    <Typography variant="body1" className="home-hero-subtitle">Questions, partnerships, or speaking? We’d love to hear from you.</Typography>
                </Container>
            </section>

            <Container className="page-section" style={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container justify="center">
                    <Grid item xs={12} md={8}>
                        <Card className="home-card" style={{ textAlign: 'center', padding: '32px 0' }}>
                            <CardContent>
                                <Typography variant="h5" className="home-card-title">Reach us directly</Typography>
                                <Typography variant="body1" className="home-card-desc" style={{ marginTop: 8 }}>Email: aiclubuwmadison@gmail.com</Typography>
                                <Typography variant="body1" className="home-card-desc">Location: UW–Madison</Typography>
                                <Button style={{ marginTop: 16 }} href="mailto:aiclubuwmadison@gmail.com" color="secondary" variant="outlined">Email us</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <div style={{ margin: '0 1in' }}>
            <Header>
                Contact Us
            </Header>
            <p style={{ fontFamily: "'NeueMontreal-Light', 'Helvetica Neue', sans-serif", fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px', lineHeight: '2', color: '#000' }}>
                Join our <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TTSykcZAg4" style={{ color: '#8b0000', fontWeight: 'normal', textDecoration: 'underline' }}>Discord workspace</a> to communicate with other students, engage with study groups, and coordinate with project group members!
                <br />
                <a target="_blank" rel="noopener noreferrer" href="http://eepurl.com/dMyKlQ" style={{ color: '#8b0000', fontWeight: 'normal', textDecoration: 'underline' }}>Sign up</a> for our email newsletter to stay up-to-date on all AI@UW events!
                <br />
                <a target="_blank" rel="noopener noreferrer" href="mailto:aiclubuwmadison@gmail.com" style={{ color: '#8b0000', fontWeight: 'normal', textDecoration: 'underline' }}>Shoot us an email</a> if you have any questions or if you'd like to reach out to our leadership!
                <br />
                <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?usp=publish-editor" style={{ color: '#8b0000', fontWeight: 'normal', textDecoration: 'underline' }}>Send us your thoughts</a> if there's anything else you want to say, either via the linked form or the submission fields below.
            </p>
            <br/>
            <Grid container xs>
                <Grid item xs>
                    <iframe title="contact-embed" src="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?embedded=true" width="640" height="434" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">Loading…</iframe>
                </Grid>
            </Grid>
            </div>

        </>
    );
}

export default Contact;