import React, { FormEvent, FC, useState } from "react";
import RedButton from "../RedButton";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { makeRequest } from "../../store/utils/makeRequest";

const AuthorizeToAddEvents: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validateAndSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !password) return showValidationErrors();
    const formData = {
      name: name,
      email: email,
      password: password,
    };
    console.log("validate and submit clicked", name, email, password, formData);
    const { success, data, error } = await makeRequest(
      `${process.env.REACT_APP_API_URL}/confirm-privileges`,
      "POST",
      formData
    );
    console.log("got result from makeRequest:", success, data, error);
  };

  const showValidationErrors = () => {
    // TODO: replace me with a service/modal or something better...
    return alert("VALIDATION ERRORS - this is horrible!");
  };

  return (
    <form onSubmit={validateAndSubmit}>
      <div>
        <FormLabel text="Name" />
        <FormInput required placeholder="Name" type="text" onChange={setName} />
      </div>
      <div>
        <FormLabel text="Email Address" />
        <FormInput
          required
          placeholder="Email Address"
          type="email"
          onChange={setEmail}
        />
      </div>
      <div>
        <FormLabel text="Password" />
        <FormInput
          required
          placeholder="Password"
          type="password"
          onChange={setPassword}
        />
      </div>
      <ButtonDiv>
        <RedButton buttonText="Submit" buttonType="submit" />
      </ButtonDiv>
    </form>
  );
};

export default AuthorizeToAddEvents;

const ButtonDiv = styled.div``;
