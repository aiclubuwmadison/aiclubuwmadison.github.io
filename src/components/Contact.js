import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Button, TextField } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import ArticleImage from './display/ArticleImage';

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

            <Container className="page-section">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card className="home-card">
                            <CardContent>
                                <Typography variant="h6" className="home-card-title">Send a message</Typography>
                                <form className="contact-form" onSubmit={(e)=>e.preventDefault()}>
                                    <TextField fullWidth variant="outlined" label="Name" margin="dense" />
                                    <TextField fullWidth variant="outlined" label="Email" type="email" margin="dense" />
                                    <TextField fullWidth variant="outlined" label="Message" margin="dense" multiline rows={5} />
                                    <Button style={{ marginTop: 8 }} variant="contained" color="primary" type="submit">Send</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className="home-card">
                            <CardContent>
                                <Typography variant="h6" className="home-card-title">Reach us directly</Typography>
                                <Typography variant="body2" className="home-card-desc">Email: aiclubuwmadison@gmail.com</Typography>
                                <Typography variant="body2" className="home-card-desc">Location: UW–Madison</Typography>
                                <Button style={{ marginTop: 8 }} href="mailto:aiclubuwmadison@gmail.com" color="secondary" variant="outlined">Email us</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Header>
                Contact Us
            </Header>
            <Subheader>
                &bull; Join our <a className="link-text" target="_blank" rel="noopener noreferrer" href="https://discord.gg/TTSykcZAg4"> Discord workspace</a> to communicate with other students, engage with study groups, and coordinate with project group members!
            </Subheader>
            <Subheader>
                &bull; <a className="link-text" target="_blank" rel="noopener noreferrer" href="http://eepurl.com/dMyKlQ">Sign up</a> for our email newsletter to stay up-to-date on all AI@UW events!
            </Subheader>
            <Subheader>
                &bull; <a className="link-text" target="_blank" rel="noopener noreferrer" href="mailto:aiclubuwmadison@gmail.com">Shoot us an email</a> if you have any questions or if you'd like to reach out to our leadership!
            </Subheader>
            <Subheader>
                &bull; <a className="link-text" target="_blank" rel="noopener noreferrer" href="https://forms.gle/cKfuybyBQzv9vc8d8">Send us your thoughts</a> if there's anything else you want to say, either via the linked form or the submission fields below.
            </Subheader>
            <br/>
            <Grid container xs>
                <Grid item xs>
                    <iframe title="contact-embed" src="https://docs.google.com/forms/d/e/1FAIpQLSdNX40SfpC-WOpe6rg56338ZD5-YaNeuTeb0B2Y5cVoZPW8tw/viewform?embedded=true" width="640" height="434" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">Loading…</iframe>
                </Grid>
            </Grid>
            <br></br>
            {/* <ArticleImage file="sem3.jpg" caption="Our 2019 kickoff meeting"/> */}
            <ArticleImage file="amfam2.jpg" caption="Our 2024 Fireside Chat Night w/ American Family Insurance (AmFam)" />

        </>
    );
}

export default Contact;