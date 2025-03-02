import React, {useState} from 'react';
import { Typography, Collapse, Container } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import BodyText from './typographic/BodyText';
import Project from './display/Project';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    expandableRow: { // Dynamic(past ldrship) row style.
        cursor: 'pointer',
        padding: theme.spacing(2),
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: '#F1F1F1',
        '&:hover': {
            backgroundColor: '#EEEDED',
        },
    },
    staticRow: { // Static row style.
        padding: theme.spacing(2),
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
}));


const StudyGroups = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [arrowDirection, setArrowDirection] = useState('►');

    const handleToggle = () => {
        setExpanded(!expanded);
        setArrowDirection(prevDirection => (prevDirection === '►' ? '▼' : '►'));
    };

    return (
        <Container>
            <Header>
                Study Groups
            </Header>
            <Subheader variant="alert-subheader"> Spring-25 Update </Subheader>
            <BodyText>
                No active study groups
               {/* Study Groups have temporarily been paused while feedback is gathered and student's preferencees are heard. Pending their resumption, this website will be 
               updated with the new information. For now, the Spring 2019 study groups remain below for your reference. */}
            </BodyText>

            <div className={classes.expandableRow} onClick={handleToggle}>
                <Typography variant="h6">
                    Past Study Groups {arrowDirection}
                </Typography>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Project name= "Deep Learning Study Group">
                This study group will be working through online deep learning courses, such as Andrew Ng’s Deep Learning specialization on Coursera. If you want to break into the world of AI or are already working on an online course of interest, this study group will be a place for you to collaborate, find answers to questions, and help others learn more effectively. The Deep Learning Specialization on Coursera is the recommended starting point for beginners. In the five courses in this specialization, you will learn the foundations of deep learning, learn to optimize and improve your deep learning models, practice structuring and successfully leading machine learning projects, and learn to build convolutional neural networks as well as RNN and LSTM sequence models. You will work on case studies from healthcare, autonomous driving, sign language reading, music generation, and natural language processing. You will not only master theory but also understand how it is applied in the industry. You will implement these ideas using the Python programming language and TensorFlow framework, which the courses will teach.
                    <ul className="no-bullet-list">
                        <li><b>Time-Commitment:</b> 2-4 hours/week</li>
                        <li><b>Contact Info:</b> #sg-deep-learning on Slack</li>
                        <li><b>Prereqs:</b> Previous experience with basic linear algebra and derivatives is helpful, but not required.</li>
                        <li><b>Meeting time:</b> Wednesdays and Saturdays @ 6:00 pm </li>
                        <li><b>Meeting Location: Union South: 1308 W Dayton St, Madison, WI 53715 (meeting room will be released on Slack in advance of each meeting)</b></li>
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
            </Collapse>
            
        </Container>
    );
}

export default StudyGroups;