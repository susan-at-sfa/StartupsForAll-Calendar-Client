import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../store/slices/auth/authSlice";
import RedButton from "../../components/RedButton";
import FormInput from "../../components/FormInput";
import FormLabel from "../../components/FormLabel";
import { device } from "../../constants/Device";

const Login: FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useAppSelector(({ user }) => user);
  console.log("USER", user);
  const dispatch = useAppDispatch();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { username, password };
    dispatch(login(payload));
    history.push("/admin");
  }

  return (
    <Wrapper>
      <StyledForm onSubmit={handleLogin}>
        <FormLabel htmlFor="username" text="Username" />
        <FormInput
          value={username}
          onChange={setUsername}
          name="username"
          placeholder="Username"
        />
        <FormLabel htmlFor="password" text="Password" />
        <FormInput
          value={password}
          onChange={setPassword}
          name="password"
          type="password"
          placeholder="Password"
        />
        <Separator />
        <RedButton buttonText="Log In" buttonType="submit" />
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding-left: 14px;
  padding-top: 14px;
  width: 100%;
  @media ${device.forms} {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 650px;
  }
`;
const StyledForm = styled.form`
  padding-left: 14px;
  padding-top: 14px;
`;

const Separator = styled.div`
  margin: 46px;
`;

export default Login;
