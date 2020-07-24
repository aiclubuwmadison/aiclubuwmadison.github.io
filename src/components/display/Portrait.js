import React from 'react';

const Portrait = ({file}) => {

    return (
        <>
            <img
                src={`${process.env.PUBLIC_URL}/images/portraits/${file}`}
                width={300}
                height={300}
            />
        </>
    )
};

export default Portrait;