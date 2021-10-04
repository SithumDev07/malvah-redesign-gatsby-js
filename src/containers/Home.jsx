import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectItem from "../components/ProjectItem";
import DATA from '../utils/data';
import { useState, useRef } from 'react';
import { useEffect } from 'react';


function Home() {

    const menuItems = useRef(null);
    const [renderItems, setRenderItems] = useState(DATA);

    const cloneItems = () => {
        const itemHeight = menuItems.current.childNodes[0].offsetHeight;
        const fitMax = Math.ceil(window.innerHeight / itemHeight);

        const clonedItems = [...renderItems]
            .filter((_, index) => index < fitMax)
            .map((target) => target);

        setRenderItems([...renderItems, ...clonedItems]);

        return cloneItems.length * itemHeight;
    }

    const getScrollPosition = () => {
        return (
            (menuItems.current.pageYOffset || menuItems.current.scrollTop) - (menuItems.current.clientTop || 0)
        );
    };

    const setScrollPosition = (pos) => {
        menuItems.current.scrollTop = pos;
    }

    const initScroll = () => {
        const scrollPos = getScrollPosition();
        if (scrollPos <= 0) setScrollPosition(1);
    }

    useEffect(() => {

        const clonesHeight = cloneItems();
        initScroll();

        menuItems.current.style.scrollBehavior = "unset";

        const scrollUpdate = () => {
            const scrollPos = getScrollPosition();
            if (clonesHeight + scrollPos >= menuItems.current.scrollHeight)
                setScrollPosition(1);
            else if (scrollPos <= 0)
                setScrollPosition(menuItems.current.scrollHeight - clonesHeight);
        }
        menuItems.current.addEventListener('scroll', scrollUpdate);

        return () => {
            menuItems.current.removeEventListener("scroll", scrollUpdate);
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="main-container" id="main-container">
                <ul ref={menuItems}>
                    {renderItems.map((projectItem, index) => (
                        <ProjectItem key={index} project={projectItem} itemIndex={index} />
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
