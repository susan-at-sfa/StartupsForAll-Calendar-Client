import { FC, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Routes } from "./constants/routes";
import { useAppSelector, useAppDispatch } from "./hooks";
import styled from "styled-components";
import { getAllDbEvents } from "./store/slices/dbEvent/dbEventSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { device } from './constants/Device'
//components
import Events from "./containers/Events";
import Login from "./containers/Login";
import Admin from "./containers/Admin";
import Add from "./containers/Add";
import LogoMenu from "./components/Header/LogoMenu";
import Hero from "./components/Header/Hero";
import EventDetailsModal from "./components/EventList/EventDetailsModal";
import FilterModal from "./components/EventList/FilterModal";
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
      <ToastContainer autoClose={3500} />
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
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar{
  display: none;
    }
  @media ${device.mobile} {
    overflow-x: hidden;
  }
  @media ${device.desktop}{
  }
`;
const Sections = styled.section`
  width: 100%;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar{
  display: none;
    }
`;
