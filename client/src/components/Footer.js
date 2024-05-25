import styled from "styled-components";

const Footer = () => {

    return(
        <FooterContainer>
            <StyledTitle>Contact us</StyledTitle>
            <PadText>
            Email:  foodielove_allday@gmail.com
            </PadText>
            <PadText>
            Insta: Foodie_love_allDay
            </PadText>
        </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.footer`
padding: 200px 0px;
text-align:center;
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
font-size:16px;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
`;