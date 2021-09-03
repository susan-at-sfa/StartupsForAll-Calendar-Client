import React, { FormEvent, FC } from "react";
import EventbriteEvent from "../../store/slices/eventbrite/EventbriteEvent";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import RedButton from "../RedButton";
import styled from "@emotion/styled";

interface EventDetailsFormProps {
  eventDetails: EventbriteEvent;
}

const EventDetailsForm: FC<EventDetailsFormProps> = ({ eventDetails }) => {
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle form submission
  };

  const makeChange = (element: any, value: any) => {
    console.log("make change val:", element, value);
  };

  return (
    <FormContainer>
      {eventDetails.logo ? (
        <img
          src={eventDetails.logo}
          alt="event logo"
          style={{ maxWidth: "100%" }}
        />
      ) : null}
      <form onSubmit={submitForm}>
        {eventDetails.form_elements &&
          eventDetails.form_elements.map((formElement) => {
            const { key, type, placeholder, info, disabled } = formElement;
            let value: string;
            if (
              formElement.key === "Start Time" ||
              formElement.key === "End Time"
            ) {
              value = formElement.value.toLocaleString();
            } else {
              value = formElement.value;
            }
            return (
              <fieldset key={key}>
                {type === "hidden" ? null : (
                  <FormLabel htmlFor={key} text={key} />
                )}
                <FormInput
                  placeholder={placeholder}
                  type={type}
                  required
                  disabled={disabled}
                  onChange={(change) => makeChange(value, change)}
                  value={value}
                  name={key}
                />
                {info ? <span>{info}</span> : null}
              </fieldset>
            );
          })}
        <EventsGreenDiv>
          <ButtonDiv>
            <p>Does this look right?</p>
            <button type="submit" id="dark">
              Cancel
            </button>
            <button type="submit" id="light">
              Submit
            </button>
          </ButtonDiv>
        </EventsGreenDiv>
      </form>
    </FormContainer>
  );
};

export default EventDetailsForm;

const EventsGreenDiv = styled.div`
  display: flex;
  border: none;
  position: fixed;
  height: 90px;
  width: 100vw;
  bottom: 0px;
  background: #7bb1a7;
  z-index: 4;
`;
const FormContainer = styled.div`
  position: relative;
  bottom: 90px;
`;
const ButtonDiv = styled.div`
  position: fixed;
  right: 0;
  bottom: 20px;
  #dark {
    font-weight: 600;
    font-size: 15px;
    color: white;
    width: 100px;
    display: inline;
    height: 35px;
    background-color: #9dd3c9;
    border: none;
  }
  #light {
    font-weight: 600;
    font-size: 15px;
    color: #518077;
    width: 250px;
    height: 35px;
    background-color: #e0f0f1;
    border: none;
  }
  p {
    font-weight: bold;
    margin-bottom: 3px;
    color: white;
  }
`;
