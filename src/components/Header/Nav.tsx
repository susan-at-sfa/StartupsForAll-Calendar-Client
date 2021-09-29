import { FC, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { device } from "../../constants/Device";
import { useAppSelector } from "../../hooks";

const Navbar: FC = () => {
  const user = useAppSelector(({ user }) => user);
  const [selected, setSelected] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  let linkList = [
    {
      id: "/",
      title: "Event List",
    },
    {
      id: "/add",
      title: "Add Event",
    },
  ];

  if (user && user.isAdmin) {
    linkList.push({
      id: "/admin",
      title: "Admin",
    });
  }

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
  margin-top: 165px;
  padding-left: 30px;
  top: 0px;
  z-index: 3;
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #a36760;
  bottom: 0;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }
  li {
    border-bottom: 3px solid transparent;
    margin-right: 40px;
    @media ${device.desktop} {
      padding-top: 14px;
      padding-bottom: 9px;
    }
    @media ${device.mobile} {
      padding-top: 12px;
      padding-bottom: 8px;
    }
    &.active {
      border-bottom: 4px solid white;
    }
  }
`;
const Link = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;
