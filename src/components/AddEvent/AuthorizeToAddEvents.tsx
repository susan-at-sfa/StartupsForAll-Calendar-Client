import React, { FormEvent, FC, useState } from "react";
import RedButton from "../RedButton";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../hooks";
import { login } from "../../store/slices/auth/authSlice";

const AuthorizeToAddEvents: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const validateAndSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !password) return showValidationErrors();
    const payload = { name, email, password };
    dispatch(login(payload));
  };

  const showValidationErrors = () => {
    // TODO: replace me with a service/modal or something better...
    return alert("VALIDATION ERRORS - this is horrible!");
  };

  return (
    <form onSubmit={validateAndSubmit}>
      <FormLabel htmlFor="name" text="Name" />
      <FormInput
        name="name"
        onChange={setName}
        placeholder="Name"
        required
        type="text"
        value={name}
      />
      <FormLabel htmlFor="email" text="Email Address" />
      <FormInput
        name="email"
        onChange={setEmail}
        placeholder="Email Address"
        required
        type="email"
        value={email}
      />
      <FormLabel htmlFor="password" text="Password" />
      <FormInput
        name="password"
        onChange={setPassword}
        required
        placeholder="Password"
        type="password"
        value={password}
      />
      <ButtonDiv>
        <RedButton buttonText="Submit" buttonType="submit" />
      </ButtonDiv>
    </form>
  );
};

export default AuthorizeToAddEvents;

const ButtonDiv = styled.div``;
