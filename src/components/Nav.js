import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { useMediaQuery } from '@material-ui/core';

let styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '18px',
        height: '18px',
        right: '30px',
        top: '22px'
    },
    bmBurgerBars: {
        background: '#831c09'
    },
    bmBurgerBarsHover: {
        background: '#9a0400'
    },
    bmCrossButton: {
        position: 'fixed',
        width: '18px',
        height: '18px',
        right: '30px',
        top: '22px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#9a0400',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmItemList: {
        color: 'whitesmoke',
        padding: '0.8em'
    },
    bmItem: {
        display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};

const Nav = () => {
    const isLargeScreen = useMediaQuery('(min-width: 800px)');
    
    return (
        <nav id="navbar">
            <img
                id="nav-image"
                src="images/logo.png"
                width="40"
                height="40"
            />
            { isLargeScreen ? 
                (
                    <>
                        <Link to ="/">HOME</Link>
                        <Link to ="/about">ABOUT US</Link>
                        <Link to ="/leadership">LEADERSHIP</Link>
                        <Link to ="/faq">FAQ</Link>
                        <Link to ="/involvement">GET INVOLVED</Link>
                        <Link to ="/projects">PROJECTS</Link>
                        <Link to ="/study">STUDY GROUPS</Link>
                        <Link to ="/calendar">CALENDAR</Link>
                        <Link to ="/contact">CONTACT</Link>
                    </> 
                ) : (
                    <Menu
                        right
                        isOpen={false}
                        styles={styles}
                        width={200}
                        className="burger-menu"
                        noOverlay
                    >
                        <Link to ="/">HOME</Link>
                        <Link to ="/about">ABOUT US</Link>
                        <Link to ="/leadership">LEADERSHIP</Link>
                        <Link to ="/faq">FAQ</Link>
                        <Link to ="/involvement">GET INVOLVED</Link>
                        <Link to ="/projects">PROJECTS</Link>
                        <Link to ="/study">STUDY GROUPS</Link>
                        <Link to ="/calendar">CALENDAR</Link>
                        <Link to ="/contact">CONTACT</Link>
                    </Menu>
                )
            }
        </nav>
    );
};

export default Nav;