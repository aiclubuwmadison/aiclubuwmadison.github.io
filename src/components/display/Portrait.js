import React from 'react';
import Subheader from '../typographic/Subheader';
import BodyText from '../typographic/BodyText';

const Portrait = ({file, link, name, title}) => {

    return (
        <div className="card">
            <a
                className="card-image"
                href={link}
                target="_blank"
            >
                <img
                    src={`${process.env.PUBLIC_URL}/images/portraits/${file}`}
                    width={300}
                    height={300}
                />
            </a>
            <a
                className="card-description"
                href={link}
                target="_blank"
            >
                <Subheader> {name} </Subheader>
                <BodyText>
                    {title}
                </BodyText>
            </a>

        </div>
    )
};

export default Portrait;