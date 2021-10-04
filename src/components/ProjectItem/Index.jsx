import React from 'react';
import Image from './Image';
import { Hash } from 'react-feather';
import "./styles.scss";
import Title from './Title';

function ProjectItem({ project, itemIndex }) {
    return (
        <li className="project-item-container">
            <Title title={project.title} />
            <Image url={project.url} />

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
