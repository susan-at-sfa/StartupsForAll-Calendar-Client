import { FC, useState } from "react";
import styled from "@emotion/styled";

const Menu: FC = () => {
  const [cohortMenuOpen, setCohortMenuOpen] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const startUpsURL: string = "https://startupsforall.org/";
  const codaLink: string =
    "https://coda.io/signin?continueTo=%2Fd%2FSfA-Cohort-2-Team-Hub_dNycPZJTj2Q&errorMessage=VW5hdXRob3JpemVk%3AQmdyWWVXeGxnOWFQU2JJVA%3AEcEKH5iyz0P178O72CsqKlb_4Iohya1G6f51eLi8YAM";
  const cohortLinks = [
    {
      id: 1,
      link: "founders-cohort2",
      title: "Cohort 2",
    },
    {
      id: 2,
      link: "founders-cohort1",
      title: "Cohort 1",
    },
  ];
  const dashboardLinks = [
    {
      id: 1,
      link: codaLink,
      title: "Cohort 2(via Coda)",
    },
    {
      id: 2,
      link: startUpsURL + "dashboard",
      title: "Cohort 1",
    },
  ];

  return (
    <MenuContainer>
      <HamburgerMenu>
        {!cohortMenuOpen && !dashboardMenuOpen && !adminMenuOpen ? (
          <ul>
            <li onClick={() => setCohortMenuOpen(true)}>
              <p>{"Meet The Founders >"}</p>
            </li>
            <li>
              <p>
                <a href="https://startupsforall.org/#experts">Our Experts</a>
              </p>
            </li>
            <li onClick={() => setDashboardMenuOpen(true)}>
              <p>{"Cohort Dashboards >"}</p>
            </li>
            <li onClick={() => setAdminMenuOpen(true)}>
              <p>{"Admin >"}</p>
            </li>
          </ul>
        ) : cohortMenuOpen ? (
          <ul>
            <li onClick={() => setCohortMenuOpen(false)}>
              <p>{"< Back"}</p>
            </li>
            {cohortLinks.map((item) => {
              const { id, title, link } = item;
              return (
                <li key={id}>
                  <a href={startUpsURL + link}>{title}</a>
                </li>
              );
            })}
          </ul>
        ) : dashboardMenuOpen ? (
          <ul>
            <li onClick={() => setDashboardMenuOpen(false)}>
              <p>{"< Back"}</p>
            </li>
            {dashboardLinks.map((item) => {
              const { id, title, link } = item;
              return (
                <li key={id}>
                  <a href={link}>{title}</a>
                </li>
              );
            })}
          </ul>
        ) : adminMenuOpen ?
          <ul>
            <li onClick={() => setAdminMenuOpen(false)}>
              <p>{"< Back"}</p>
            </li>
            <li>
              <a href="/login">Admin Login</a>
            </li>
          </ul>
          : null}
      </HamburgerMenu>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 8;
`;
const HamburgerMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: black;
    text-decoration: none;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 0;
    font-size: 30px;
    font-weight: 300;
    font-style: normal;
    text-align: center;
    li {
      cursor: pointer;
    }
  }
`;

export default Menu;
