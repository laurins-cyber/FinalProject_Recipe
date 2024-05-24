import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    return (
        <NavbarContainer>
            <Logo>
                <Link to="/">Empty Your Fridge</Link>
            </Logo>
            <Links>
                <StyledLink to="/recipes">🥘Recipes</StyledLink>
                <StyledLink to="/favorites">⭐Fav</StyledLink>
            </Links>
        </NavbarContainer>
    );
};

export default Navbar;

const NavbarContainer = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  background: #171717;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 100;
`;

const Logo = styled.div`
  font-family: "Kranky", serif;
  font-weight: 400;
  font-style: none;
  transform: rotate(-6deg);
  a {
    color: white;
    text-decoration: none;
    font-size: 40px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  font-family: "Kranky", serif;
  font-weight: 400;
  font-style: normal;
  padding-right: 30px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-size: 24px;
  position: relative;
  
  &:hover {
    border: 2px dashed white;
    border-radius: 5px;
    padding: 5px;
  }
`;