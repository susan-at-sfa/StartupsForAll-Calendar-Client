import { FC } from "react";
import styled from "@emotion/styled";
import headerImage from "../assets/images/s4aHEADER.png";
import logo from "../assets/images/S4ALogo.png";
import Navbar from "./navbar";
import { useLocation } from "react-router";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setMenuOpen } from "../store/slices/menu/menuOpenSlice";
import Menu from "./Menu";

const Header: FC = () => {
  const menuOpen = useAppSelector(({ menu }) => menu.menuOpen);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // const routeTitles = {
  //   "/": "Events",
  //   "/add": "Add Event",
  //   "/login": "Login",
  //   "/admin": "Admin Events"
  // }

  return (
    <Wrapper className={menuOpen ? "active" : "Wrapper"}>
      <Logo src={logo} alt="Startups for All logo" />
      <Hamburger
        className={menuOpen ? "active" : "Hamburger"}
        onClick={() => dispatch(setMenuOpen(!menuOpen))}
      >
        <span id="line1" />
        <span id="line2" />
        <span id="line3" />
      </Hamburger>
      {menuOpen ? <Menu /> : null}

      {/* {!menuOpen
        ? <Title>{routeTitles[location.pathname]}</Title>
        : null
      } */}

      {menuOpen === false && location.pathname === "/" && <Title>Events</Title>}
      {menuOpen === false && location.pathname === "/add" && (
        <Title>Add Event</Title>
      )}
      {menuOpen === false && location.pathname === "/login" && (
        <Title>Login</Title>
      )}
      {menuOpen === false && location.pathname === "/admin" && (
        <Title>Admin Events</Title>
      )}
      {menuOpen === false && <Navbar />}
    </Wrapper>
  );
};

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
  z-index: 2;
  transition: all 0.5s ease;
  &.active {
    color: black;
    height: 100vh;
    width: 100vw;
    background-color: white;
    background-image: none;
    transition: 0.5s ease;
    z-index: 4;
  }
`;
const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 54px;
  text-align: center;
  color: #c79288;
`;

const Logo = styled.img`
  position: absolute;
  height: auto;
  width: 200px;
  left: 15px;
  top: 15px;
  z-index: 4;
`;

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
  z-index: 4;
  &.active {
    span {
      &:first-of-type {
        background-color: gray;
        transform: rotate(45deg);
        width: 75%;
      }
      &:nth-of-type(2) {
        opacity: 0;
      }
      &:last-of-type {
        opacity: 100;
        background-color: gray;
        transform: rotate(-45deg);
        width: 75%;
      }
    }
  }

  span {
    width: 100%;
    height: 1px;
    background-color: #c79288;
    transform-origin: left;
    transition: all 1s ease;
    &:nth-of-type(3) {
      opacity: 0;
    }
  }
`;
