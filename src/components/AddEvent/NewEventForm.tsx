import React, { FC, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import NewEvent from "../../constants/NewEvent.d";
import BlankNewEventInputs from "./BlankNewEventInputs";
import EventbriteEventInfo from "./EventbriteEventInfo";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

import { Category } from "../../constants/Category.enum";
import { CategoryText } from "../../constants/CategoryText.enum";
import { saveNewEvent } from "../../store/slices/newEvent/newEventSlice";
import {
  useAppSelector,
  useAppDispatch,
  parseIdFromUrl,
  toLocalDate,
  toLocalTime,
  toUtcDateTime,
} from "../../hooks";
import {
  requestEventbriteEvent,
  resetEventBrite,
} from "../../store/slices/eventbrite/eventbriteSlice";
import TopicSelection from "../EventList/TopicSelection";
import CategorySelection from "../EventList/CategorySelection";
import { getAllDbEvents } from "../../store/slices/dbEvent/dbEventSlice";
import { emptyEvent } from "../../constants/NewEvent";

interface NewEventFormProps {
  eventDetails: NewEvent;
  cancelEvent(): void;
}

const NewEventForm: FC<NewEventFormProps> = (props) => {
  const { eventDetails } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = useAppSelector(({ auth }) => auth.token);

  const { creator_name, creator_email } = useAppSelector(({ user }) => ({
    creator_email: user.email,
    creator_name: user.name,
  }));

  const [customBlurb, setCustomBlurb] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>(
    eventDetails.title || eventDetails.name || ""
  );
  const [category, setCategory] = useState<Category | string>(
    Category.StartupsForAll
  );
  const [cost, setCost] = useState<string | number>(eventDetails.cost || 0);
  const [currency, setCurrency] = useState<string>(
    eventDetails.currency || "USD"
  );
  const [summary, setSummary] = useState<string>(eventDetails.summary || "");
  const [startDate, setStartDate] = useState<Date | string>(
    eventDetails.id !== ""
      ? Object.keys(eventDetails.start).length > 0
        ? toLocalDate(eventDetails.start.utc)
        : new Date()
      : ""
  );
  const [endDate, setEndDate] = useState<Date | string>(
    eventDetails.id !== ""
      ? Object.keys(eventDetails.end).length > 0
        ? toLocalDate(eventDetails.end.utc)
        : new Date()
      : ""
  );
  const [endTime, setEndTime] = useState<string>(
    eventDetails.end_time
      ? toLocalTime(eventDetails.end_time)
      : eventDetails.end
      ? toLocalTime(eventDetails.end.utc)
      : ""
  );
  const [startTime, setStartTime] = useState<string>(
    eventDetails.start_time
      ? toLocalTime(eventDetails.start_time)
      : eventDetails.start
      ? toLocalTime(eventDetails.start.utc)
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
      category_text: getCategoryText(),
      changed: eventDetails.changed,
      cost: Number(cost.toString().substring(1)),
      created: eventDetails.created,
      creator_email: creator_email,
      creator_name: creator_name,
      currency: currency,
      end_time: endTime,
      eventbrite_id: eventDetails.id,
      location: location,
      logo: "",
      promoted: false,
      start_time: startTime,
      summary: "",
      title: eventTitle,
      topics: topics,
    };
    if (eventDetails.logo) {
      fd.logo = eventDetails.logo;
    }
    if (eventDetails.summary) {
      fd.summary = eventDetails.summary;
    }
    if (endDate.toString().includes("Z")) {
      fd.end_date = endDate;
      fd.start_date = startDate;
    } else {
      fd.end_date = toUtcDateTime(endDate, endTime);
      fd.start_date = toUtcDateTime(startDate, startTime);
    }
    if (url) {
      fd.url = url;
    }
    console.log("NEW EVENT FORM SUBMITTED", fd);
    dispatch(saveNewEvent({ form: fd, token: token }));
    dispatch(getAllDbEvents());
    history.push("/");
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
    console.log("change category clicked", category);
    setCategory("");
    setCategory(category);
  };

  const getCategoryText = (): string => {
    if (category === Category.StartupsForAll)
      return CategoryText.StartupsForAll;
    return CategoryText.Community;
  };

  const getNewEventDetails = async (event: FormEvent<HTMLFormElement>) => {
    console.log("getting new event details...");
    event.preventDefault();
    if (!url) {
      toast("Please include a valid Eventbrite Event URL or ID.");
      return;
    }
    const id = parseIdFromUrl(url);
    if (!id) {
      toast(
        "That is not a valid Eventbrite Event URL or ID. Please try again."
      );
      return;
    }
    dispatch(resetEventBrite(emptyEvent));
    dispatch(requestEventbriteEvent({ id }));
    history.push("/add");
  };

  console.log("NewEventForm component - got props.eventDetails:", eventDetails);
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
            <CategorySelection multi={false} onClick={changeCategory} />
          </StyledContainer>

          <FormLabel htmlFor="topics" text="Add Topics Emojis" />
          <StyledContainer>
            <TopicSelection onClick={changeTopics} />
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
              creator_name={creator_name}
              currency={currency}
              summary={summary}
              url={url}
            />
          )}
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

export default NewEventForm;

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
  position: fixed;
  bottom: 0;
`;
const FormFields = styled.div`
  padding-left: 18px;
  padding-top: 8px;
  padding-bottom: 20px;
  margin-bottom: var(--submit-button-container-height);
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
