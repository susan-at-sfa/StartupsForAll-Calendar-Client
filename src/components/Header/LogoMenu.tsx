import { FC } from "react";
import styled from "@emotion/styled";
import logo from "../../assets/images/S4ALogo.png";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setMenuOpen } from "../../store/slices/menu/menuOpenSlice";
import Menu from "./Menu";

const LogoMenu: FC = () => {
  const menuOpen = useAppSelector(({ menu }) => menu.menuOpen);
  const dispatch = useAppDispatch();

  return (
    <TopSticky>
      <Logo src={logo} alt="Startups for All logo" />
      <Hamburger
        className={menuOpen ? "active" : "Hamburger"}
        onClick={() => dispatch(setMenuOpen(!menuOpen))}
      >
        <span id="line1" />
        <span id="line2" />
        <span id="line3" />
      </Hamburger>
      {menuOpen && <Menu />}
    </TopSticky>
  );
};

export default LogoMenu;

const TopSticky = styled.div`
  position: sticky;
  top: 0;
  margin: 0;
  z-index: 4;
  height: 45px;
  background:transparent;
`;
const Logo = styled.img`
  height: auto;
  width: 200px;
  position: relative;
  z-index: 4;
  padding: 10px 0 3px 10px;
`;
const Hamburger = styled.div`
  width: 34px;
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: fixed;
  top: 10px;
  right: 15px;
  z-index: 100;
  cursor: pointer;
  &.active {
    span {
      &:first-of-type {
        background-color: gray;
        transform: rotate(45deg);
        width: 80%;
      }
      &:nth-of-type(2) {
        opacity: 0;
      }
      &:last-of-type {
        opacity: 100;
        background-color: gray;
        transform: rotate(-45deg);
        width: 80%;
      }
    }
  }
  span {
    width: 100%;
    height: 2px;
    background-color: #c79288;
    transform-origin: left;
    transition: all 0.25s ease;
    &:nth-of-type(3) {
      opacity: 0;
    }
  }
`;
