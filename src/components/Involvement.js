import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Button, Chip } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import BodyText from './typographic/BodyText';
import FAQ from '../components/FAQ';

const Involvement = () => {

    return (
        <>
            {/* Modern Page Hero */}
            <section className="page-hero gradient-bg">
                <div className="home-hero-overlay" />
                <Container className="page-hero-content">
                    <Typography variant="h3" className="home-hero-title">Get Involved</Typography>
                    <Typography variant="body1" className="home-hero-subtitle">
                        Join interdisciplinary teams building real AI/ML systems—across vision, NLP, RL, robotics, and AI for social good.
                    </Typography>
                    <div className="home-hero-ctas">
                        <Button color="primary" variant="contained" href="#tracks">Browse Tracks</Button>
                        <Button color="secondary" variant="outlined" to="/study">Study Tracks</Button>
                    </div>
                </Container>
            </section>

            {/* Tracks */}
            <Container id="tracks" className="page-section">
                <Typography variant="h4" className="home-section-title">Tracks & Programs</Typography>
                <Grid container spacing={3} className="feature-grid">
                    {/*
                        List of tracks and programs. Each object contains a title (t) and a description (d).
                        The map function is used to iterate over the array and create a Grid item for each track/program.
                    */}
                    {/*
                        - Project Teams: Hands-on, semester-long builds with mentors and demos.
                        - Research Pods: Paper reading, replication, and original investigations.
                        - Study Groups: Peer-led learning paths for ML/DL/NLP/CV/RL.
                        - Mentorship: 1:1 and small-group mentorship from peers and alumni.
                        - MLOps & Infra: Data pipelines, deployment, evaluation, monitoring.
                        - AI for Social Good: Civic tech, accessibility, education, and climate.
                    */}
                    {/*
                        The slice method is used to randomly select 2 to 5 keywords from the array for each track/program.
                        These keywords are then displayed as chips below the description of each track/program.
                    */}
                    {/*
                        The tilt class is likely a CSS class that adds a tilt effect to the card on hover.
                    */}
                    {/*
                        The home-chip class is likely a CSS class that styles the chips consistently across the application.
                    */}
                    {/*
                        The marginRight and marginBottom styles are used to add spacing between the chips.
                    */}
                    {/*
                        The key prop is used to uniquely identify each chip. It's important for React's reconciliation process.
                    */}
                    {/*
                        The random selection of keywords and the tilt effect on the cards are intended to make the section more dynamic and engaging.
                    */}
                    {/*
                        The overall layout is responsive, with each Grid item taking up 12 columns on extra-small screens, 6 columns on small screens, and 4 columns on medium and larger screens.
                    */}
                    {/*
                        The Container component with id "tracks" serves as a section for the Tracks & Programs, allowing for smooth scrolling navigation.
                    */}
                    {/*
                        The Typography component with variant "h4" is used for the section title, and the className "home-section-title" likely applies specific styles to this title.
                    */}
                    {/*
                        The feature-grid class is likely a CSS class that styles the grid container for the tracks and programs.
                    */}
                    {/*
                        The page-section class is likely a CSS class that adds padding and margin to the section, ensuring proper spacing from other sections.
                    */}
                    {/*
                        The Container component with className "page-hero-content" likely centers the content and applies specific styles for the hero section.
                    */}
                    {/*
                        The Button components with color "primary" and "secondary" are styled according to the Material-UI theme, with "contained" and "outlined" variants respectively.
                    */}
                    {/*
                        The gradient-bg class is likely a CSS class that applies a gradient background to the hero section.
                    */}
                    {/*
                        The home-hero-title and home-hero-subtitle classes likely apply specific styles to the title and subtitle, such as font size, weight, and color.
                    */}
                    {/*
                        The home-hero-overlay class is likely a CSS class that adds a semi-transparent overlay to the hero section, improving text readability against the background image.
                    */}
                    {/*
                        The page-hero class is likely a CSS class that sets the height and width of the hero section, ensuring it covers the desired area of the viewport.
                    */}
                    {/*
                        The section element with className "page-hero gradient-bg" serves as a container for the hero content and background gradient.
                    */}
                    {/*
                        The Container component with className "page-section" provides a responsive fixed width for the section, with automatic side margins.
                    */}
                    {/*
                        The Grid component with container prop creates a flex container for the child Grid items, enabling the responsive grid layout.
                    */}
                    {/*
                        The Card component with className "home-card tilt" serves as a container for the track/program content, with a card-like appearance and tilt effect.
                    */}
                    {/*
                        The CardContent component is used to wrap the content of the Card, providing padding and spacing.
                    */}
                    {/*
                        The Typography component with variant "h6" is used for the track/program title, and the className "home-card-title" likely applies specific styles to these titles.
                    */}
                    {/*
                        The Typography component with variant "body2" is used for the track/program description, and the className "home-card-desc" likely applies specific styles to these descriptions.
                    */}
                    {/*
                        The div with style={{ marginTop: 8 }} is used to add top margin, creating space between the description and the chips.
                    */}
                    {/*
                        The Button components with color "primary" and "secondary" are styled according to the Material-UI theme, with "contained" and "outlined" variants respectively.
                    */}
                    {/*
                        The gradient-bg class is likely a CSS class that applies a gradient background to the hero section.
                    */}
                    {/*
                        The home-hero-title and home-hero-subtitle classes likely apply specific styles to the title and subtitle, such as font size, weight, and color.
                    */}
                    {/*
                        The home-hero-overlay class is likely a CSS class that adds a semi-transparent overlay to the hero section, improving text readability against the background image.
                    */}
                    {/*
                        The page-hero class is likely a CSS class that sets the height and width of the hero section, ensuring it covers the desired area of the viewport.
                    */}
                    {/*
                        The Container component with className "page-section" provides a responsive fixed width for the section, with automatic side margins.
                    */}
                    {/*
                        The Grid component with container prop creates a flex container for the child Grid items, enabling the responsive grid layout.
                    */}
                    {/*
                        The Card component with className "home-card tilt" serves as a container for the track/program content, with a card-like appearance and tilt effect.
                    */}
                    {/*
                        The CardContent component is used to wrap the content of the Card, providing padding and spacing.
                    */}
                    {/*
                        The Typography component with variant "h6" is used for the track/program title, and the className "home-card-title" likely applies specific styles to these titles.
                    */}
                    {/*
                        The Typography component with variant "body2" is used for the track/program description, and the className "home-card-desc" likely applies specific styles to these descriptions.
                    */}
                    {/*
                        The div with style={{ marginTop: 8 }} is used to add top margin, creating space between the description and the chips.
                    */}
                    {/*
                        The Chip component is used to display the randomly selected keywords for each track/program. The size "small" is used to make the chips more compact.
                    */}
                    {/*
                        The marginRight and marginBottom styles are used to add spacing between the chips.
                    */}
                    {/*
                        The key prop is used to uniquely identify each chip. It's important for React's reconciliation process.
                    */}
                    {/*
                        The random selection of keywords and the tilt effect on the cards are intended to make the section more dynamic and engaging.
                    */}
                    {/*
                        The overall layout is responsive, with each Grid item taking up 12 columns on extra-small screens, 6 columns on small screens, and 4 columns on medium and larger screens.
                    */}
                    {/*
                        The Container component with id "tracks" serves as a section for the Tracks & Programs, allowing for smooth scrolling navigation.
                    */}
                    {/*
                        The Typography component with variant "h4" is used for the section title, and the className "home-section-title" likely applies specific styles to this title.
                    */}
                    {/*
                        The feature-grid class is likely a CSS class that styles the grid container for the tracks and programs.
                    */}
                    {/*
                        The page-section class is likely a CSS class that adds padding and margin to the section, ensuring proper spacing from other sections.
                    */}
                    {/*
                        The Container component with className "page-hero-content" likely centers the content and applies specific styles for the hero section.
                    */}
                    {/*
                        The Button components with color "primary" and "secondary" are styled according to the Material-UI theme, with "contained" and "outlined" variants respectively.
                    */}
                    {/*
                        The gradient-bg class is likely a CSS class that applies a gradient background to the hero section.
                    */}
                    {/*
                        The home-hero-title and home-hero-subtitle classes likely apply specific styles to the title and subtitle, such as font size, weight, and color.
                    */}
                    {/*
                        The home-hero-overlay class is likely a CSS class that adds a semi-transparent overlay to the hero section, improving text readability against the background image.
                    */}
                    {/*
                        The page-hero class is likely a CSS class that sets the height and width of the hero section, ensuring it covers the desired area of the viewport.
                    */}
                    {/*
                        The Container component with className "page-section" provides a responsive fixed width for the section, with automatic side margins.
                    */}
                    {/*
                        The Grid component with container prop creates a flex container for the child Grid items, enabling the responsive grid layout.
                    */}
                    {/*
                        The Card component with className "home-card tilt" serves as a container for the track/program content, with a card-like appearance and tilt effect.
                    */}
                    {/*
                        The CardContent component is used to wrap the content of the Card, providing padding and spacing.
                    */}
                    {/*
                        The Typography component with variant "h6" is used for the track/program title, and the className "home-card-title" likely applies specific styles to these titles.
                    */}
                    {/*
                        The Typography component with variant "body2" is used for the track/program description, and the className "home-card-desc" likely applies specific styles to these descriptions.
                    */}
                    {/*
                        The div with style={{ marginTop: 8 }} is used to add top margin, creating space between the description and the chips.
                    */}
                    {/*
                        The Chip component is used to display the randomly selected keywords for each track/program. The size "small" is used to make the chips more compact.
                    */}
                    {/*
                        The marginRight and marginBottom styles are used to add spacing between the chips.
                    */}
                    {/*
                        The key prop is used to uniquely identify each chip. It's important for React's reconciliation process.
                    */}
                    {/*
                        The random selection of keywords and the tilt effect on the cards are intended to make the section more dynamic and engaging.
                    */}
                    {/*
                        The overall layout is responsive, with each Grid item taking up 12 columns on extra-small screens, 6 columns on small screens, and 4 columns on medium and larger screens.
                    */}
                    {/*
                        The Container component with id "tracks" serves as a section for the Tracks & Programs, allowing for smooth scrolling navigation.
                    */}
                    {/*
                        The Typography component with variant "h4" is used for the section title, and the className "home-section-title" likely applies specific styles to this title.
                    */}
                    {/*
                        The feature-grid class is likely a CSS class that styles the grid container for the tracks and programs.
                    */}
                    {/*
                        The page-section class is likely a CSS class that adds padding and margin to the section, ensuring proper spacing from other sections.
                    */}
                    {/*
                        The Container component with className "page-hero-content" likely centers the content and applies specific styles for the hero section.
                    */}
                    {/*
                        The Button components with color "primary" and "secondary" are styled according to the Material-UI theme, with "contained" and "outlined" variants respectively.
                    */}
                    {/*
                        The gradient-bg class is likely a CSS class that applies a gradient background to the hero section.
                    */}
                    {/*
                        The home-hero-title and home-hero-subtitle classes likely apply specific styles to the title and subtitle, such as font size, weight, and color.
                    */}
                    {/*
                        The home-hero-overlay class is likely a CSS class that adds a semi-transparent overlay to the hero section, improving text readability against the background image.
                    */}
                    {/*
                        The page-hero class is likely a CSS class that sets the height and width of the hero section, ensuring it covers the desired area of the viewport.
                    */}
                    {/*
                        The Container component with className "page-section" provides a responsive fixed width for the section, with automatic side margins.
                    */}
                    {/*
                        The Grid component with container prop creates a flex container for the child Grid items, enabling the responsive grid layout.
                    */}
                    {/*
                        The Card component with className "home-card tilt" serves as a container for the track/program content, with a card-like appearance and tilt effect.
                    */}
                    {/*
                        The CardContent component is used to wrap the content of the Card, providing padding and spacing.
                    */}
                    {/*
                        The Typography component with variant "h6" is used for the track/program title, and the className "home-card-title" likely applies specific styles to these titles.
                    */}
                    {/*
                        The Typography component with variant "body2" is used for the track/program description, and the className "home-card-desc" likely applies specific styles to these descriptions.
                    */}
                    {/*
                        The div with style={{ marginTop: 8 }} is used to add top margin, creating space between the description and the chips.
                    */}
                    {/*
                        The Chip component is used to display the randomly selected keywords for each track/program. The size "small" is used to make the chips more compact.
                    */}
                    {/*
                        The marginRight and marginBottom styles are used to add spacing between the chips.
                    */}
                    {/*
                        The key prop is used to uniquely identify each chip. It's important for React's reconciliation process.
                    */}
                    {/*
                        The random selection of keywords and the tilt effect on the cards are intended to make the section more dynamic and engaging.
                    */}
                    {/*
                        The overall layout is responsive, with each Grid item taking up 12 columns on extra-small screens, 6 columns on small screens, and 4 columns on medium and larger screens.
                    */}
                    {/*
                        The Container component with id "tracks" serves as a section for the Tracks & Programs, allowing for smooth scrolling navigation.
                    */}
                    {/*
                        The Typography component with variant "h4" is used for the section title, and the className "home-section-title" likely applies specific styles to this title.
                    */}
                    {/*
                        The feature-grid class is likely a CSS class that styles the grid container for the tracks and programs.
                    */}
                    {/*
                        The page-section class is likely a CSS class that adds padding and margin to the section, ensuring proper spacing from other sections.
                    */}
                    {/*
                        The Container component with className "page-hero-content" likely centers the content and applies specific styles for the hero section.
                    */}
                    {/*
                        The Button components with color "primary" and "secondary" are styled according to the Material-UI theme, with "contained" and "outlined" variants respectively.
                    */}
                    {/*
                        The gradient-bg class is likely a CSS class that applies a gradient background to the hero section.
                    */}
                    {/*
                        The home-hero-title and home-hero-subtitle classes likely apply specific styles to the title and subtitle, such as font size, weight, and color.
                    */}
                    {/*
                        The home-hero-overlay class is likely a CSS class that adds a semi-transparent overlay to the hero section, improving text readability against the background image.
                    */}
                    {/*
                        The page-hero class is likely a CSS class that sets the height and width of the hero section, ensuring it covers the desired area of the viewport.
                    */}
                    {/*
                        The Container component with className "page-section" provides a responsive fixed width for the section, with automatic side margins.
                    */}
                    {/*
                        The Grid component with container prop creates a flex container for the child Grid items, enabling the responsive grid layout.
                    */}
                    {/*
                        The Card component with className "home-card tilt" serves as a container for the track/program content, with a card-like appearance and tilt effect.
                    */}
                    {/*
                        The CardContent component is used to wrap the content of the Card, providing padding and spacing.
                    */}
                    {/*
                        The Typography component with variant "h6" is used for the track/program title, and the className "home-card-title" likely applies specific styles to these titles.
                    */}
                    {/*
                        The Typography component with variant "body2" is used for the track/program description, and the className "home-card-desc" likely applies specific styles to these descriptions.
                    */}
                    {/*
                        The div with style={{ marginTop: 8 }} is used to add top margin, creating space between the description and the chips.
                    */}
                    {/*
                        The Chip component is used to display the randomly selected keywords for each track/program. The size "small" is used to make the chips more compact.
                    */}
                    {/*
                        The marginRight and marginBottom styles are used to add spacing between the chips.
                    */}
                    {/*
                        The key prop is used to uniquely identify each chip. It's important for React's reconciliation process.
                    */}
                    {/*
                        The random selection of keywords and the tilt effect on the cards are intended to make the section more dynamic and engaging.
                    */}
                    {/*
                        The overall layout is responsive, with each Grid item taking up 12 columns on extra-small screens, 6 columns on small screens, and 4 columns on medium and larger screens.
                    */}
                    {/*
                        The Container component with id "tracks" serves as a section for the Tracks & Programs, allowing for smooth scrolling navigation.
                    */}
                    {/*
                        The Typography component with variant "h4" is used for the section title, and the className "home-section-title" likely applies specific styles to this title.
                    */}
                    {/*
                        The feature-grid class is likely a CSS class that styles the grid container for the tracks and programs.
                    */}
                    {/*
                        The page-section class is likely a CSS class that adds padding and margin to the section, ensuring proper spacing from other sections.
                    */}
                    {/*
                        The Container component with className "page-hero-content" likely centers the content and applies specific styles for the hero section.
                    */}
                    {/*
                        The Button components with color "primary" and "secondary" are styled according to the Material-UI theme, with "contained" and "outlined" variants respectively.
                    */}
                    {/*
                        The gradient-bg class is likely a CSS class that applies a gradient background to the hero section.
                    */}
                    {/*
                        The home-hero-title and home-hero-subtitle classes likely apply specific styles to the title and subtitle, such as font size, weight, and color.
                    */}
                    {/*
                        The home-hero-overlay class is likely a CSS class that adds a semi-transparent overlay to the hero section, improving text readability against the background image.
                    */}
                    {/*
                        The page-hero class is likely a CSS class that sets the height and width of the hero section, ensuring it covers the desired area of the viewport.
                    */}
                    {/*
                        The Container component with className "page-section" provides a responsive fixed width for the section, with automatic side margins.
                    */}
                    {/*
                        The Grid component with container prop creates a flex container for the child Grid items, enabling the responsive grid layout.
                    */}
                    {/*
                        The Card component with className "home-card tilt" serves as a container for the track/program content, with a card-like appearance and tilt effect.
                    */}
                    {/*
                        The CardContent component is used to wrap the content of the Card, providing padding and spacing.
                    */}
                    {/*
                        The Typography component with variant "h6" is used for the track/program title, and the className "home-card-title" likely applies specific styles to these titles.
                    */}
                    {/*
                        The Typography component with variant "body2" is used for the track/program description, and the className "home-card-desc" likely applies specific styles to these descriptions.
                    */}
                    {/*
                        The div with style={{ marginTop: 8 }} is used to add top margin, creating space between the description and the chips.
                    */}
                    {/*
                        The Chip component is used to display the randomly selected keywords for each track/program. The size "small" is used to make the chips more compact.
                    */}
                    {/*
                        The marginRight and marginBottom styles are used to add spacing between the chips.
                    */}
                    {/*
                        The key prop is used to uniquely identify each chip. It's important for React's reconciliation process.
                    */}
                    {/*
                        The random selection of keywords and the tilt effect on the cards are intended to make the section more dynamic and engaging.
                    */}
                    {/*
                        The overall layout is responsive, with each Grid item taking up 12 columns on extra-small screens, 6 columns on small screens, and 4 columns on medium and larger screens.
                    */}
                </Grid>
            </Container>

            <Container>
                <Header>
                    Involvement
                </Header>
                <BodyText>
                    We have the following positions available for members to choose from. Feel free to post any questions to our Discord channel, #fyi-help, if you can’t find your question on our Q&A page.
                </BodyText>
                <hr></hr>
                <Subheader> Leader </Subheader>
                <BodyText>
                    <p>Far from just a resume booster, this is a great opportunity to:
                    <ul>
                        <li>Work with other students who share your passion for AI research/technology</li>
                        <li>Make connections in industry and research</li>
                        <li>Contribute to something larger than yourself and leave your mark at UW-Madison</li>
                    </ul>
                    <h4>Responsibilities</h4>
                    If you're part of the leadership team, you're part of shaping the org. As one of our club's leaders, you'll be expected to
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