import React from 'react';
import { Typography, Container } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import BodyText from './typographic/BodyText';

const FAQ = () => {

    return (
        <Container>
            <Header>
                Frequently Asked Questions
            </Header>

            <Subheader>I am a Freshman in CS. Is this club for me?</Subheader>
            <BodyText>Absolutely! Our meetings are targeted towards students at all levels in their AI journeys. This school year will be new for 
                all of us, so we encourage freshmen to join our Discord at <a href="https://discord.gg/TTSykcZAg4" target="_blank"> discord.gg/TTSykcZAg4</a> to 
                stay in the loop on upcoming workshops and other virtual events.
            </BodyText>
            
            <Subheader>When are the meetings?</Subheader>
            <BodyText>Our intent is for individual groups (i.e. study groups &amp; project groups) to set up their own regular meeting times. 
                Contact group leaders over <a href="https://discord.gg/TTSykcZAg4" target="_blank"> discord.gg/TTSykcZAg4</a> for their regular meeting schedule.</BodyText>
            
            <Subheader>How do I join AI@UW’s official mailing list?</Subheader>
            <BodyText>Our email list is moderated through Google Forms &mdash; If you’d like to receive emails regarding club events and projects, 
                please join our discord and sign up through the linktr.ee on our instagram page 
                <a href="https://www.instagram.com/aiclubuw/" target="_blank"> instagram.com/aiclubuw </a> or the following 
                <a href="https://linktr.ee/aiclubuw" target="_blank"> linktr.ee/aiclubuw. </a></BodyText>
            
            {/* <Subheader>How much are dues? How do I pay them?</Subheader>
            <BodyText><p style={{'color':'#9a0400'}}> Due to the circumstances surrounding COVID-19, dues will be waived until further notice.</p></BodyText> */}
            
            <Subheader>I am an AI@UW Alumni. How do I stay in touch?</Subheader>
            <BodyText>Join our <a href="https://discord.gg/TTSykcZAg4" target="_blank"> Discord</a>, <a href="https://www.instagram.com/aiclubuw/" target="_blank">Instagram</a> or, <a href="www.linkedin.com/company/aiclub-uwmadison">LinkedIn</a> network.</BodyText>

            <Subheader>If I have a project idea, how can I find people to help me?</Subheader>
            <BodyText>The best way to get your project off the ground is to email us a week or two before the semester starts. This way, we can help you create a couple of 
                slides to pitch your project at our kickoff meeting. If you want to start a project mid-semester, you can try to find support for your idea via describing 
                it in our discord.</BodyText>
            
            <Subheader>How much time per week should I expect to spend on the project or the study groups? (Is every meeting mandatory? )</Subheader>
            <BodyText>It depends on which groups you are in. Generally speaking, if you are in study groups, the expected time commitment would be 2-3 hours weekly 
                (if there is a programming assignment, you might expect to spend more time working on that). However, project groups might be slightly more time-consuming. 
                We don’t recommend getting involved in more than two groups in a given semester.</BodyText>
            
            <Subheader>How do I know if I am qualified to join in the project groups? </Subheader>
            <BodyText>Project groups will be advertised in our newsletters at the start of eachsemester as well as during our kickoff meetings. Prerequisites 
                will be listed next to each project description (on newsletter/kickoff slides).</BodyText>
            
            <Subheader>If I missed the first several meetings, can I still join in the groups? (Can I join in the groups halfway through the semester?)</Subheader>
            <BodyText>You should message the group leader over discord <a href="https://discord.gg/TTSykcZAg4" target="_blank"> discord.gg/TTSykcZAg4</a> to find out. Some groups progress in content, while some have meetings which act as standalone events (and don’t depend on past meetings).</BodyText>
            
            <Subheader>Can I join multiple groups?</Subheader>
            <BodyText>We strongly recommend students do not attempt to be involved with more than two project groups.</BodyText>
            
        </Container>
    );
}

export default FAQ;