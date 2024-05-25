import React from 'react';
import SearchBar from './SearchBar';
import styled from "styled-components";

const Home = ({ searchRecipes }) => {
    return (
        <>
            <SearchBar searchRecipes={searchRecipes} />
        <Container>
        <StyledTitle>About us</StyledTitle>
        <PadText>
        We would love to support your meals and save your time!<br /> Let us eat healthy and happy❤️!
        </PadText>
        <PadText>
        Out of ideas for your prep? We got your back!
        </PadText>
        </Container>
        </>
    );
};

export default Home;

const Container = styled.footer`
padding: 100px 0px;
text-align:center;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
color: white;
background-color:#171717;
`;
const StyledTitle = styled.h2`
font-size:24px;
font-family: "Kranky", serif;
font-weight: 600;
font-style: normal;
`;

const PadText = styled.p`
padding-top: 40px;
`;