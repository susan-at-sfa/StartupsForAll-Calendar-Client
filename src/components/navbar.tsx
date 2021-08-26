import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useState } from "react";

const Navbar: FC = () => {
  const [selected, setSelected] = useState('/')

  const linkList = [
    {
      id: '/',
      title: 'Event List'
    },
    {
      id: '/add',
      title: 'Add Event'
    }
  ]

  return (
    <Wrapper>
      {linkList.map((link, index) => {
        return <NavLink
          key={index}
          onClick={() => setSelected(link.id)}
          to={link.id}
        >
          {link.title}
        </NavLink>
      })}
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
