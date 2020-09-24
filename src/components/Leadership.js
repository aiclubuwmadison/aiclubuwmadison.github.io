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
                            file="katherine.jpg"
                            title="Co-President"
                            name="Katherine Fu"
                            link="https://www.linkedin.com/in/JiaruFu/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="atulya.jpg"
                            title="Co-President"
                            name="Atulya Reddy"
                            link="https://www.linkedin.com/in/atulyareddy"
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
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait 
                            file="declan.jpg"
                            title="Leader"
                            name="Declan Campbell"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="jules.png"
                            title="Leader"
                            name="Jules Vigy"
                            link="https://www.linkedin.com/in/julesvigy/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="vishnu.jpg"
                            title="Leader"
                            name="Vishnu Yarlagadda"
                            link="https://www.linkedin.com/in/vishnu-yarlagadda-3b9b52183/"
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait
                            file="alex.jpg"
                            title="Leader"
                            name="Alex Vesel"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="adam.png"
                            title="Leader"
                            name="Adam Shedivy"
                            link="https://www.linkedin.com/in/adam-shedivy-2619a1166/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="joash.jpg"
                            title="Leader"
                            name="Joash Shankar"
                            link="https://www.linkedin.com/in/joash-shankar/"
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait
                            file="dane.jpg"
                            title="Advisor Harvey D. Spangler Professor of Engineering"
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