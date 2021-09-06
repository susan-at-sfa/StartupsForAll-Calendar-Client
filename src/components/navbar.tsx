import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useState } from "react";

// export interface NavbarProps {
//   id: string;
//   title: string;
//   isSelected: boolean;
// }

const Navbar: FC = () => {
  const [selected, setSelected] = useState('/')
  console.log("Selected", selected)

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
      <ul>
        {linkList.map((link, index) => {
          return <li
            key={index}
            onClick={() => setSelected(link.id)}
            className={selected === link.id ? "active" : ""}
          >
            <Link
              to={link.id}
            >
              {link.title}
            </Link>
          </li>
        })}
      </ul>
    </Wrapper >
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
  overflow: hidden;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 15px;
  }
  li{
    margin-right: 15px;
    border-bottom: 3px solid transparent;
    padding-bottom: 5px;
    padding-top: 10px;
    &.active{
      border-bottom: 3px solid white;
    }
  }
`

const Link = styled(NavLink)`
  color: #FFFFFF;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  /* margin-left: 20px; */
`
