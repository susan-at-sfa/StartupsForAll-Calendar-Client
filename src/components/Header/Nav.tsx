import { FC, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const Navbar: FC = () => {
  const [selected, setSelected] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const linkList = [
    {
      id: "/",
      title: "Event List",
    },
    {
      id: "/add",
      title: "Add Event",
    },
  ];

  return (
    <Wrapper>
      <ul>
        {linkList.map((link, index) => {
          return (
            <li key={index} className={selected === link.id ? "active" : ""}>
              <Link to={link.id}>{link.title}</Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.section`
  position: sticky;
  top: 40px;
  z-index: 3;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #a36760;
  bottom: 0;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 15px;
  }
  li {
    margin-right: 15px;
    border-bottom: 3px solid transparent;
    padding-bottom: 8px;
    padding-top: 15px;
    &.active {
      border-bottom: 5px solid white;
    }
  }
`;
const Link = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;
