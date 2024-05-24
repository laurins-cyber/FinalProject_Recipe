import styled from "styled-components";

const Footer = () => {

    return(
        <FooterContainer>
            <h2>Contact us</h2>
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
padding: 100px 0px;
text-align:center;
font-family: "Fuzzy Bubbles", sans-serif;
font-weight: 400;
font-style: normal;
color: white;
background-color:#171717;
`;

const PadText = styled.p`

font-size:16px;
`;