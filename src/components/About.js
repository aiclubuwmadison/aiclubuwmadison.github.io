import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
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
        <>
            {/* Modern page hero */}
           

            <Container className="about-page">
                <Subheader> Who We Are</Subheader>
                <BodyText>AI@UW is the largest computer Science student organization at the University of Wisconsin-Madison. We aim to build a community of students from all backgrounds united by a shared interest in AI. Starting as just 7 undergrads in 2017 by Chris Endermann, we have since expanded our reach to over 2000 undergrads, graduate students, and faculty. We pride ourselves on our interdisciplinary approach to learning and building -- people of all backgrounds and academic interests have a place in our organization.</BodyText>
                <Subheader> What We Do</Subheader>
                <BodyText>
                AI@UW is a vibrant, interdisciplinary community where students from all fields—computer science, engineering, life sciences, business, humanities, and more—collaborate to explore, innovate, and apply artificial intelligence. We organize hands-on project teams, research groups, and workshops covering the full spectrum of AI: machine learning, deep learning, natural language processing, computer vision, robotics, ethics, and societal impact. Our members tackle real-world challenges in healthcare, finance, sustainability, art, and beyond, often partnering with faculty and industry leaders. We also host study groups for AI courses, journal clubs, and events that bridge technical skills with critical thinking about AI’s role in society. Whether you’re a beginner or an expert, interested in theory or application, AI@UW welcomes you to learn, create, and lead in the future of AI.
                </BodyText>
                <div className="slideshow-container">
                    <div className="slide-item fade">
                        <img src="images/logos/google.png" height={150} alt="Google"/>
                    </div>
                    <div className="slide-item fade">
                        <img src="images/logos/facebook.png" height={150} alt="Facebook"/>
                    </div>
                    <div className="slide-item fade">
                        <img src="images/logos/stanford.png" height={150} alt="Stanford"/>
                    </div>
                    <div className="slide-item fade">
                        <img src="images/logos/amazon.png" height={150} alt="Amazon"/>
                    </div>
                    <div className="slide-item fade">
                        <img src="images/logos/acm.png" height={150} alt="ACM"/>
                    </div>
                </div>
                <br/>
                <div style={{ textAlign: 'center' }}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>

                <BodyText>
                    We are committed to building an excellent community for the members of the AI club. Should you join us, you will join a group of driven individuals and form relationships with your fellow AI club members that will last a lifetime. Please <a className="link-text" href="mailto:aiclubuwmadison@gmail.com">contact us</a> if you have any questions.
                </BodyText>

                <Subheader> Recent Industry Partnerships and visits </Subheader>

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
        </>
    );
}

export default About;