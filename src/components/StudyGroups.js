import React from 'react';
import { Typography, Container } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import BodyText from './typographic/BodyText';
import Project from './display/Project';

const StudyGroups = () => {
    return (
        <Container>
            <Header>
                Study Groups
            </Header>
            <Subheader variant="alert-subheader"> Spring-22 Update </Subheader>
            <BodyText>
               Study Groups have temporarily been paused while feedback is gathered and student's preferencees are heard. Pending their resumption, this website will be 
               updated with the new information. For now, the Spring 2019 study groups remain below for your reference.
            </BodyText>
            <hr></hr>
            <Project name= "Deep Learning Study Group">
                This study group will be focusing on working through Andrew Ng’s Deep Learning specialization on Coursera. This study group is a good way to break into the world of AI. In the five courses in the specialization, you will learn the foundations of Deep Learning, understand how to build neural networks, and learn how to lead successful machine learning projects. You will learn about Convolutional networks, RNNs, LSTM, Adam, Dropout, BatchNorm, Xavier/He initialization, and more. You will work on case studies from healthcare, autonomous driving, sign language reading, music generation, and natural language processing. You will master not only the theory, but also see how it is applied in industry. You will practice all these ideas in Python and in TensorFlow, which the courses will teach.
                <ul className="no-bullet-list">
                    <li><b>Time-Commitment:</b> 2-3 hours/week</li>
                    <li><b>Contact Info:</b> #sg-deep-learning on Slack</li>
                    <li><b>Prereqs:</b> Previous experience with basic linear algebra is helpful, but not required</li>
                    <li><b>Meeting time:</b> Tuesdays @ 7:30pm </li>
                </ul>
            </Project>
            <Project name="Causal Architecture Study Group">
                    To effectively engage with the world, AI must reckon with information and causality. Further, the design of
                    innovative artificially intelligent systems may improve by drawing inspiration from the remarkable causal
                    architecture of some of the systems it seeks to imitate: living organisms and conscious minds. As such, we
                    will approach this topic from several vantage points, including converging scientific theories of
                    consciousness and the origin of life. We will assume no prior knowledge and build up the requisite
                    mathematics and information theory as we go. The goal is to explore artificial intelligence as a “causally
                    emergent” phenomena (see Agents Above, Atoms Below) through a discussion of research papers and topic
                    primers.
                <ul className="no-bullet-list">
                    <li><b>Time-Commitment:</b> 0-4 hours/week</li>
                    <li><b>Contact Info:</b> #sg-causal-arch on Slack</li>
                    <li><b>Prereqs:</b> None! Previous experience with probability theory, information theory, and stochastic processes is helpful, but not required </li>
                    <li><b>Meeting time:</b> Wednesdays @ 7:30pm</li>
                </ul>
            </Project>
            <Project name="Introduction to AI Study Group">
                Working through material from the book Artificial Intelligence: A Modern Approach by Russell and Norvig. There will be a decent overlap with the material taught in UW-Madison’s CS 540: Introduction to artificial intelligence, but we won't focus on the programming side of things unless people really want to. Great for people who want a solid conceptual foundation of classical AI techniques
                <ul className="no-bullet-list">
                    <li><b>Time-Commitment:</b> 1-3 hours/week</li>
                    <li><b>Contact Info:</b> #sg-intro-ai on Slack </li>
                    <li><b>Prereqs:</b> Some background in calculus helpful, but no hard prerequisite knowledge requirements </li>
                    <li><b>Meeting time:</b> Sundays @ 6:00pm</li>
                </ul>
            </Project>
            <Project name="Ethical AI Study Group">
                This club-wide study group has been enacted to help the club establish several documents related to ethical guidelines in the tech industry. EVERYONE is encouraged to participate. We are making the slack channel for this group one of the default channels on slack so that as many club members as possible have a chance to respond to our polls. Soon, we will post a document to help summarize a reasonable and agreed upon set of standards to help mitigate risk associated with different platforms/apps/practices. Some of our core topics of interest include:
                <ul>
                    <li>User-Validation: Are bots a risk or not? How difficult is it to detect bots on social media platforms?</li>
                    <li>Algorithm Use: When should open source or complete transparency be encouraged/required</li>
                    <li>Data Use: How transparent should data-use be? What is a reasonable way to communicate such use?</li>
                    <li>Security standards: how can we protect user-data?</li>
                    <li>Model Interpretability: When to avoid black-box models</li>
                    <li>Bias: How to detect and when to intervene - content generators, classifiers</li>
                </ul>
               <ul className="no-bullet-list">
                    <li><b>Time-Commitment:</b> 1-3 hours/week</li>
                    <li><b>Contact Info:</b> #sg-intro-ai on Slack </li>
                    <li><b>Prereqs:</b> Some background in calculus helpful, but no hard prerequisite knowledge requirements </li>
                    <li><b>Meeting time:</b> Sundays @ 6:00pm</li>
                </ul>
            </Project>
        </Container>
    );
}

export default StudyGroups;