import React, { useState } from 'react';
import { Container, Grid, Collapse, Typography } from '@material-ui/core';
import Header from './typographic/Header';
import Portrait from './display/Portrait';
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

const Leadership = () => {
    const classes = useStyles();
    // To add a new collapse section, just add the name here, remember to update it at bottom, and have a new list.
    const [expandedSections, setExpandedSections] = useState({
        currentLeaders: false,
        pastLeaders: false,
    });
    const [arrowDirections, setArrowDirections] = useState({
        currentLeaders: '►',
        pastLeaders: '►',
    });
    // const [expanded, setExpanded] = useState(false);
    // const [arrowDirection, setArrowDirection] = useState('►');

    const handleToggle = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
        
        setArrowDirections(prevState => ({
            ...prevState,
            [section]: prevState[section] === '►' ? '▼' : '►'
        }));
    };
    const PastLeadershipData = [
        [
            { file: "anniruddh.jpg", title: "President", name: "Anniruddh Kumar" },
            { file: "tanish.jpg", title: "Vice President", name: "Tanish Nahata", link: "https://www.linkedin.com/in/tanish-nahata" },
            { file: "taha.jpg", title: "Head of PR", name: "Taha Sawar", link: "https://www.linkedin.com/in/sawar/" },
        ],
        [
            { file: "arun.jpg", title: "Event Head", name: "Arun Sivarajah" },
            { file: "alexey.jpg", title: "Head of Project and Study Groups", name: "Alexey Gorbunov", link: "https://www.linkedin.com/in/alexey-gorbunov-b2153a19a/" },
            { file: "ethan.jpg", title: "Webmaster", name: "Ethan Wheeler", link: "https://www.linkedin.com/in/ethan-wheeler-abcdef/" },
        ],
        [
            { file: "dane.jpg", title: "Advisor, Harvey D. Spangler Professor of Engineering", name: "Dane Morgan", link: "https://directory.engr.wisc.edu/mse/faculty/morgan_dane" },
        ],
    ];

    // const staticLeadershipData = [
    //     [
    //         { file: "vardaan.jpg", title: "Co-President", name: "Vardaan Kapoor" },
    //         { file: "Monish.jpg", title: "Co-President", name: "Monish Vijay Kumar"},
    //         { file: "debopaul2.jpg", title: "Treasurer", name: "Akash"},
    //     ],
    //     [
    //         { file: "debopaul.jpg", title: "Events Manager", name: "Debo Jyoti Paul" },
    //         { file: "anniruddh.jpg", title: "Communications and Event Manager", name: "kashish"},
    //         { file: "Ira.png", title: "Club Meetings Manager", name: "Ira" },
    //     ],
    //     [
    //         { file: "anniruddh.jpg", title: "Editorial Assistant", name: "Rohun"},
    //         { file: "tanish.jpg", title: "Social Media Manager", name: "Shikha"},
    //         { file: "Monyka.jpeg", title: "Director of Marketing", name: "Monyka"},
    //     ],
    //     [
    //         { file: "taha.jpg", title: "Secretary", name: "Charith"},
    //         { file: "tanish.jpg", title: "Webmaster", name: "Brennen"},
    //         { file: "taha.jpg", title: "Webmaster", name: "JOHN"},
    //     ],
    // ];
    const SeptDec24LeadershipData = [
        [
            { file: "Monish.jpg", title: "President", name: "Monish Vijay Kumar"},
            { file: "Monyka.jpeg", title: "Director of Marketing", name: "Ratcheny (Monyka) Lee"},
            { file: "vardaan.jpg", title: "Secretary", name: "Vardaan Kapoor" },
        ],
        [
            { file: "debopaul.jpg", title: "Events Manager", name: "Debo Jyoti Paul" },
            { file: "Ira.png", title: "Club Meetings Manager", name: "Ira Hande" },
            { file: "boy.jpg", title: "Treasurer", name: "Akash Goda" },
        ],
        [
            { file: "boy.jpg", title: "Editorial Assistant", name: "Rohun Bakshi" },
        ],
    ];

    const CurrentLeadershipData = [
        [
            { file: "vardaan.jpg", title: "President", name: "Vardaan Kapoor" },
            { file: "debopaul.jpg", title: "Vice President", name: "Debo Jyoti Paul" },
            { file: "Ira.png", title: "Club Meetings Manager", name: "Ira Hande" },
        ],
        [   
            { file: "girl.jpg", title: "Communications Manager", name: "Kashish Agarwal" },
            { file: "boy.jpg", title: "Treasurer", name: "Akash Goda" },
            { file: "boy.jpg", title: "Secretary", name: "Charith Reddy Pareddy" },
        ],
        [
            { file: "boy.jpg", title: "Editorial Assistant", name: "Rohun Bakshi" },
            { file: "girl.jpg", title: "Social Media Manager", name: "Shikha Ashara" },
            { file: "boy.jpg", title: "Webmaster", name: "Pranav Gullapalli" },
        ],
        [
            { file: "girl.jpg", title: "Student Tech Advisor", name: "Sukrut Chikodikar" },
        ],
    ];


    return (
        <Container>
            <Header>
                Our Leadership
            </Header>

              {/* Always Shown Section with similar styling but non-interactive: Think of as Current leaders. */}
              {/* <div className={classes.staticRow}> */}
                    {/* <Typography variant="h6">Academic Year 2024-2025</Typography> */}
                {/* </div> */}
                <Grid container direction="column" justify="center" alignItems="center">
                    {CurrentLeadershipData.map((row, rowIndex) => (
                        <Grid container direction="row" justify="center" alignItems="center" key={`static-${rowIndex}`}>
                            {row.map((member, memberIndex) => (
                                <Grid item xs key={`static-${memberIndex}`}>
                                    <Portrait
                                        file={member.file}
                                        title={member.title}
                                        name={member.name}
                                        link={member.link}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>

            {/* Example for adding new collapseable. onClick, indide Topography, and the 'in' section Collapse, and update mapping data. */}
            <div className={classes.expandableRow} onClick={() => handleToggle("currentLeaders")}>  
                <Typography variant="h6">
                    September - December 24' {arrowDirections.currentLeaders}
                </Typography>
            </div>
            <Collapse in={expandedSections.currentLeaders} timeout="auto" unmountOnExit>
                <Grid container direction="column" justify="center" alignItems="center">
                    {SeptDec24LeadershipData.map((row, rowIndex) => (
                        <Grid container direction="row" justify="center" alignItems="center" key={rowIndex}>
                            {row.map((member, memberIndex) => (
                                <Grid item xs key={memberIndex}>
                                    <Portrait
                                        file={member.file}
                                        title={member.title}
                                        name={member.name}
                                        link={member.link}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Collapse>

            <div className={classes.expandableRow} onClick={() => handleToggle("pastLeaders")}>
                <Typography variant="h6">
                    Past Leadership {arrowDirections.pastLeaders}
                </Typography>
            </div>
            <Collapse in={expandedSections.pastLeaders} timeout="auto" unmountOnExit>
                <Grid container direction="column" justify="center" alignItems="center">
                    {PastLeadershipData.map((row, rowIndex) => (
                        <Grid container direction="row" justify="center" alignItems="center" key={rowIndex}>
                            {row.map((member, memberIndex) => (
                                <Grid item xs key={memberIndex}>
                                    <Portrait
                                        file={member.file}
                                        title={member.title}
                                        name={member.name}
                                        link={member.link}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Collapse>
        </Container>
    );
}

export default Leadership;