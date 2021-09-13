import { FC, useState } from "react";
import { useAppDispatch } from "../../hooks";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { requestEventbriteEvent } from "../../store/slices/eventbrite/eventbriteSlice";

interface EventbriteIDInputProps {
  newEvent(value: boolean): void;
}

const EventbriteIDInput: FC<EventbriteIDInputProps> = (props) => {
  const [eventbriteID, setEventbriteID] = useState<string>("");
  const dispatch = useAppDispatch();

  const getEventbriteData = async () => {
    if (!eventbriteID) {
      // TODO: add toast here to notify there is no ID input
      return;
    }
    dispatch(requestEventbriteEvent({ id: eventbriteID }));
  };

  return (
    <EventbritePasteWrapper>
      <PasteLinkContainer>
        <FormLabel htmlFor="eventbriteID" text="Eventbrite Event URL or ID" />
        <PasteLink>
          <input
            name="eventbriteID"
            onChange={(e) => setEventbriteID(e.target.value)}
            placeholder="EventBrite ID"
            required
            type="text"
            value={eventbriteID}
          />
          <button type="button" onClick={getEventbriteData}>
            Get Info
          </button>
        </PasteLink>
      </PasteLinkContainer>
      <SkipEventbrite>
        <p>Or</p>
      </SkipEventbrite>
      <ButtonDiv>
        <button type="button" onClick={() => props.newEvent(true)}>
          <span>Create New</span>
        </button>
      </ButtonDiv>
    </EventbritePasteWrapper>
  );
};

export default EventbriteIDInput;

const EventbritePasteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  padding-left: 14px;
`;
const PasteLinkContainer = styled.div`
  display: flex;
`;
const PasteLink = styled.div`
  display: flex;
  border: 8px solid #e8d9d6;
  height: 56px;
  border-right-width: 0px;
  button {
    font-weight: bold;
    font-size: 14px;
    flex: 0.4;
    color: white;
    height: 40px;
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
    padding: 0 6px;
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
  display: flex;
  margin: 30px 0;
  text-align: center;
  justify-content: center;
  align-content: center;
`;
const ButtonDiv = styled.div`
  display: flex;
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
