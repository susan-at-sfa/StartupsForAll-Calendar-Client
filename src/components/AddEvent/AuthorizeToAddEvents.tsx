import React, { FormEvent, FC, useState } from "react";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../hooks";
import { login } from "../../store/slices/auth/authSlice";
import { device } from "../../constants/Device";

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
        <FormLabel htmlFor="password" text="SFA Password" />
        <FormInput
          name="password"
          onChange={setPassword}
          required
          placeholder="Enter Password..."
          type="password"
          value={password}
        />
        <FormLabel htmlFor="name" text="Your Name" />
        <FormInput
          name="name"
          onChange={setName}
          placeholder="Name"
          required
          type="text"
          value={name}
        />
        <FormLabel htmlFor="email" text="Your Email" />
        <FormInput
          name="email"
          onChange={setEmail}
          placeholder="Email Address"
          required
          type="email"
          value={email}
        />
        <ButtonDiv>
          <button type="submit">
            <span>Submit</span>
          </button>
        </ButtonDiv>
      </form>
    </EventAuthPage>
  );
};

export default AuthorizeToAddEvents;

const EventAuthPage = styled.div`
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
const ButtonDiv = styled.div`
  display: flex;
  width: 68%;
  margin-top: 25px;
  margin-left: auto;
  button {
    color: white;
    font-weight: 600;
    font-size: 14px;
    border: none;
    width: 100%;
    height: 37px;
    background-color: #a36760;
    &:hover {
      color: #a36760;
      background-color: #e8d9d6;
      cursor: pointer;
      transition: 0.5s ease;
    }
  }
`;
