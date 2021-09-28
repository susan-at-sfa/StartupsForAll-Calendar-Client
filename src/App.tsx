import { FC, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Routes } from "./constants/routes";
import { useAppSelector, useAppDispatch } from "./hooks";
import { getAllDbEvents } from "./store/slices/dbEvent/dbEventSlice";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Poppins from "./assets/fonts/Poppins-Medium.ttf";
import PoppinsBold from "./assets/fonts/Poppins-Bold.ttf";
import "react-toastify/dist/ReactToastify.css";
import { device } from "./constants/Device";
//components
import Events from "./containers/Events";
import Login from "./containers/Login";
import Admin from "./containers/Admin";
import Add from "./containers/Add";
import LogoMenu from "./components/Header/LogoMenu";
import Hero from "./components/Header/Hero";
import EventDetailsModal from "./components/EventList/EventDetailsModal";
import FilterModal from "./components/Selections/FilterModal";
import Navbar from "./components/Header/Nav";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDbEvents());
  }, [dispatch]);

  const token = useAppSelector(({ auth }) => auth.token);
  const user = useAppSelector(({ user }) => user);
  console.log("  MAIN APP  \nuser:", user);
  const selectedEventID = useAppSelector(
    ({ eventModal }) => eventModal.selectedEventID
  );
  const eventDetailsModalOpen = useAppSelector(
    ({ eventModal }) => eventModal.eventDetailsModalOpen
  );
  const filterModalOpen = useAppSelector(
    ({ filterModal }) => filterModal.filterModalOpen
  );

  const routes = useMemo(() => {
    const jsx = [
      <Route key={"Events"} path={Routes.Events} exact component={Events} />,
      <Route key={"Add"} path={Routes.Add} exact component={Add} />,
    ];
    if (!token) {
      jsx.push(
        <Route key={"Login"} path={Routes.Login} exact component={Login} />,
        <Redirect key={"RedirectEvents"} to={Routes.Events} />
      );
    } else {
      jsx.push(
        <Route key={"Admin"} path={Routes.Admin} exact component={Admin} />,
        <Redirect key={"RedirectEvents"} to={Routes.Events} />
      );
    }
    return jsx;
  }, [token]);

  return (
    <Wrapper>
      <ToastContainer autoClose={4500} />
      <Router>
        <EventDetailsModal
          selectedEventID={selectedEventID}
          modalOpen={eventDetailsModalOpen}
        />
        <FilterModal modalOpen={filterModalOpen} />
        <LogoMenu />
        <Hero />
        <Sections>
          <Navbar />
          <Switch>{routes}</Switch>
        </Sections>
      </Router>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.section`
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    src: url(${Poppins});
  }
  @font-face {
    font-family: Poppins-Bold;
    font-style: normal;
    font-weight: 600;
    src: url(${PoppinsBold});
  }
  height: 100vh;
  width: 100%;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media ${device.mobile} {
    overflow-x: hidden;
  }
  @media ${device.desktop} {
  }
`;
const Sections = styled.section`
  width: 100%;
  position: sticky;
  top: 0px;
  max-height: calc(100% - 45px);
  overflow: scroll;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
