import { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToken } from "../../store/slices/auth/authSlice";
import { resetUser } from "../../store/slices/user/userSlice";
import EventsList from "../../components/EventList/EventsList";
import EditEventModal from "../../components/EventList/EditEventModal";
import "./index.css";
import { device } from "../../constants/Device";

const Admin: FC | any = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const [eventId, setEventId] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
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
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  if (!user || !user.isAdmin) {
    return <Redirect to={"/"} />;
  }

  const handleLogout = () => {
    dispatch(setToken({ token: "" }));
    dispatch(resetUser());
  };

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setEditModalOpen(false);
    }
  };

  const selectEvent = (id: string) => {
    console.log("ADMIN page - event selected:", id);
    setEventId(id);
    setEditModalOpen(true);
  };

  return (
    <Wrapper onClick={closeModal} ref={modalRef}>
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      {editModalOpen ? (
        <EditEventModal id={eventId} />
      ) : (
        <AdminWrapper>
          <ListEventContainer>
            <EventsList selectEvent={selectEvent} />
          </ListEventContainer>
        </AdminWrapper>
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
  position: absolute;
  right: 0;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: none;
  width: 92px;
  height: 35px;
  background-color: #a36760;
`;

export default Admin;
