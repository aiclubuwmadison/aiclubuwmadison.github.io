import React from 'react';
import { Typography, Container } from '@material-ui/core';

const Home = () => {

    return (
        <Container>
            <Typography variant="h5">
                Home
            </Typography>
            <Typography>
                AI@UW is a student organization at the University of Wisconsin – Madison committed to educating and bringing together students of all backgrounds with an interest in Artificial Intelligence. Artificial intelligence, far from being science fiction, is a technology with the potential to transform the economy and improve our lives. AI@UW aims to build a community at UW around a common interest in Artificial Intelligence. Starting as half a dozen students in the Fall of 2017, we have since attracted over 350 students of all skill levels and backgrounds; from freshmen to grad students, any and all students are welcome to join.
                AI@UW offers regular public events which are the perfect opportunity to learn more about AI or meet others with a shared interest in AI. For members who want to gain experience using machine learning tools or simply want to add to their project portfolios, we always have a number of exciting project groups which you can join. Past project groups have built tools to identify skin tumors using computer vision, predict the movement of the stock market using reinforcement learning, generate novel music using recurrent neural networks, and more! If you don’t have much programming experience or are unfamiliar with machine learning but want to learn more, several study groups meet regularly to discuss topics related to AI or work through MOOC’s together. Past study groups have worked through Andrew Ng’s Machine Learning course, discussed the relationship between neuroscience and AI, and read Sutton’s reinforcement learning textbook. 
            </Typography>
        </Container>
    );
}

export default Home;