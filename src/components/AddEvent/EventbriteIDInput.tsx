import { FormEvent, FC, useState } from "react";
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
    <EventbritePasteWrapper>
      <PasteLinkContainer>
        <form onSubmit={submitForm}>
          <FormLabel htmlFor="eventbriteID" text="Enter Event Brite ID" />
          <PasteLink>
            <input
              name="eventbriteID"
              onChange={(e) => setEventbriteID(e.target.value)}
              placeholder="EventBrite ID"
              required
              type="text"
              value={eventbriteID}
            />
            <button type="submit">Get Info</button>
          </PasteLink>
        </form>
      </PasteLinkContainer>
      <SkipEventbrite>
        <p>OR</p>
      </SkipEventbrite>
      <ButtonDiv>
        <button type="submit">
          <span>Create New</span>
        </button>
      </ButtonDiv>
    </EventbritePasteWrapper>
  );
};

export default EventbriteIDInput;

const EventbritePasteWrapper = styled.div`
  display: flex;
`;
const PasteLinkContainer = styled.div`
  display: flex;
  position: fixed;
  top: 285px;
  right: 0;
`;
const PasteLink = styled.div`
  display: flex;
  border: 8px solid #e8d9d6;
  height: 45px;
  width: 350px;
  border-right-width: 0px;
  right: 0;
  button {
    font-weight: bold;
    font-size: 14px;
    flex: 0.4;
    color: white;
    height: 45px;
    background-color: #a36760;
    border: none;
  }
  &:focus-within {
    outline: none;
    border-color: #a36760;
    transition: 0.75s ease;
  }
  input {
    flex: 0.6;
    border: none;
    &::placeholder {
      color: #e8d9d6;
      font-weight: bold;
    }
    &:focus {
      outline: none;
      border-color: #a36760;
      transition: 0.75s ease;
    }
    &:focus::placeholder {
      color: #a36760;
      transition: 0.75s ease;
    }
  }
`;
const SkipEventbrite = styled.div`
  position: fixed;
  top: 375px;
  left: 165px;
`;
const ButtonDiv = styled.div`
  display: flex;
  width: 350px;
  position: fixed;
  top: 435px;
  right: 0;
  span {
    position: relative;
    left: -20px;
  }
  button {
    color: white;
    font-weight: bold;
    font-size: 14px;
    border: none;
    width: 100%;
    height: 35px;
    background-color: #a36760;
  }
`;
