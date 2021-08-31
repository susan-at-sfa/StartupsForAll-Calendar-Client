import { FC, useState } from "react";
import styled from "@emotion/styled";

const Menu: FC = () => {
  const [cohortMenuOpen, setCohortMenuOpen] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);

  return (
    <HamburgerMenu>
      {!cohortMenuOpen && !dashboardMenuOpen
        ? (
          <ul>
            <li onClick={() => setCohortMenuOpen(true)}>
              {/* Need to open secondary menu with links to cohort 1/cohort2 */}
              <h4>Meet The Founders</h4>
            </li>
            <li>
              <a href='https://startupsforall.org/#experts'>Our Experts</a>
            </li>
            <li onClick={() => setDashboardMenuOpen(true)}>
              {/* Need to open secondary menu with links to cohort 1 and 2 dashboards */}
              <h4>Cohort Dashboards</h4>
            </li>
          </ul>
        )
        : cohortMenuOpen
          ? (
            <ul>
              <li onClick={() => setCohortMenuOpen(false)}>
                <h4>{"<Back"}</h4>
              </li>
              <li>
                <a href="">Cohort</a>
              </li>
            </ul>
          )
          : dashboardMenuOpen
            ? (
              <ul>
                <li onClick={() => setDashboardMenuOpen(false)}>
                  <h4>{"<Back"}</h4>
                </li>
                <li>
                  <a href="">Dashboard</a>
                </li>
              </ul>
            )
            : null
      }
    </HamburgerMenu>
  )
}

const HamburgerMenu = styled.div`
h4{
  color: white
}
      /* width: 100vw;
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
  } */
      `



export default Menu;