import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Navbar: FC = () => {
  return (
    <Wrapper>
      <NavLink to="/">Event List</NavLink>
      <NavLink to="/add">Add Event</NavLink>
    </Wrapper>
  )
};

export default Navbar;

const Wrapper = styled.section`
display: flex;
align-items: center;
position: absolute;
width: 100%;
height: 48px;
background-color: #A36760;
bottom: 0;
`
const NavLink = styled(Link)`
color: #FFFFFF;
text-decoration: none;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 30px;
margin-left: 20px;
`
