import React, { Children } from 'react';
import { Typography } from '@material-ui/core';

const SubheaderText = ({ children }) => {

    return (
        <div className="subheader-text">
            { children }
        </div>
    );
}

export default SubheaderText;