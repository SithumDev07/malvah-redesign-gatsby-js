import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectItem from "../components/ProjectItem";
import DATA from '../utils/data';


function Home() {
    return (
        <div>
            <Header />
            <div className="main-container" id="main-container">
                {DATA.map((projectItem, index) => (
                    <ProjectItem key={index} project={projectItem} itemIndex={index} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Home;
