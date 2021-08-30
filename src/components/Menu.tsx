import { FC } from "react";
import styled from "@emotion/styled";
import { setMenuOpen } from "../store/slices/menu/menuOpenSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Menu: FC = () => {
  const menuOpen = useAppSelector(({ menu }) => menu.menuOpen);
  const dispatch = useAppDispatch();
  console.log("MENU STATE", menuOpen)

  return (
    <HamburgerMenu className={'menu ' + (menuOpen && 'active')} id='menu'>
      <ul>
        <li onClick={() => dispatch(setMenuOpen(false))}>
          <a href='./events'>Home</a>
        </li>
      </ul>
    </HamburgerMenu >
  )
}

const HamburgerMenu = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: fixed;
  top: 0;
  right: -400px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 1s ease;
  &.active{
    right: 0
  }
`



export default Menu;