import { FC, useState } from "react";
import styled from "@emotion/styled";
import headerImage from '../assets/images/s4aHEADER.png';
import logo from '../assets/images/S4ALogo.png';
import Navbar from "./navbar";
import { useLocation } from "react-router";


const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  console.log(location)

  return (
    <Wrapper>
      <Logo src={logo} alt="Startups for All logo" />
      {location.pathname === "/" &&
        <Title>Events</Title>
      }
      {location.pathname === "/add" &&
        <Title>Add Event</Title>
      }
      {location.pathname === "/login" &&
        <Title>Login</Title>
      }
      {location.pathname === "/admin" &&
        <Title>Admin Events</Title>
      }

      <Hamburger className={menuOpen ? "active" : "Hamburger"} onClick={() => setMenuOpen(!menuOpen)}>
        {/* <Hamburger > */}
        <span id='line1' />
        <span id='line2' />
      </Hamburger>

      <Navbar />
    </Wrapper>
  )
}

export default Header;

const Wrapper = styled.section`
      position: fixed;
      height: 250px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(${headerImage});
      background-size: cover;
      overflow: hidden;
      z-index: 3;
      `

const Title = styled.div`
      font-style: normal;
      font-weight: 600;
      font-size: 40px;
      line-height: 54px;
      text-align: center;
      color: #C79288;
      `

const Logo = styled.img`
      position: absolute;
      height: auto;
      width: 200px;
      left: 15px;
      top: 15px;
      `

const Hamburger = styled.div`
  width: 34px;
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  &.active{
      span{
        &:first-child {
          background-color: gray;
          transform: rotate(45deg);
          width: 75%
        }
        &:last-child{
          background-color: gray;
          transform: rotate(-45deg);
          width: 75%;
        }
      }
  }

  span {
    width: 100%;
    height: 1px;
    background-color: #C79288;
    transform-origin: left;
    transition: all 1s ease;
  }
`
