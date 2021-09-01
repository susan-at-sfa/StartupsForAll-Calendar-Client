import React, { FC, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { login } from "../../store/slices/auth/authSlice";
import RedButton from "../../components/RedButton";
import FormInput from "../../components/FormInput";
import FormLabel from "../../components/FormLabel";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  function handleLogin() {
    const payload = { username, password };
    dispatch(login(payload));
  }
  return (
    <div className="Login">
      <FormLabel htmlFor="username" text="Username" />
      <FormInput value={username} onChange={setUsername} name="username" />
      <FormLabel htmlFor="password" text="Password" />
      <FormInput
        value={password}
        onChange={setPassword}
        name="password"
        type="password"
      />
      <RedButton
        buttonText="submit"
        onClick={handleLogin}
        buttonType="submit"
      />
    </div>
  );
};

export default Login;
