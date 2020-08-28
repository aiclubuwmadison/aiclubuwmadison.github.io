import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import BodyText from './typographic/BodyText';
import FAQ from '../components/FAQ';

const Involvement = () => {

    return (
        <>
            <Container>
                <Header>
                    Involvement
                </Header>
                <BodyText>
                    We have the following positions available for members to choose from. Feel free to post any questions to our Slack channel, #fyi-help, if you can’t find your question on our Q&A page.
                </BodyText>
                <hr></hr>
                <Subheader> Executive </Subheader>
                <BodyText>
                    <p>Far from just a resume booster, this is a great opportunity to:
                    <ul>
                        <li>Work with other students who share your passion for AI research/technology</li>
                        <li>Make connections in industry and research</li>
                        <li>Contribute to something larger than yourself and leave your mark at UW-Madison</li>
                    </ul>
                    <h4>Responsibilities</h4>
                    If you're part of the exec team, you're part of shaping the org. As one of our club's leaders, you'll be expected to
                    bring new ideas to our regular meetings that help contribute to:
                    <ul>
                        <li>AI-related learning opportunities (e.g. assisting project managers and study group leaders)</li>
                        <li>Events (e.g. recruiting guest speakers, helping organize contests)</li>
                        <li>Club content/growth (flyers/newsletters, posting to community FYI channels, etc.).</li>
                    </ul>
                    <h4>Qualifications</h4>
                    It is not necessary to be an expert in AI--just a student who wants to see their ideas realized with the help of an
                    awesome team of fellow volunteers.
                    <h4>Application Instructions</h4>
                    If interested, please email us at <a href="mailto:aiclubuwmadison@gmail.com">aiclubuwmadison@gmail.com</a> with a resume/CV and brief note (5-10 sentences) explaining
                    how/why you would make a great addition to our team.</p>
                </BodyText>

                <Subheader> Engineering Group Leader </Subheader>
                <BodyText>
                    <p>Run your own engineering team to build the project of your dreams. Email us your project proposal today at <a href="mailto:aiclubuwmadison@gmail.com">aiclubuwmadison@gmail.com</a></p>
                </BodyText>
                
                <Subheader> Study Group Leader </Subheader>
                <BodyText>
                    <p>Want to study an AI/ML related topic more in-depth with others who share your interests? Email us a study group suggestion at aiclubuwmadison@gmail.com for permission to start your own group. This is a great opportunity if you want to work through a particular coursera course, start a paper-discussion group, or just find others interested in learning more about a specific research topic.</p>
                </BodyText>
                
                <Subheader> Engineer </Subheader>
                <BodyText>
                    <p>Join an engineering team to work on an epic AI project.</p>
                </BodyText>

                <Subheader> Student </Subheader>
                <BodyText>
                    <p>Join a study-group team to learn more about a specific AI/ML topic.</p>
                </BodyText>

                <Subheader> Mentor </Subheader>
                <BodyText>
                    <p>You’re a person with AI expertise and want to pass the baton forward. Mentors are expected to contribute a tutorial/workshop talk to the club’s seminar series.</p>
                </BodyText>
            </Container>
            <FAQ/>
        </>
    );
}

export default Involvement;