import React, { FormEvent, FC, useState } from "react";
// import RedButton from "../RedButton";
// import FormInput from "../FormInput";
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
      username: "eventKey", // TODO: is this secure or do I need a DTO for eventKey on the back?
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
        <input
          required
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <FormLabel text="Email Address" />
        <input
          required
          placeholder="Email Address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <FormLabel text="Password" />
        <input
          required
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ButtonDiv>
        <button
          // buttonText="Submit"
          // TODO: edit RedButton to take in a button type prop/attribute
          type="submit"
        >
          Submit
        </button>
      </ButtonDiv>
    </form>
  );
};

export default AuthorizeToAddEvents;

const ButtonDiv = styled.div``;
