import React, { FormEvent, FC, useState } from "react";
import RedButton from "../RedButton";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";

interface EventbriteIDInputProps {
  handleSubmit(value: string): void;
}

const EventbriteIDInput: FC<EventbriteIDInputProps> = (props) => {
  const [eventbriteID, setEventbriteID] = useState<string>("");

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSubmit(eventbriteID);
  };

  return (
    <form onSubmit={submitForm}>
      <FormLabel htmlFor="eventbriteID" text="Enter Event Brite ID" />
      <FormInput
        name="eventbriteID"
        onChange={setEventbriteID}
        placeholder="EventBrite ID"
        required
        type="text"
        value={eventbriteID}
      />
      <ButtonDiv>
        <RedButton buttonText="Get Info" buttonType="submit" />
      </ButtonDiv>
    </form>
  );
};

export default EventbriteIDInput;

const ButtonDiv = styled.div``;
