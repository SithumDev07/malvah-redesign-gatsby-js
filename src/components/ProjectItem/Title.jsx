import React from 'react';

function Title({ title, handlerMouseEnter, handlerMouseLeave }) {
    return (
        <div className="title-item" onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
            <h1 className="menu-title">{title}</h1>
        </div>
    )
}

export default Title;
