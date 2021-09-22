import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../hooks";
import { login } from "../../store/slices/auth/authSlice";
import RedButton from "../../components/RedButton";
import FormInput from "../../components/FormInput";
import FormLabel from "../../components/FormLabel";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { username, password };
    dispatch(login(payload));
  }
  return (
    <Wrapper onSubmit={handleLogin}>
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
    </Wrapper>
  );
};

const Wrapper = styled.form`
  padding-left: 14px;
  padding-top: 14px;
`;

const Separator = styled.div`
  margin: 46px;
`;

export default Login;
