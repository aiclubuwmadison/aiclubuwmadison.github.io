import { useEffect } from 'react';
import { Container } from '@mui/material';
import BodyText from './typographic/BodyText';
import Subheader from './typographic/Subheader';
import './About.css';

let slideIndex;

const showSlides = () => {
  slideIndex = slideIndex ? slideIndex : 0;
  let i;
  const slides = document.getElementsByClassName('slide-item');
  const dots = document.getElementsByClassName('dot');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }

  if (slides.length === 0) return;

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
  setTimeout(showSlides, 4000);
};

const About = () => {
  useEffect(() => {
    slideIndex = 0;
    showSlides();
  }, []);

  return (
    <div className="atmos-root atmos-about">
      <div className="atmos-shell">
        <Container className="about-page">
          <div className="atmos-about-meta atmos-reveal">
            <span className="atmos-about-meta-left">
              <span className="atmos-dot" />
              <span>About</span>
            </span>
            <span className="atmos-hero-meta-index">i. who we are &amp; what we do</span>
          </div>

          <h1 className="atmos-about-title atmos-reveal atmos-d2">
            A community for <em>everyone</em><br />curious about AI.
          </h1>

          <p className="atmos-about-lede atmos-reveal atmos-d3">
            Built by students, open to every discipline — from CS to the humanities.
          </p>

          <section className="atmos-about-section">
            <header className="atmos-about-section-head">
              <span className="atmos-about-section-num">01 / Origin</span>
              <h2 className="atmos-about-section-title">
                Who <em>we are</em>
              </h2>
              <div className="atmos-about-aside">
                Est. 2017
                <em>Seven undergrads. Now over two thousand.</em>
              </div>
            </header>
            <div className="atmos-about-section-body">
              <Subheader>Who We Are</Subheader>
              <BodyText>
                AI@UW is the largest Artificial Intelligence club at UW-Madison. We aim to build a community of students from all backgrounds united by a shared interest in AI. Starting as just 7 undergrads in 2017 by Chris Endermann, we have since expanded our reach to over 2000 undergrads, graduate students, and faculty. We pride ourselves on our interdisciplinary approach to learning and building - people of all backgrounds and academic interests have a place in our organization.
              </BodyText>
            </div>
          </section>

          <section className="atmos-about-section">
            <header className="atmos-about-section-head">
              <span className="atmos-about-section-num">02 / Practice</span>
              <h2 className="atmos-about-section-title">
                What <em>we do</em>
              </h2>
              <div className="atmos-about-aside">
                Project teams &middot; Research &middot; Workshops
                <em>Theory and application, side by side.</em>
              </div>
            </header>
            <div className="atmos-about-section-body">
              <Subheader>What We Do</Subheader>
              <BodyText>
                AI@UW is a vibrant, interdisciplinary community where students from all fields-computer science, engineering, life sciences, business, humanities, and more-collaborate to explore, innovate, and apply artificial intelligence. We organize hands-on project teams, research groups, and workshops covering the full spectrum of AI: machine learning, deep learning, natural language processing, computer vision, robotics, ethics, and societal impact. Our members tackle real-world challenges in healthcare, finance, sustainability, art, and beyond, often partnering with faculty and industry leaders. We also host study groups for AI courses, journal clubs, and events that bridge technical skills with critical thinking about AI’s role in society. Whether you’re a beginner or an expert, interested in theory or application, AI@UW welcomes you to learn, create, and lead in the future of AI.
              </BodyText>
              <BodyText>
                We are committed to building an excellent community for the members of the AI club. Should you join us, you will join a group of driven individuals and form relationships with your fellow AI club members that will last a lifetime. Please <a className="link-text" href="mailto:aiclubuwmadison@gmail.com">contact us</a> if you have any questions.
              </BodyText>
            </div>
          </section>

          <div className="atmos-about-foot">
            <span>AI@UW &middot; Madison, WI</span>
            <span className="atmos-pag">
              <em>about &mdash; 01 / 05</em>
            </span>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default About;
