import React from 'react';
import { Typography, Container } from '@material-ui/core';

const FAQ = () => {

    return (
        <Container>
            <Typography variant="h5">
                Frequently Asked Questions
            </Typography>

            <h3>I am a Freshman in CS. Is this club for me?</h3>
            <p>Absolutely! We jump-start freshmen into their AI careers by providing study-groups, workshops, tutorials, and hands-on learning opportunities.</p>
            <hr/>
            <h3>What study groups are recommended for a freshman to join?</h3>
            <p>Getting the basics down for both machine learning and deep learning will go a long way to prepare you for more challenging engineering project work in the future. We recommend beginners in AI/ML start with #study-ml, #study-dl, and/or #study-tensorflow as one of the core beginner groups. In study-ml, students will work through coursera’s ML course together. In study-dl, students will learn the basics of deep learning theory (also using coursera as the primary learning material). In study-tensorflow, students will learn how to build deep neural nets using specialized software (tensorflow) with the help of our club president, Declan. <br/><br/>If you have to choose only one group to join as a beginner in the field, choose one of the above study groups. <br/><br/>After that, you’re welcome to check out some of the engineering groups we have available. Prerequisites to join these groups can be found in the channel descriptions for each group as well as the projects page on our website. In general, you should contact group leaders for clarification regarding a specific group/project.</p>
            <hr/>
            <h3>When are the meetings?</h3>
            <p>Our intent is for individual groups (i.e. study groups &amp; project groups) to set up their own regular meeting times. Contact <a href="leadership.html">group leaders</a> for their regular meeting schedule. In addition to these meetings, we have org-wide meetings scheduled every month, socials, and occassional guest speakers that give tech talks (if you want a platform to present your ideas/research, let us know and we might be able to arrange something). Be sure to check out our website’s ‘calendar’ tab for event details. There’s an option to add the calendar to your current Google Calendar on that page (click the plus button).</p>
            <hr/>
            <h3>How do I join AI@UW’s official mailing list?</h3>
            <p>Our email list is moderated through Slack–If you’d like to receive emails regarding club events and projects, please join the Slack group (see ‘Slack’ tab on homepage of our website)!</p>
            <hr/>
            <h3>How much are dues? How do I pay them?</h3>
            <p>You can pass the dues onto a member of the executive team or venmo our head of finance, @RakshithPadmanabha.<br/><br/> Dues: 1 Semester: $15, 2 Semesters: $20, 2 Semesters + Shirt: $40</p>
            <hr/>
            <h3>I am an AI at UW Alumni. How do I stay in touch?</h3>
            <p>Join our Alumni network at <a href="https://www.linkedin.com/groups/13562652/">linkedin</a></p>
            <h3>If I have a project idea, how can I find people to help me?</h3>
            <p>The best way to get your project off the ground is to email us a week or two before the semester starts. This way, we can help you create a couple of slides to pitch your project at our kickoff meeting. If you want to start a project mid-semester, you can try to find support for your idea via describing it in our #group-ideas channel on Slack.</p>
            <hr/>
            <h3>How much time per week should I expect to spend on the project or the study groups? (Is every meeting mandatory? )</h3>
            <p>It depends on which groups you are in. Generally speaking, if you are in study groups, the expected time commitment would be 2-3 hours weekly (if there is a programming assignment, you might expect to spend more time working on that). However, project groups might be slightly more time-consuming. We don’t recommend getting involved in more than two groups in a given semester</p>
            <hr/>
            <h3>How do I know if I am qualified to join in the project groups? </h3>
            <p>Project groups will be advertised in our newsletters at the start of each semester as well as during our kickoff meetings. In addition, we try to keep our website up-to-date with all ongoing projects. Prerequisites will be listed next to each project description (on newsletter/website/kickoff slides).</p>
            <hr/>
            <h3>If I missed the first several meetings, can I still join in the groups? (Can I join in the groups halfway through the semester?)</h3>
            <p>You should message the group leader to find out. Some groups progress in content, while some have meetings which act as standalone events (and don’t depend on past meetings).</p>
            <hr/>
            <h3>Can I join multiple groups?</h3>
            <p>We strongly recommend students do not attempt to be involved with more than two project groups.</p>
            <hr/>
    
        </Container>
    );
}

export default FAQ;