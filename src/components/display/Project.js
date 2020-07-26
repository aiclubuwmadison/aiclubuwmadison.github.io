import React from 'react';
import Subheader from '../typographic/Subheader';
import BodyText from '../typographic/BodyText';

const Project = ({children, name}) => {

    return (
        <div>
            <Subheader> {name} </Subheader>
            <BodyText>
                {children}
            </BodyText>
        </div>
    )
};

export default Project;