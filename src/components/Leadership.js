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
            <Grid container direction="column">
                <Grid container direction="row">
                    <Grid item xs>
                        <Portrait 
                            file="declan.jpg"
                            title="Co-President"
                            name="Declan Campbell"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="chris.jpg"
                            title="Co-President"
                            name="Chris Endemann"
                            link="https://www.linkedin.com/in/chris-endemann"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="soham.jpg"
                            title="Vice President"
                            name="Soham Dasgupta"
                            link="https://www.linkedin.com/in/sohdas"
                        />
                    </Grid>                   
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={4}>
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