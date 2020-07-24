import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import Portrait from './display/Portrait';

const Leadership = () => {

    return (
        <Container>
            <Header>
                Leadership
            </Header>
            <Subheader>
                Current Leaders
            </Subheader>
            <Grid container direction="column">
                <Grid container direction="row">
                    <Grid item xs>
                        <Portrait file="declan.jpg"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="chris.jpg"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="soham.jpg"/>
                    </Grid>                   
                </Grid>
                <Grid container direction="row">
                    <Grid item xs>
                        <Portrait file="abhay.jpg"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="dane.png"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="dandi.png"/>
                    </Grid>   
                </Grid>
                <Grid container direction="row">
                    <Grid item xs>
                        <Portrait file="eric.jpg"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="jinman.jpg"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="keshav.png"/>
                    </Grid>   
                </Grid>
                <Grid container direction="row">
                    <Grid item xs>
                        <Portrait file="nick.jpg"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="rakshith.jpg"/>
                    </Grid>
                    <Grid item xs>
                        <Portrait file="richard.jpg"/>
                    </Grid>   
                </Grid>
            </Grid>
        </Container>
    );
}

export default Leadership;