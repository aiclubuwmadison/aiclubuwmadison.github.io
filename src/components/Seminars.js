import React from 'react';
import { Typography, Container } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import BodyText from './typographic/BodyText';
import Seminar from './display/Seminar';

const Seminars = () => {

    return (
        <Container>
            <Header>
                Past Seminars
            </Header>
            <Seminar
                file="matthewBanks.jpg"
                date="February 20th in CS 1240"
                title="Matthew Banks | Great Expectations: The Neurobiology of Predictive Processing"
            >
                We bring expectations to every moment of experience, and those expectations color how that experience
                unfolds. How does that happen in the brain? Evidence suggests that brains implement predictive processing
                schemes, making use of neural circuitry to implement predictive coding in the service of efficiency. Yet the
                evidence is largely circumstantial, and fundamental questions remain open. I will present some of the
                evidence from my lab and others' for predictive processing in the brain, and show how we are exploring the
                relationship between predictive processing and consciousness.
            </Seminar>
            <Seminar
                file="billHibbard.jpg"
                date="March 13th in CS 1240"
                title="Bill Hibbard | Coming of Age with AI"
            >
                Technology changes constantly and rapidly. A technology career requires lifelong learning. Constant change
                enables new uses of technology and career opportunities for those who develop those uses. Recently computers
                have become powerful enough to make artificial neural networks useful, enabling many new applications. AI
                and automation are transforming labor markets, AI is transforming medicine, warfare and other fields, and AI
                connected via the Internet to billions of people is transforming society. There is a good chance of reaching
                human-level AI, and beyond, within the next few decades, which will greatly accelerate these
                transformations. AI students in 2019 will be part of these transformations and will be at the center of the
                political storm they create. AI developers will need a clear understanding of what they value to weather the
                storm. This will be a short talk followed by a longer open discussion.
            </Seminar>
            <Seminar
                file="josephAusterweil.jpg"
                date="April 10th in CS 1240"
                title="Joe Austerweil | Do people teach others as if they are reinforcement learners?"
            >
                Humans teach others in a variety of ways. Although people often teach others through verbal description,
                people also
                teach using nonverbal means. For example, a parent might punish their child for not taking off her muddy
                shoes before
                walking on the carpet. Or, a baseball pitching coach might teach a new type of pitch by demonstrating the
                sequence of
                arm and leg movements to produce it. In this talk, I will discuss three different forms of nonverbal
                teaching: teaching
                by evaluative feedback (or reinforcement), teaching by demonstration, and teaching by intervention. In all
                three cases,
                I will present evidence that teachers expect learners to interpret nonverbal teaching as communication. I
                will discuss
                implications for artificial intelligence and machine learning research, where reward-maximizing is often an
                assumption
                of the model.
            </Seminar>
        </Container>
    );
}

export default Seminars;