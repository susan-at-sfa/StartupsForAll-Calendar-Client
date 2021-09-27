import { FC } from "react";
import styled from "@emotion/styled";
import { Redirect, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToken } from "../../store/slices/auth/authSlice";
import { resetUser } from "../../store/slices/user/userSlice";
import EventsList from "../../components/EventList/EventsList";
import "./index.css";

const Admin: FC | any = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const handleLogout = () => {
    dispatch(setToken({ token: "" }));
    dispatch(resetUser());
  };

  if (!user || !user.isAdmin) {
    return <Redirect to={"/"} />;
  }

  return (
    <Wrapper>
      <h1>Admin page</h1>
      <div className="button">
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <EventsList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  padding-top: 14px;
  max-width: 345px;
  margin: 0 auto;
`;

export default Admin;
