import React from 'react';
import Subheader from '../typographic/Subheader';
import BodyText from '../typographic/BodyText';

const ArticleImage = ({file, caption}) => {

    return (
        <div className="image-container">
            <div className="image">
                <img
                    src={`${process.env.PUBLIC_URL}/images/events/${file}`}
                    width="100%"
                />
                <div className="image-caption">
                    <BodyText>
                        {caption}
                    </BodyText>
                </div>
            </div>
        </div>
    )
};

export default ArticleImage;