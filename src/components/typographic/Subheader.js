import React from 'react';

const Subheader = ({ children, variant}) => {

    return (
        <div className={`subheader-text ${variant || ""}`}>
            { children }
        </div>
    );
}

export default Subheader;