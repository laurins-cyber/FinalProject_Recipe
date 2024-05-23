//imports
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    return(
        <>
        <Title>
        <Link to="/">EMPTY YOUR FRIDGE</Link>
        </Title>
        <Nav>
        <Link to="/recipes">Recpies</Link>
        <Link to="/favorites">Fav</Link>
        </Nav>
        </>
    )
};

export default Navbar;

const Title = styled.div`
font-family: "Kranky", serif;
font-weight: 400;
font-size: 60px;
font-style: normal;
float: left;
text-align: center;
padding: 14px 16px;
`;

const Nav = styled.div`
font-family: "Kranky", serif;
font-weight: 400;
font-size: 48px;
font-style: normal;
float: right;
&:hover {
    border:2px dashed white;
    border-radius: 5px;
    }
`;