import React from 'react';
import { Typography, Container } from '@material-ui/core';
import Header from './typographic/Header';

const Home = () => {

    return (
        <>
            <div id="gradient">
                <div id="welcome-text">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/logo_full.png`}
                        width={"40%"}
                    />
                </div>
            </div>
        </>
    );
}

export default Home;