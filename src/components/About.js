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
            <BodyText>AI@UW is a student organization at the University of Wisconsin-Madison. We aim to build a community of students from all backgrounds united 
                by a shared interest in AI. Starting as just 7 undergrads in 2017, we have since expanded our reach to over 500 undergrads, graduate students, 
                and faculty. We pride ourselves on our interdisciplinary approach to learning and building -- people of all backgrounds and academic interests 
                have a place in our organization.</BodyText>
            <Subheader> What We Do</Subheader>
            <BodyText>AI@UW focuses on organizing groups for interested students to work on AI projects or to research AI topics. Members who want to gain 
                experience using machine learning tools or simply want to add to their project portfolios will benefit from joining this organization. Past 
                project groups have built tools to identify skin tumors using computer vision, predict the movement of the stock market using reinforcement 
                learning, generate novel music using recurrent neural networks, and more! We also help students organize study groups for AI related classes. 
                Past study groups have worked through Andrew Ng’s Machine Learning course, discussed the relationship between neuroscience and AI, and read 
                utton’s reinforcement learning textbook. It doesn't matter where you're at with background knowledge or experience. So long as you have an 
                interest in AI, we welcome you with open arms!</BodyText>
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

            <Subheader> 2021 Kickoff Recording </Subheader>

            <div className="image-container">
                <div className="image">
                    <video controls width="100%">
                        <source src={`${process.env.PUBLIC_URL}/videos/zoom_0.mp4`} type="video/mp4"/>
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                    <div className="image-caption">
                        <BodyText>
                            Recording of our 2021 virtual kickoff
                        </BodyText>
                    </div>
                </div>
            </div>

            {/* <ArticleImage files={["FiresideChat AmFam 24'(1).jpg", "sem2.jpg",]} captions={["Our 2024 Fireside Chat Night w/ American Family Insurance (AmFam)", "Our 2019 kick-off seminar"]}/> */}
            {/* <ArticleImage file="sem2.jpg" caption="Our 2019 kick-off seminar" /> */}
            <ArticleImage file="amfam1.jpg" caption="Our 2024 Fireside Chat Night w/ American Family Insurance (AmFam)" />

        </Container>
    );
}

export default About;