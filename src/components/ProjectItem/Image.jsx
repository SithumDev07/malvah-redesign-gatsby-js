import React from 'react';

function Image({ url, opacity, parallaxPos }) {
    return (
        <img
            src={url}
            alt=""
            style={{
                opacity: opacity,
                transform: `translate3d(${parallaxPos.x}px, ${parallaxPos.y}px, 0px)`
            }}
        />
    )
}

export default Image;
