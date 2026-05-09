import { useState } from 'react';
import { Container, Grid, Collapse, Typography } from '@mui/material';
import Portrait from './display/Portrait';

const expandableRowStyle = {
  cursor: 'pointer',
  padding: '16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: '#F1F1F1',
};

const Leadership = () => {
  const [expandedSections, setExpandedSections] = useState({
    dec24Dec25Leaders: false,
    currentLeaders: false,
    pastLeaders: false,
  });
  const [arrowDirections, setArrowDirections] = useState({
    dec24Dec25Leaders: '►',
    currentLeaders: '►',
    pastLeaders: '►',
  });

  const handleToggle = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    setArrowDirections((prev) => ({
      ...prev,
      [section]: prev[section] === '►' ? '▼' : '►',
    }));
  };

  const PastLeadershipData = [
    [
      { file: 'anniruddh.jpg', title: 'President', name: 'Anniruddh Kumar' },
      { file: 'tanish.jpg', title: 'Vice President', name: 'Tanish Nahata', link: 'https://www.linkedin.com/in/tanish-nahata' },
      { file: 'taha.jpg', title: 'Head of PR', name: 'Taha Sawar', link: 'https://www.linkedin.com/in/sawar/' },
    ],
    [
      { file: 'arun.jpg', title: 'Event Head', name: 'Arun Sivarajah' },
      { file: 'alexey.jpg', title: 'Head of Project and Study Groups', name: 'Alexey Gorbunov', link: 'https://www.linkedin.com/in/alexey-gorbunov-b2153a19a/' },
      { file: 'ethan.jpg', title: 'Webmaster', name: 'Ethan Wheeler', link: 'https://www.linkedin.com/in/ethan-wheeler-abcdef/' },
    ],
    [
      { file: 'dane.jpg', title: 'Advisor, Harvey D. Spangler Professor of Engineering', name: 'Dane Morgan', link: 'https://directory.engr.wisc.edu/mse/faculty/morgan_dane' },
    ],
  ];

  const SeptDec24LeadershipData = [
    [
      { file: 'Monish.jpg', title: 'President', name: 'Monish Vijay Kumar', link: 'https://www.linkedin.com/in/monish-bangalore-vijay-kumar-a0411720a/' },
      { file: 'Monyka.jpeg', title: 'Director of Marketing', name: 'Ratcheny (Monyka) Lee', link: 'https://www.linkedin.com/in/ratchenymonycalee/' },
      { file: 'vardaan.jpg', title: 'Secretary', name: 'Vardaan Kapoor', link: 'https://www.linkedin.com/in/vardaankapoor/' },
    ],
    [
      { file: 'debo.jpg', title: 'Events Manager', name: 'Debo Jyoti Paul', link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.png', title: 'Club Meetings Manager', name: 'Ira Hande', link: 'https://www.linkedin.com/in/ira-hande/' },
      { file: 'akash.jpeg', title: 'Treasurer', name: 'Akash Goda', link: 'https://www.linkedin.com/in/akashgoda/' },
    ],
    [
      { file: 'rohun.jpeg', title: 'Editorial Assistant', name: 'Rohun Bakshi', link: 'https://www.linkedin.com/in/rohun-bakshi/' },
    ],
  ];

  const CurrentLeadershipData = [
    [
      { file: 'hriday.png', title: 'President', name: 'Hriday Sethi', link: 'https://www.linkedin.com/in/hridyanshsethi/' },
      { file: 'rishabh.jpeg', title: 'Vice President', name: 'Rishabh Aggarwal', link: 'https://www.linkedin.com/in/rishabh-aggarwal-b03ab8211' },
      { file: 'samarth.png', title: 'Secretary', name: 'Samarth Bhargava', link: 'https://www.linkedin.com/in/samarth010/' },
    ],
    [
      { file: 'shikha.jpeg', title: 'Marketing Head', name: 'Shikha Ashara', link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'arnav.jpg', title: 'Communications Manager', name: 'Arnav Batra', link: 'https://www.linkedin.com/in/batraarnav/' },
      { file: 'swati.jpg', title: 'Event Organizer', name: 'Swati Banwani', link: 'https://matias.ma/nsfw/' },
    ],
    [
      { file: 'sam.jpg', title: 'Project Manager', name: 'Sam Avramov', link: 'https://www.linkedin.com/in/samavramov/' },
      { file: 'yug.jpg', title: 'Project Manager', name: 'Yug Marwaha', link: 'https://www.linkedin.com/in/yug-marwaha-881b53321' },
      { file: 'kartik.jpg', title: 'Project Manager', name: 'Kartik Gangwar', link: 'https://www.linkedin.com/in/kartik-gangwar' },
    ],
    [
      { file: 'jack.png', title: 'Project Manager', name: 'Jack Koteles', link: 'https://www.linkedin.com/in/jackkoteles/' },
      { file: 'sukrut.jpeg', title: 'Project Manager', name: 'Adhyot Singh', link: 'https://www.linkedin.com/in/adhyotsingh/' },
    ],
  ];

  const Dec24Dec25LeadershipData = [
    [
      { file: 'vardaan.jpg', title: 'President', name: 'Vardaan Kapoor', link: 'https://www.linkedin.com/in/vardaankapoor/' },
      { file: 'debo.jpg', title: 'Vice President', name: 'Debo Jyoti Paul', link: 'https://www.linkedin.com/in/debojp/' },
      { file: 'Ira.png', title: 'Club Meetings Manager', name: 'Ira Hande', link: 'https://www.linkedin.com/in/ira-hande/' },
    ],
    [
      { file: 'kashish.jpeg', title: 'Communications Manager', name: 'Kashish Agarwal', link: 'https://www.linkedin.com/in/kashishuw/' },
      { file: 'akash.jpeg', title: 'Treasurer', name: 'Akash Goda', link: 'https://www.linkedin.com/in/akashgoda/' },
      { file: 'charith.png', title: 'Secretary', name: 'Charith Reddy Pareddy', link: 'https://www.linkedin.com/in/charith-reddy-pareddy-61252b329/' },
    ],
    [
      { file: 'rohun.jpeg', title: 'Editorial Assistant', name: 'Rohun Bakshi', link: 'https://www.linkedin.com/in/rohun-bakshi/' },
      { file: 'shikha.jpeg', title: 'Social Media Manager', name: 'Shikha Ashara', link: 'https://www.linkedin.com/in/shikha-ashara/' },
      { file: 'sukrut.jpeg', title: 'Student Tech Advisor', name: 'Sukrut Chikodikar', link: 'https://www.linkedin.com/in/schikodikar/' },
    ],
  ];

  return (
    <>
      <section className="page-hero gradient-bg">
        <div className="home-hero-overlay" />
        <Container className="page-hero-content">
          <Typography variant="h3" className="home-hero-title">Leadership</Typography>
          <Typography variant="body1" className="home-hero-subtitle">
            Students and mentors guiding AI@UW across projects, research, and community.
          </Typography>
        </Container>
      </section>

      <Grid container direction="column" justifyContent="center" alignItems="center">
        {CurrentLeadershipData.map((row, rowIndex) => (
          <Grid container direction="row" justifyContent="center" alignItems="center" key={`static-${rowIndex}`}>
            {row.map((member, memberIndex) => (
              <Grid xs key={`static-${memberIndex}`}>
                <Portrait file={member.file} title={member.title} name={member.name} link={member.link} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      <div style={expandableRowStyle} onClick={() => handleToggle('dec24Dec25Leaders')}>
        <Typography variant="h6">December 2024 - December 2025 {arrowDirections.dec24Dec25Leaders}</Typography>
      </div>
      <Collapse in={expandedSections.dec24Dec25Leaders} timeout="auto" unmountOnExit>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {Dec24Dec25LeadershipData.map((row, rowIndex) => (
            <Grid container direction="row" justifyContent="center" alignItems="center" key={`dec-${rowIndex}`}>
              {row.map((member, memberIndex) => (
                <Grid xs key={`dec-${memberIndex}`}>
                  <Portrait file={member.file} title={member.title} name={member.name} link={member.link} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Collapse>

      <div style={expandableRowStyle} onClick={() => handleToggle('currentLeaders')}>
        <Typography variant="h6">September 2024 - December 2024 {arrowDirections.currentLeaders}</Typography>
      </div>
      <Collapse in={expandedSections.currentLeaders} timeout="auto" unmountOnExit>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {SeptDec24LeadershipData.map((row, rowIndex) => (
            <Grid container direction="row" justifyContent="center" alignItems="center" key={rowIndex}>
              {row.map((member, memberIndex) => (
                <Grid xs key={memberIndex}>
                  <Portrait file={member.file} title={member.title} name={member.name} link={member.link} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Collapse>

      <div style={expandableRowStyle} onClick={() => handleToggle('pastLeaders')}>
        <Typography variant="h6">Past Leadership {arrowDirections.pastLeaders}</Typography>
      </div>
      <Collapse in={expandedSections.pastLeaders} timeout="auto" unmountOnExit>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {PastLeadershipData.map((row, rowIndex) => (
            <Grid container direction="row" justifyContent="center" alignItems="center" key={rowIndex}>
              {row.map((member, memberIndex) => (
                <Grid xs key={memberIndex}>
                  <Portrait file={member.file} title={member.title} name={member.name} link={member.link} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </>
  );
};

export default Leadership;
