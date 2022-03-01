import React from 'react';
import Subheader from '../typographic/Subheader';
import BodyText from '../typographic/BodyText';
import { Grid, useMediaQuery } from '@material-ui/core';

const Seminar = ({file, date, title, children}) => {

    const isLargeScreen = useMediaQuery('(min-width: 900px)');

    return (
        <Grid container>
                <Grid item xs={isLargeScreen ? 8 : null}>
                    <div className="seminar-content seminar-card">
                        <Subheader> {title} </Subheader>
                        <h2> {date} </h2>
                        <BodyText>
                            {children}
                        </BodyText>
                    </div>
                </Grid>
                { isLargeScreen ? (
                <Grid item xs={3}>
                    <div className= "image-container" style={{marginRight: 10}}>
                        <img
                            className="image"
                            width={300}
                            height={375}
                            alt="seminar"
                            src={`${process.env.PUBLIC_URL}/images/seminarSpeakers/${file}`}
                        />
                    </div>
                </Grid> ) : (<></>)}
            </Grid>
    );
};

export default Seminar;