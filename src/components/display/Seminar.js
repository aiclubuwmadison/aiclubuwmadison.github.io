import React from 'react';
import Subheader from '../typographic/Subheader';
import BodyText from '../typographic/BodyText';
import { Grid } from '@material-ui/core';

const Seminar = ({file, date, title, children}) => {

    return (
        <div className="seminar-card">
            <Grid container>
                <Grid item xs={9}>
                    <div className="seminar-content">
                        <Subheader> {title} </Subheader>
                        <h2> {date} </h2>
                        <BodyText>
                            {children}
                        </BodyText>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <img
                        style={{
                            float: "right",
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px"
                        }}
                        height={400}
                        width={300}
                        src={`${process.env.PUBLIC_URL}/images/seminarSpeakers/${file}`}
                    />
                </Grid>
            </Grid>
        </div>
    )
};

export default Seminar;