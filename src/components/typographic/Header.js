import React, { Children } from 'react';
import { Typography } from '@material-ui/core';

const HeaderText = ({ children }) => {

    return (
        <div className="header-text">
            { children }
            <hr/>
        </div>
    );
}

export default HeaderText;