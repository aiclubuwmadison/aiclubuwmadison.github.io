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
                            file="sarah.jpg"
                            title="Co-President"
                            name="Sarah Worthington"
                            link="https://www.linkedin.com/in/sarah-worthington/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="anniruddh.jpg"
                            title="Co-President"
                            name="Anniruddh Kumar" 
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait 
                            file="declan.jpg"
                            title="Club Advisor"
                            name="Declan Campbell"
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait
                            file="katherine.jpg"
                            title="Head of Research"
                            name="Katherine Fu"
                            link="https://www.linkedin.com/in/JiaruFu/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="taha.jpg"
                            title="Head of Club Relations and Public Relations"
                            name="Taha Sawar"
                            link="https://www.linkedin.com/in/sawar/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="soham.jpg"
                            title="Webmaster"
                            name="Soham Dasgupta"
                            link="https://www.linkedin.com/in/sohdas"
                        />
                    </Grid>                   
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Portrait
                            file="vishnu.jpg"
                            title="Head of Finance"
                            name="Vishnu Yarlagadda"
                            link="https://www.linkedin.com/in/vishnu-yarlagadda-3b9b52183/"
                        />
                    </Grid>
                    <Grid item xs>
                        <Portrait
                            file="alex.jpg"
                            title="Head of Department Relations"
                            name="Alex Vesel"
                        />
                    </Grid>
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