import React from 'react';
import { Container } from '@material-ui/core';
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
        </Container>
    );
}

export default Leadership;