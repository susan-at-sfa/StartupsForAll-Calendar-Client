import { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { makeRequest } from "../../store/utils/makeRequest";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToken } from "../../store/slices/auth/authSlice";
import { resetUser } from "../../store/slices/user/userSlice";
import EventsList from "../../components/EventList/EventsList";
import EditEventModal from "../../components/EventList/EditEventModal";
import AdminGoogle from "../../components/Google/AdminGoogle";
import { device } from "../../constants/Device";
import "./index.css";

const Admin: FC | any = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const [eventId, setEventId] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState<boolean>(false);
  const modalRef: any = useRef();

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && editModalOpen) {
        setEditModalOpen(false);
      }
    },
    [setEditModalOpen, editModalOpen]
  );

  useEffect(() => {
    checkGoogleAuthStatus();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const checkGoogleAuthStatus = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await makeRequest(`${apiUrl}/oAuthTokenStatus`, "Get");
    {
      response.data === true ? setIsGoogleAuth(true) : setIsGoogleAuth(false);
    }
  };

  if (!user || !user.isAdmin) {
    return <Redirect to={"/"} />;
  }

  const handleLogout = () => {
    dispatch(setToken({ token: "" }));
    dispatch(resetUser());
    history.push("/");
  };

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setEditModalOpen(false);
    }
  };

  const selectEvent = (id: string) => {
    setEventId(id);
    setEditModalOpen(true);
  };

  return (
    <Wrapper onClick={closeModal} ref={modalRef}>
      {editModalOpen ? (
        <EditEventModal id={eventId} setEditModalOpen={setEditModalOpen} />
      ) : (
        <Container>
          <h1>Administration</h1>
          <AdminWrapper>
            <Title>Account</Title>
            <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
            {!isGoogleAuth ? <Title>Google Calendar</Title> : null}
            <AdminGoogle isGoogleAuth={isGoogleAuth} />
            <ListEventContainer>
              <Title>Events</Title>
              <EventsList selectEvent={selectEvent} />
            </ListEventContainer>
          </AdminWrapper>
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  z-index: 5;
  padding-bottom: 80px;
  padding-top: 14px;
`;
const Title = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin: 20px 0 3px;
  padding: 10px 0 3px;
`;
const Container = styled.div`
  max-width: 340px;
  margin: 0 auto;
`;
const ListEventContainer = styled.div`
  width: 340px;
  margin: 0 auto;
`;
const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media ${device.forms} {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 650px;
  }
`;
const LogoutButton = styled.button`
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: none;
  width: 100%;
  max-width: 200px;
  height: 35px;
  background-color: #a36760;
`;

export default Admin;
