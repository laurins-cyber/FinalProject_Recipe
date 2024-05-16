//imports
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <>
        <div>
            <Link to="/">EMPTY YOUR FRIDGE</Link>
        </div>

        <div>
        <li><Link to="/recipes">Recpies</Link></li>
        <li><Link to="/favorites">Fav</Link></li>
        </div>
        </>
    )
};

export default Navbar;