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
//components
import Events from "./containers/Events";
import Login from "./containers/Login";
import Admin from "./containers/Admin";
import Add from "./containers/Add";
import Header from "./components/header";
import EventDetailsModal from "./components/EventList/EventDetailsModal";
import FilterModal from "./components/EventList/FilterModal";

const App: FC = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDbEvents())
  }, [dispatch]);

  const token = useAppSelector(({ auth }) => auth.token);
  // const user = useAppSelector(({ user }) => user);
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
      <Router>
        <EventDetailsModal
          selectedEventID={selectedEventID}
          modalOpen={eventDetailsModalOpen}
        />
        <FilterModal modalOpen={filterModalOpen} />
        <Header />
        <Sections>
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
`;

const Sections = styled.section`
  width: 100vw;
<<<<<<< HEAD
  height: calc(100vh - 250px);
  position: absolute;
  overflow-y: scroll;
  top: 250px;
=======
  margin-top: var(--header-height);
>>>>>>> create_event
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
