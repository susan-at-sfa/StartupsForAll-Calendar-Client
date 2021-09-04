import React, { FormEvent, FC, useState } from "react";
import { useHistory } from "react-router";
import EventbriteEvent from "../../store/slices/eventbrite/EventbriteEvent";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { Topics } from "../../store/slices/eventbrite/Topics.enum";
import { useAppDispatch } from "../../hooks";
import { setEventbrite } from "../../store/slices/eventbrite/eventbriteSlice";

interface EventDetailsFormProps {
  eventDetails: EventbriteEvent;
}

const EventDetailsForm: FC<EventDetailsFormProps> = ({ eventDetails }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [topics, setTopics] = useState<string[]>([]);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle form submission
  };

  const makeChange = (element: any, value: any) => {
    console.log("make change val:", element, value);
  };

  const changeTopics = (topic: string) => {
    const index = topics.indexOf(topic);
    if (index === -1) {
      setTopics([...topics, topic]);
    } else {
      const newTopics = topics.splice(index, 1);
      setTopics(newTopics);
    }
  };

  const cancelEvent = () => {
    const eventData: EventbriteEvent = {};
    dispatch(setEventbrite(eventData));
    history.push("/add");
  };

  return (
    <Wrapper>
      {eventDetails.logo ? (
        <img
          src={eventDetails.logo}
          alt="event logo"
          style={{ maxWidth: "100%" }}
        />
      ) : null}
      <form onSubmit={submitForm}>
        <FormFields>
          {eventDetails.form_elements &&
            eventDetails.form_elements.map((formElement) => {
              const { key, type, placeholder, info, disabled } = formElement;
              let value: string;
              if (
                formElement.key === "start_time" ||
                formElement.key === "end_time"
              ) {
                value = new Date(formElement.value)
                  .toLocaleString()
                  .split(" ")[1]
                  .slice(0, -3);
              } else {
                value = formElement.value;
              }
              return (
                <fieldset key={key} disabled={disabled}>
                  {type === "hidden" ? null : (
                    <FormLabel htmlFor={key} text={placeholder} />
                  )}
                  <FormInput
                    placeholder={placeholder}
                    type={type}
                    required
                    disabled={disabled}
                    onChange={(change) => makeChange(value, change)}
                    value={value}
                    name={placeholder}
                  />
                  {info ? <span>{info}</span> : null}
                </fieldset>
              );
            })}
          <fieldset>
            <FormLabel htmlFor="topics" text="Topics" />
            <select
              multiple={true}
              value={topics}
              onChange={(e) => changeTopics(e.target.value)}
            >
              {Topics.map((topic) => (
                <option value={topic}>{topic}</option>
              ))}
            </select>
          </fieldset>
        </FormFields>
        <EventsGreenDiv>
          <ButtonDiv>
            <p>Does this look right?</p>
            <button type="submit" id="dark" onClick={cancelEvent}>
              Cancel
            </button>
            <button type="submit" id="light">
              Submit
            </button>
          </ButtonDiv>
        </EventsGreenDiv>
      </form>
    </Wrapper>
  );
};

export default EventDetailsForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventsGreenDiv = styled.div`
  display: flex;
  border: none;
  position: fixed;
  height: 90px;
  width: 100vw;
  bottom: 0px;
  background: #7bb1a7;
  z-index: 2;
`;
const FormFields = styled.div`
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
