import { FC } from "react";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../hooks";
import { setToken } from "../../store/slices/auth/authSlice";
import "./index.css";

const Ratings: FC = () => {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(setToken({ token: "" }));
  }

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

export default Ratings;
