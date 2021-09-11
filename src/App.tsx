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

const App: FC = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDbEvents())
  }, [dispatch]);

  const token = useAppSelector(({ auth }) => auth.token);
  const user = useAppSelector(({ user }) => user);
  const selectedEventID = useAppSelector(
    ({ eventModal }) => eventModal.selectedEventID
  );
  const eventDetailsModalOpen = useAppSelector(
    ({ eventModal }) => eventModal.eventDetailsModalOpen
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
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Sections = styled.section`
  width: 100vw;
  max-height: calc(100vh - 250px);
  position: absolute;
  top: 250px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
