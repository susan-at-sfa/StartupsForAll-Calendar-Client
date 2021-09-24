import { FC } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToken } from "../../store/slices/auth/authSlice";
import "./index.css";

const Admin: FC | any = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  console.log("Loaded Admin page with user:", user);
  const history = useHistory();

  function handleLogout() {
    dispatch(setToken({ token: "" }));
  }

  if (!user || !user.isAdmin) return history.push("/");

  return (
    <Wrapper>
      <h1>Admin page</h1>
      <div className="button">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export default Admin;
