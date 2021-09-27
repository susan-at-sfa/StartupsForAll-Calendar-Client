import { FC, FormEvent, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ListEventProps } from "./ListEvent";
import { useHistory } from "react-router";
import { Category } from "../../constants/Category.enum";
import { parseIdFromUrl, toLocalTime, toUtcDateTime } from "../../helpers";
import NewEvent from "../../constants/NewEvent.d";
import { emptyEvent } from "../../constants/NewEvent";
import { saveNewEvent } from "../../store/slices/newEvent/newEventSlice";
import { toast } from "react-toastify";
import { CategoryText } from "../../constants/CategoryText.enum";
import {
  requestEventbriteEvent,
  resetEventBrite,
} from "../../store/slices/eventbrite/eventbriteSlice";
import FormLabel from "../FormLabel";
import BlankNewEventInputs from "../AddEvent/BlankNewEventInputs";
import CategoryRadio from "../Selections/CategoryRadio";
import TopicSelection from "../Selections/TopicSelection";
import { device } from "../../constants/Device";

const EditEvent: FC<ListEventProps> = (props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = useAppSelector(({ auth }) => auth.token);

  const { creator_name, creator_email } = useAppSelector(({ user }) => ({
    creator_email: user.email,
    creator_name: user.name,
  }));

  const [customBlurb, setCustomBlurb] = useState<string>("");
  const [eventTitle, setEventTitle] = useState<string>(props.title || "");
  const [category, setCategory] = useState<Category | string>(
    Category.Community
  );
  const [cost, setCost] = useState<string | number>(props.cost || 0);
  const [summary, setSummary] = useState<string>(props.summary || "");

  // Dates
  const [startDate, setStartDate] = useState<string>(props.start || "");
  const [endDate, setEndDate] = useState<string>(props.end || "");
  const [startTime, setStartTime] = useState<string>(
    props.start !== "" ? toLocalTime(props.start || "") : ""
  );
  const [endTime, setEndTime] = useState<string>(
    props.end !== "" ? toLocalTime(props.end || "") : ""
  );

  const [location, setLocation] = useState<string>(props.location || "Online");
  const [url, setUrl] = useState<string>(props.url || "");
  const [topics, setTopics] = useState<string[]>([]);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd: NewEvent = {
      category: category,
      category_text: getCategoryText(),
      changed: props.changed,
      cost: Number(cost),
      created: props.created,
      creator_email: creator_email,
      creator_name: creator_name,
      custom_blurb: customBlurb,
      location: location,
      promoted: false,
      summary: summary,
      title: eventTitle,
      topics: topics,
    };
    if (url) {
      fd.url = url;
    }
    // Eventbrite events start and end dates are already in UTC format (ie: they contain the Z)
    if (startDate.toString().includes("Z")) {
      fd.start_date = startDate;
    } else {
      fd.start_date = toUtcDateTime(startDate, startTime);
    }
    if (endDate.toString().includes("Z")) {
      fd.end_date = endDate;
    } else {
      fd.end_date = toUtcDateTime(endDate, endTime);
    }
    dispatch(
      saveNewEvent({
        form: fd,
        token: token,
      })
    );
    history.push("/");
  };

  const changeTopics = (topic: string) => {
    const alreadyInList = topics.includes(topic);
    console.log(
      `New topic ${topic}. Previous Topics list ${topics}. Was in the last already? ${alreadyInList}`
    );
    if (!alreadyInList) {
      if (topics.length >= 2) {
        return toast("Please limit to two Topics max.");
      }
      setTopics([...topics, topic]);
    } else {
      const newTopics = topics.filter((top) => top !== topic);
      setTopics(newTopics);
    }
  };

  const changeCategory = (category: string) => {
    setCategory("");
    setCategory(category);
  };

  const getCategoryText = (): string => {
    if (category === Category.Community) return CategoryText.StartupsForAll;
    return CategoryText.Community;
  };

  const getNewprops = async (event: FormEvent<HTMLFormElement>) => {
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

  const cancelEvent = () => {
    console.log("event changes cancelled");
  };

  return (
    <Wrapper>
      <PasteLinkContainer>
        <form onSubmit={getNewprops}>
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
          <FormLabel htmlFor="custom_blurb" text="Custom Blurb" />
          <TextArea
            placeholder="Custom Blurb"
            required
            value={customBlurb}
            onChange={(e) => setCustomBlurb(e.target.value)}
            name="custom_blurb"
          />

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
            summary={summary}
            setSummary={setSummary}
            url={url}
            setUrl={setUrl}
          />

          <FormLabel htmlFor="category" text="Category" />
          <StyledContainer>
            <CategoryRadio
              selectedCategory={category}
              onChange={changeCategory}
            />
          </StyledContainer>

          <FormLabel htmlFor="topics" text="Add Topics" />
          <StyledContainer>
            <TopicSelection onClick={changeTopics} selectedState={topics} />
          </StyledContainer>
        </FormFields>

        <EventsGreenDiv>
          <ButtonDiv>
            <p>Does this look right?</p>
            <button type="button" id="cancel" onClick={cancelEvent}>
              Cancel
            </button>
            <button type="submit" id="submitButton">
              Submit
            </button>
          </ButtonDiv>
        </EventsGreenDiv>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media ${device.forms} {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 650px;
  }
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
    font-weight: 600;
    font-size: 14px;
    flex: 0.4;
    color: white;
    height: 40px;
    background-color: #a36760;
    border: none;
    &:hover {
      color: white;
      background-color: var(--button-dark-hover);
      cursor: pointer;
      transition: 0.5s ease;
    }
  }
  &:focus-within {
    outline: none;
    background-color: var(--input-focus);
    border-color: var(--input-focus);
    transition: 0.75s ease;
  }
  textarea {
    flex: 0.6;
    border: none;
    padding-top: 12px;
    padding-bottom: 12px;
    &::placeholder {
      color: #e8d9d6;
      font-weight: 600;
    }
    &:focus {
      outline: none;
      border-color: var(--input-focus);
      transition: 0.75s ease;
    }
    &:focus::placeholder {
      color: var(--input-focus);
      transition: 0.75s ease;
    }
  }
`;
const EventsGreenDiv = styled.div`
  display: flex;
  border: none;
  padding: 10px 0 10px 18px;
  height: var(--submit-button-container-height);
  width: 100%;
  background: #7bb1a7;
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  @media ${device.forms} {
    display: block;
    width: 100%;
  }
`;
const FormFields = styled.div`
  padding-left: 18px;
  padding-top: 8px;
  padding-bottom: 20px;
  margin-bottom: var(--submit-button-container-height);
`;
const ButtonDiv = styled.div`
  display: block;
  width: 100%;
  margin-right: 0;
  margin-left: auto;
  @media ${device.forms} {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 400px;
  }
  #cancel {
    font-weight: 600;
    font-size: 15px;
    color: white;
    margin: 0;
    width: 30%;
    min-width: 80px;
    max-width: 110px;
    display: inline;
    height: 35px;
    background-color: #9dd3c9;
    border: none;
    &:hover {
      color: #518077;
      background-color: #c0e3dc;
      transition: 0.5s ease;
      cursor: pointer;
    }
  }
  #submitButton {
    font-weight: 600;
    font-size: 15px;
    color: #518077;
    margin: 0;
    width: 70%;
    min-width: 150px;
    max-width: 250px;
    height: 35px;
    background-color: #e0f0f1;
    border: none;
    &:hover {
      color: #375f57;
      background-color: #fff;
      transition: 0.5s ease;
      cursor: pointer;
    }
  }
  p {
    font-weight: 600;
    margin-bottom: 3px;
    color: white;
  }
`;
const TextArea = styled.textarea`
  font-size: 0.85rem;
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  min-height: 85px;
  padding: 12px 15px;
  max-width: 100%;
  max-width: 100vw;
  &::placeholder {
    color: #e8d9d6;
    font-weight: 600;
  }
  &:focus {
    outline: none;
    border-color: var(--input-focus);
    transition: 0.75s ease;
  }
  &:focus::placeholder {
    color: var(--input-focus);
    transition: 0.75s ease;
  }
`;
const StyledContainer = styled.div`
  padding: 8px;
  padding-bottom: 0;
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  margin-bottom: 20px;
`;

export default EditEvent;
