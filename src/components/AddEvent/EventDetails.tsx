import React, { FormEvent, FC, useState } from "react";
import RedButton from "../RedButton";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import FormattedEvent from "./formattedEvent";

interface EventDetailsFormProps {
  handleSubmit(value: string): void;
  eventDetails: FormattedEvent;
}

const EventDetailsForm: FC<EventDetailsFormProps> = (props) => {
  const [eventbriteID, setEventbriteID] = useState<string>("");

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSubmit(eventbriteID);
  };

  return (
    <form onSubmit={submitForm}>
      {Object.keys(props.eventDetails).map((detail) => {
        console.log(detail);
        return (
          <React.Fragment key={detail}>
            <FormLabel htmlFor={detail} text="Enter Event Brite ID" />
            <FormInput
              name={detail}
              onChange={setEventbriteID}
              placeholder={detail}
              required
              type="text"
              value={detail}
            />
          </React.Fragment>
        );
      })}
      ;
      <ButtonDiv>
        <RedButton buttonText="Add Event" buttonType="submit" />
      </ButtonDiv>
    </form>
  );
};

export default EventDetailsForm;

const ButtonDiv = styled.div``;
