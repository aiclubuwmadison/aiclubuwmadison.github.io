import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Header from './typographic/Header';
import Subheader from './typographic/Subheader';
import BodyText from './typographic/BodyText';

const Mentorship = () => {

    return (
        <>
            <Container>
                <Header>
                    Mentorship
                </Header>
                <BodyText>
                    Reprehenderit commodo in consequat laboris et enim voluptate cillum qui duis.
                </BodyText>

                <hr></hr>
                
                <Subheader> Alpha </Subheader>
                <BodyText>
                    Consequat consectetur ipsum sunt eu aliquip commodo cupidatat ex ad est quis.
                </BodyText>

                <Subheader> Beta </Subheader>
                <BodyText>
                    Labore Lorem et anim dolore excepteur aute ad veniam laboris sit dolore ex proident.
                </BodyText>

            </Container>
        </>
    );
}

export default Involvement;