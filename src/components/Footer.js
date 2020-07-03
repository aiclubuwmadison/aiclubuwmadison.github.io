import React from 'react';
import { Grid } from '@material-ui/core';

const Footer = () => {

    return (
        <div id="footer-wrapper">
            <Grid container>
                <Grid item xs>
                    Example
                </Grid>
                <Grid item xs>
                    <img
                        id="footer-image"
                        src="images/logo_full.png"
                        height="80px"
                    />
                </Grid>
                <Grid item xs>
                    Example
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;