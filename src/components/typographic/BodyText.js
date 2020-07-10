import React, { Children } from 'react';
import { Typography } from '@material-ui/core';

const BodyText = ({ children }) => {

    return (
        <div className="body-text">
            { children }
        </div>
    );
}

export default BodyText;