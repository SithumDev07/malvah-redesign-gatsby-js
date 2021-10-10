import React, { useReducer, useRef } from 'react';
import Image from './Image';
import { Hash } from 'react-feather';
import "./styles.scss";
import Title from './Title';
import animate from './animate';

const initialState = {
    opacity: 0,
    parallaxPos: { x: 0, y: -20 }
}

const CHANGE_OPACITY = "CHANGE/OPACITY";
const CHANGE_COORDINATES = "MOUSE/COORDINATES";

function reducer(state, action) {
    switch (action.type) {
        case CHANGE_OPACITY: {
            return {
                ...state,
                opacity: action.payload
            }
        }
        case CHANGE_COORDINATES: {
            return {
                ...state,
                parallaxPos: action.payload
            }
        }
        default: {
            throw new Error();
        }
    }
}

function ProjectItem({ project, itemIndex }) {

    const listItem = useRef(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    const easeMethod = 'easeInOutCubic';

    const parallax = (event) => {
        const speed = -5;
        const x = (window.innerWidth - event.pageX * speed) / 100;
        const y = (window.innerHeight - event.pageY * speed) / 100;

        dispatch({
            type: CHANGE_COORDINATES,
            payload: { x, y }
        })
    }

    const handleOpacity = (initialOpacity, newOpacity, duration) => {
        animate({
            fromValue: initialOpacity,
            toValue: newOpacity,
            onUpdate: (newOpacity, callback) => {
                dispatch({ type: CHANGE_OPACITY, payload: newOpacity });
                callback();
            },
            onComplete: () => { },
            duration: duration,
            easeMethod: easeMethod
        })
    }

    const handlerMouseEnter = () => {
        // dispatch({
        //     type: CHANGE_OPACITY,
        //     payload: 1
        // });
        handleOpacity(0, 1, 500);

        listItem.current.addEventListener('mousemove', parallax);
    }

    const handlerMouseLeave = () => {
        listItem.current.removeEventListener('mousemove', parallax);

        // dispatch({
        //     type: CHANGE_OPACITY,
        //     payload: 0
        // });

        handleOpacity(1, 0, 800);
        dispatch({
            type: CHANGE_COORDINATES,
            payload: initialState.parallaxPos
        });

    }

    return (
        <li className="project-item-container" ref={listItem}>
            <Title
                title={project.title}
                handlerMouseEnter={handlerMouseEnter}
                handlerMouseLeave={handlerMouseLeave}
            />
            <Image url={project.url} opacity={state.opacity} parallaxPos={state.parallaxPos} />

            <div className="info-block">
                <p className="info-block-header">
                    <span>
                        <Hash />0{itemIndex}
                    </span>
                </p>

                {project.info.map((element) => (
                    <p key={element}>
                        <span>
                            {element}
                        </span>
                    </p>
                ))}
            </div>
        </li>
    )
}

export default ProjectItem;
