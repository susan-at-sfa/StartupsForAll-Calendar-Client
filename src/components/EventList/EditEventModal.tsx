import { FC, FormEvent, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useHistory } from "react-router";
import { Category } from "../../constants/Category.enum";
import NewEvent from "../../constants/NewEvent.d";
import { saveNewEvent } from "../../store/slices/newEvent/newEventSlice";
import { toast } from "react-toastify";
import { CategoryText } from "../../constants/CategoryText.enum";
import FormLabel from "../FormLabel";
import BlankNewEventInputs from "../AddEvent/BlankNewEventInputs";
import CategoryRadio from "../Selections/CategoryRadio";
import TopicSelection from "../Selections/TopicSelection";
import { device } from "../../constants/Device";
import { toLocalTime, toUtcDateTime } from "../../helpers";

interface EditEventModalProps {
  id: string;
}

const EditEventModal: FC<EditEventModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = useAppSelector(({ auth }) => auth.token);
  const thisEvent: Record<any, any> = useAppSelector(({ dbEvent }) =>
    dbEvent.dbEvents.filter((ev: any) => ev.id === props.id)
  )[0];
  console.log("EDIT EVENT MODAL WITH ID, EVENT", props.id, thisEvent);

  const [category, setCategory] = useState<Category | string>(
    thisEvent.category
  );
  const [cost, setCost] = useState<string | number>(thisEvent.cost);
  const [creatorName, setCreatorName] = useState<string>(
    thisEvent.creator_name
  );
  const [creatorEmail, setCreatorEmail] = useState<string>(
    thisEvent.creator_email
  );
  const [customBlurb, setCustomBlurb] = useState<string>(
    thisEvent.custom_blurb
  );
  // Dates
  const [startDate, setStartDate] = useState<string>(thisEvent.start_date);
  const [endDate, setEndDate] = useState<string>(thisEvent.end_date);
  const [startTime, setStartTime] = useState<string>(
    toLocalTime(thisEvent.start_date)
  );
  const [endTime, setEndTime] = useState<string>(
    toLocalTime(thisEvent.end_date)
  );
  const [location, setLocation] = useState<string>(thisEvent.location);
  const [promoted, setPromoted] = useState<boolean>(thisEvent.promoted);
  const [summary, setSummary] = useState<string>(thisEvent.summary);
  const [title, setTitle] = useState<string>(thisEvent.title);
  const [topics, setTopics] = useState<string[]>(thisEvent.topics);
  const [url, setUrl] = useState<string>(thisEvent.url);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd: NewEvent = {
      category: category,
      category_text: getCategoryText(),
      changed: thisEvent.changed,
      cost: Number(cost),
      created: thisEvent.created,
      creator_email: creatorEmail,
      creator_name: creatorName,
      custom_blurb: customBlurb,
      location: location,
      promoted: promoted,
      summary: summary,
      title: title,
      topics: topics,
    };
    if (url) {
      fd.url = url;
    }
    if (category !== thisEvent.category) {
      // TODO: change category text so it matches expected for the new category
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
    return console.log("SUBMITTED CHANGED EVENT", thisEvent.id, fd);
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

  const cancelEvent = () => {
    console.log("event changes cancelled");
  };

  return (
    <Wrapper>
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
            eventTitle={title}
            setEventTitle={setTitle}
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
  padding-top: 14px;
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

export default EditEventModal;
