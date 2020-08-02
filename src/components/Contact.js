import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import ArticleImage from './display/ArticleImage';

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
                &bull; <a className="link-text" target="_blank" href="http://eepurl.com/dMyKlQ">Sign up</a> for our email newsletter to stay up-to-date on all AI @ UW events!
            </Subheader>
            <Subheader>
                &bull; <a className="link-text" target="_blank" href="mailto:aiclubuwmadison@gmail.com">Shoot us an email</a> if you have any questions or if you'd like to reach out to our leadership!
            </Subheader>
            <br></br>
            <ArticleImage file="sem3.jpg" caption="Our 2019 kickoff meeting"/>
        </Container>
    );
}

export default Contact;