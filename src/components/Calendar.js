import React from 'react';
import { Container } from '@material-ui/core';
import Header from './typographic/Header';
import BodyText from './typographic/BodyText';

const Calendar = () => {
    return (
        <Container>
            <Header> Event Calendar </Header>
            <BodyText>
                Stay up to date on all AI@UW events! Click the "+GoogleCalendar" button in the bottom right to add this to your personal calendar.
            </BodyText>
            <div style={{padding: 15, paddingBottom: 25}}>
                <iframe src="https://calendar.google.com/calendar/embed?src=aiclubuwmadison%40gmail.com&ctz=America%2FChicago"
                    width="100%" height="600px" frameborder="0" scrolling="no" title="AI@UW Google Calendar"></iframe>
            </div>
        </Container>
    );
};

export default Calendar;