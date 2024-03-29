import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import Portrait from './display/Portrait';

const Leadership = () => {

    return (
        <Container>
            <Header>
                Our Leadership
            </Header>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait
                            file="anniruddh.jpg"
                            title="President"
                            name="Anniruddh Kumar"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="tanish.jpg"
                            title="Vice President"
                            name="Tanish Nahata"
                            link="https://www.linkedin.com/in/tanish-nahata"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="taha.jpg"
                            title="Head of PR"
                            name="Taha Sawar"
                            link="https://www.linkedin.com/in/sawar/"
                        />
                    </Grid>

                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait
                            file="arun.jpg"
                            title="Event Head"
                            name="Arun Sivarajah"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="alexey.jpg"
                            title="Head of Project and Study Groups"
                            name="Alexey Gorbunov"
                            link="https://www.linkedin.com/in/alexey-gorbunov-b2153a19a/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="ethan.jpg"
                            title="Webmaster"
                            name="Ethan Wheeler"
                            link="https://www.linkedin.com/in/ethan-wheeler-abcdef/"
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait
                            file="dane.jpg"
                            title="Advisor, Harvey D. Spangler Professor of Engineering"
                            name="Dane Morgan"
                            link="https://directory.engr.wisc.edu/mse/faculty/morgan_dane"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Leadership;
