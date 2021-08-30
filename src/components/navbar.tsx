import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useState } from "react";

const Navbar: FC = () => {
  const [selected, setSelected] = useState('/add')
  console.log(selected)

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
          return <li key={index}>
            <Link
              onClick={() => setSelected(link.id)}
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
    justify-content: center;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
`

const Link = styled(NavLink)`
  color: #FFFFFF;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  margin-left: 20px;
  border-bottom: 3px solid transparent;
  padding-bottom: 7px;
  .active{
    border-bottom: 3px solid white;
  }
`
