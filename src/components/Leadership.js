import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';

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
                        
                    </Grid>
                    <Grid item xs>
                        
                    </Grid>
                    <Grid item xs>
                        
                    </Grid>                   
                </Grid>
                <Grid container direction="row">
                    <Grid item xs>
                        
                    </Grid>
                    <Grid item xs>
                        
                    </Grid>
                    <Grid item xs>
                        
                    </Grid>   
                </Grid>
                <Grid container direction="row">
                    <Grid item xs>
                        
                    </Grid>
                    <Grid item xs>
                        
                    </Grid>
                    <Grid item xs>
                        
                    </Grid>   
                </Grid>
            </Grid>
        </Container>
    );
}

export default Leadership;