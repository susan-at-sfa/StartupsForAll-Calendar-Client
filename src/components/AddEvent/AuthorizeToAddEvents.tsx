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

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { name, email, password };
    dispatch(login(payload));
  };

  return (
    <EventAuthPage>
      <form onSubmit={submitForm}>
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
          <button type="submit"><span>Submit</span></button>
        </ButtonDiv>
      </form>
    </EventAuthPage>
  );
};

export default AuthorizeToAddEvents;

const EventAuthPage = styled.div`
display: flex;
position: fixed;
right: 0;
top: 275px;
`

const ButtonDiv = styled.div`
display: flex;
width: 350px;
position: fixed;
bottom: 185px;
right: 0;
span{
  position: relative;
  left: -15px;
}
button{
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  width: 100%;
  height: 35px;
  background-color: #a36760;
}
`