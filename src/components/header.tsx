import { FC } from "react";
import styled from "@emotion/styled";
import headerImage from '../assets/images/s4aHEADER.png';
import logo from '../assets/images/S4ALogo.png';


const Header: FC = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt="Startups for All logo" />
      <Title>Events</Title>
    </Wrapper>
  )
}

export default Header;

const Title = styled.div`
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 54px;
text-align: center;
color: #C79288;
`

const Wrapper = styled.div`
position: absolute;
  height: 225px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${headerImage});
  background-size: cover;
`

const Logo = styled.img`
position: absolute;
height: auto;
width: 200px;
left: 15px;
top: 15px;
`