import React, { useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import Header from './typographic/Header';
import BodyText from './typographic/BodyText';
import Subheader from './typographic/Subheader';
import ArticleImage from './display/ArticleImage';

let slideIndex;

const showSlides = () => {
    slideIndex = slideIndex ? slideIndex : 0;
    var i;
    var slides = document.getElementsByClassName("slide-item");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if(slides.length === 0) return;

    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000);
};

const About = () => {
    useEffect(()=> {
        slideIndex = 0;
        showSlides();
    });

    return (
        <Container>
            <Header>
                About Us
            </Header>
            <Subheader> Who We Are</Subheader>
            <BodyText>
                AI@UW is a student organization at the University of Wisconsin-Madison. We aim to build a community of students from all backgrounds united by a shared interest in AI. Starting as just 7 undergrads in 2017, we have since expanded our reach to over 500 undergrads, graduate students, and faculty. We pride ourselves on our interdisciplinary approach to learning and building -- people of all backgrounds and academics interests have a place in our organization.            </BodyText>
            <Subheader> What We Do</Subheader>
            <BodyText>
                AI@UW offers regular public events which are the perfect opportunity to learn more about AI or meet others with a shared interest in AI. For members who want to gain experience using machine learning tools or simply want to add to their project portfolios, we always have a number of exciting project groups which you can join. Past project groups have built tools to identify skin tumors using computer vision, predict the movement of the stock market using reinforcement learning, generate novel music using recurrent neural networks, and more! If you don’t have much programming experience or are unfamiliar with machine learning but want to learn more, several study groups meet regularly to discuss topics related to AI or work through MOOC’s together. Past study groups have worked through Andrew Ng’s Machine Learning course, discussed the relationship between neuroscience and AI, and read Sutton’s reinforcement learning textbook.
            </BodyText>
            <div class="slideshow-container">
                <div class="slide-item fade">
                    <img src="images/logos/google.png" height={150} alt="Google"/>
                </div>
                <div class="slide-item fade">
                    <img src="images/logos/facebook.png" height={150} alt="Facebook"/>
                </div>
                <div class="slide-item fade">
                    <img src="images/logos/stanford.png" height={150} alt="Stanford"/>
                </div>
                <div class="slide-item fade">
                    <img src="images/logos/amazon.png" height={150} alt="Amazon"/>
                </div>
                <div class="slide-item fade">
                    <img src="images/logos/acm.png" height={150} alt="ACM"/>
                </div>
            </div>
            <br/>
            <div 
                style={{
                    textAlign: "center",
                }}
            >
                <span class="dot"></span> 
                <span class="dot"></span> 
                <span class="dot"></span> 
                <span class="dot"></span> 
                <span class="dot"></span> 
            </div>

            <BodyText>
                We are committed to building an excellent community for the members of the AI club. Should you join us, you will join a group of driven individuals
                and form relationships with your fellow AI club members that will last a lifetime. Please <a className="link-text" href="mailto:aiclubuwmadison@gmail.com">contact us</a> if you have any questions.
            </BodyText>

            <ArticleImage file="sem2.jpg" caption="Our 2019 kick-off seminar" />
        </Container>
    );
}

export default About;