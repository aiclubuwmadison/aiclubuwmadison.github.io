import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import ArticleImage from './display/ArticleImage';
import SubmissionBox from './SubmissionBox';

const Contact = () => {

    return (
        <Container>
            <Header>
                Contact Us
            </Header>
            <Subheader>
                &bull; Join our <a className="link-text" target="_blank" href="https://wisconsinai.slack.com">Slack workspace</a> to communicate with other students, engage with study groups, and coordinate with project group members!
            </Subheader>
            <Subheader>
                &bull; <a className="link-text" target="_blank" href="http://eepurl.com/dMyKlQ">Sign up</a> for our email newsletter to stay up-to-date on all AI@UW events!
            </Subheader>
            <Subheader>
                &bull; <a className="link-text" target="_blank" href="mailto:aiclubuwmadison@gmail.com">Shoot us an email</a> if you have any questions or if you'd like to reach out to our leadership!
            </Subheader>
            <Subheader>
                &bull; <a className="link-text" target="_blank" href="https://forms.gle/cKfuybyBQzv9vc8d8">Send us your thoughts</a> if there's anything else you want to say, either via the linked form or the submission fields below.
            </Subheader>
            <br/>
            <Grid container xs>
                <Grid item xs>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdNX40SfpC-WOpe6rg56338ZD5-YaNeuTeb0B2Y5cVoZPW8tw/viewform?embedded=true" width="640" height="434" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">Loading…</iframe>
                </Grid>
            </Grid>
            <br></br>
            <ArticleImage file="sem3.jpg" caption="Our 2019 kickoff meeting"/>
        </Container>
    );
}

export default Contact;