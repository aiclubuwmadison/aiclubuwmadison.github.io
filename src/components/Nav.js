import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

    return (
        <nav id="navbar">
            <img
                id="nav-image"
                src="images/logo.png"
                width="40"
                height="40"
            />
            <Link to ="/">HOME</Link>
            <Link to ="/about">ABOUT US</Link>
            <Link to ="/leadership">LEADERSHIP</Link>
            <Link to ="/faq">FAQ</Link>
            <Link to ="/involvement">GET INVOLVED</Link>
            <Link to ="/contact">CONTACT</Link>
        </nav>
    );
};

export default Nav;