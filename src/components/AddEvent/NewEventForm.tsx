import React, { FC, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import NewEvent from "../../constants/NewEvent.d";
import BlankNewEventInputs from "./BlankNewEventInputs";
import EventbriteEventInfo from "./EventbriteEventInfo";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";

import { Category } from "../../constants/Category.enum";
import { CategoryText } from "../../constants/CategoryText.enum";
import { saveNewEvent } from "../../store/slices/newEvent/newEventSlice";
import { useAppSelector, useAppDispatch, parseIdFromUrl } from "../../hooks";
import { requestEventbriteEvent } from "../../store/slices/eventbrite/eventbriteSlice";
import TopicSelection from "../EventList/TopicSelection";
import CategorySelection from "../EventList/CategorySelection";

interface EventDetailsFormProps {
  eventDetails: NewEvent;
  cancelEvent(): void;
}

const EventDetailsForm: FC<EventDetailsFormProps> = (props) => {
  const { eventDetails } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = useAppSelector(({ auth }) => auth.token);

  console.log("EventDetails component - got props:", eventDetails);
  const { creator_name, creator_email } = useAppSelector(({ user }) => ({
    creator_email: user.email,
    creator_name: user.name,
  }));

  const [customBlurb, setCustomBlurb] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>(
    eventDetails.title || ""
  );
  const [category, setCategory] = useState<Category | string>(
    Category.StartupsForAll
  );
  const [categoryText, setCategoryText] = useState<CategoryText | string>(
    CategoryText.Community
  );
  const [cost, setCost] = useState<string | number>(eventDetails.cost || 0);
  const [currency, setCurrency] = useState<string>(
    eventDetails.currency || "USD"
  );
  const [description, setDescription] = useState<string>(
    eventDetails.description || ""
  );
  const [summary, setSummary] = useState<string>(eventDetails.summary || "");
  const [startDate, setStartDate] = useState<Date | string>(
    eventDetails.start_date
      ? new Date(Date.parse(eventDetails.start_date))
          .toISOString()
          .split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState<Date | string>(
    eventDetails.end_date
      ? new Date(Date.parse(eventDetails.end_date)).toISOString().split("T")[0]
      : ""
  );
  const [endTime, setEndTime] = useState<string>(
    eventDetails.end_time
      ? new Date(Date.parse(eventDetails.end_time)).toLocaleTimeString()
      : ""
  );
  const [startTime, setStartTime] = useState<string>(
    eventDetails.start_time
      ? new Date(Date.parse(eventDetails.start_time)).toLocaleTimeString()
      : ""
  );
  const [location, setLocation] = useState<string>(
    eventDetails.location || "Online"
  );
  const [url, setUrl] = useState<string>(eventDetails.url || "");
  const [topics, setTopics] = useState<string[]>([]);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd: NewEvent = {
      category: category,
      category_text: categoryText,
      changed: eventDetails.changed,
      cost: Number(cost.toString().substring(1)),
      created: eventDetails.created,
      creator_email: creator_email,
      creator_name: creator_name,
      currency: currency,
      description: description,
      end_date: eventDetails.end_date || eventDetails.start_date || startDate,
      end_time: endTime,
      eventbrite_id: eventDetails.id,
      location: location,
      logo: "",
      promoted: false,
      start_date: startDate,
      start_time: startTime,
      summary: "",
      title: eventTitle,
      topics: topics,
      url: url,
    };
    if (eventDetails.logo) {
      fd.logo = eventDetails.logo;
    }
    if (eventDetails.summary) {
      fd.summary = eventDetails.summary;
    }
    dispatch(saveNewEvent({ form: fd, token: token }));
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

  const changeCategory = (category: string) => {
    setCategory(category);
  };

  const getNewEventDetails = async (event: FormEvent<HTMLFormElement>) => {
    console.log("getting new event details...");
    event.preventDefault();
    if (!url) {
      // TODO: add toast here to notify there is no ID input
      return;
    }
    const id = parseIdFromUrl(url);
    if (!id) {
      return;
    }
    dispatch(requestEventbriteEvent({ id }));
    history.push("/add");
  };

  return (
    <Wrapper>
      <PasteLinkContainer>
        <form onSubmit={getNewEventDetails}>
          <FormLabel htmlFor="url" text="Eventbrite Event URL or ID" />
          <PasteLink>
            <TextArea
              name="url"
              onChange={(e) => setUrl(e.target.value)}
              placeholder="EventBrite ID or URL"
              required
              value={url}
            />
            <button type="submit">Update</button>
          </PasteLink>
        </form>
      </PasteLinkContainer>
      <form onSubmit={submitForm}>
        <FormFields>
          <FormLabel htmlFor="creator_name" text="Event Posted By" />
          <FormInput
            placeholder="Event Posted By"
            type="string"
            required
            value={creator_name}
            onChange={() => null}
            name="creator_name"
          />

          <FormLabel htmlFor="custom_blurb" text="Custom Blurb" />
          <TextArea
            placeholder="Custom Blurb"
            required
            value={customBlurb}
            onChange={(e) => setCustomBlurb(e.target.value)}
            name="custom_blurb"
          />

          {eventDetails && eventDetails.id === "" && (
            <BlankNewEventInputs
              eventTitle={eventTitle}
              setEventTitle={setEventTitle}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              location={location}
              setLocation={setLocation}
              cost={cost}
              setCost={setCost}
              currency={currency}
              setCurrency={setCurrency}
              summary={summary}
              setSummary={setSummary}
              url={url}
              setUrl={setUrl}
            />
          )}

          <FormLabel htmlFor="category" text="Category" />
          <StyledContainer>
            <CategorySelection textColor={"white"} onClick={changeCategory} />
          </StyledContainer>

          <FormLabel htmlFor="topics" text="Add Topics Emojis" />
          <StyledContainer>
            <TopicSelection textColor={"#A36760"} onClick={changeTopics} />
          </StyledContainer>

          {eventDetails && eventDetails.id !== "" && (
            <EventbriteEventInfo
              title={eventTitle}
              logo={eventDetails.logo}
              start_date={startDate}
              end_date={endDate}
              start_time={startTime}
              end_time={endTime}
              location={location}
              cost={cost}
              currency={currency}
              summary={summary}
              url={url}
            />
          )}

          <input
            type="hidden"
            name="category_text"
            value={categoryText}
            onChange={(e) => setCategoryText(e.target.value)}
          />
        </FormFields>

        <EventsGreenDiv>
          <ButtonDiv>
            <p>Does this look right?</p>
            <button type="button" id="dark" onClick={props.cancelEvent}>
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
const PasteLinkContainer = styled.div`
  display: flex;
  padding-left: 18px;
  padding-top: 8px;
`;
const PasteLink = styled.div`
  display: flex;
  background-color: #e8d9d6;
  border: 8px solid #e8d9d6;
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
  textarea {
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
const EventsGreenDiv = styled.div`
  display: flex;
  border: none;
  padding: 10px 0 10px 18px;
  height: var(--submit-button-container-height);
  width: 100vw;
  background: #7bb1a7;
  z-index: 2;
`;
const FormFields = styled.div`
  padding-left: 18px;
  padding-top: 8px;
`;
const ButtonDiv = styled.div`
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
const TextArea = styled.textarea`
  font-size: 0.85rem;
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  min-height: 85px;
  padding: 0 15px;
  max-width: 100%;
  max-width: 100vw;
`;
const SelectList = styled.select`
  color: #e8d9d6;
  font-weight: bold;
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  min-height: 45px;
  padding: 0 15px;
  margin-bottom: 15px;
  max-width: 100%;
  max-width: 100vw;
`;
const StyledContainer = styled.div`
  padding: 8px;
  padding-bottom: 0;
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  margin-bottom: 20px;
`;
