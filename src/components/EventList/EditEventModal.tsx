import { FC, FormEvent, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useHistory } from "react-router";
import { Category } from "../../constants/Category.enum";
import NewEvent from "../../constants/NewEvent.d";
import {
  resetEvent,
  saveNewEvent,
} from "../../store/slices/newEvent/newEventSlice";
import { toast } from "react-toastify";
import { CategoryText } from "../../constants/CategoryText.enum";
import FormLabel from "../FormLabel";
import BlankNewEventInputs from "../AddEvent/BlankNewEventInputs";
import CategoryRadio from "../Selections/CategoryRadio";
import TopicSelection from "../Selections/TopicSelection";
import { device } from "../../constants/Device";
import { toLocalTime, toUtcDateTime, toLocalDate } from "../../helpers";
import { emptyEvent } from "../../constants/NewEvent";
import { resetEventBrite } from "../../store/slices/eventbrite/eventbriteSlice";

interface EditEventModalProps {
  id: string;
  setEditModalOpen: (e: boolean) => void;
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
  const [startDate, setStartDate] = useState(new Date(thisEvent.start_date));
  const [endDate, setEndDate] = useState(new Date(thisEvent.end_date));

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
    // if (startDate.toString().includes("Z")) {
    //   fd.start_date = startDate;
    // } else {
    //   fd.start_date = toUtcDateTime(startDate, startTime);
    // }
    // if (endDate.toString().includes("Z")) {
    //   fd.end_date = endDate;
    // } else {
    //   fd.end_date = toUtcDateTime(endDate, endTime);
    // }
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
          <ConfirmContainer>
            <p>Does this look right?</p>
            <ButtonDiv>
              <button
                type="button"
                id="cancel"
                onClick={() => props.setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" id="submitButton">
                Submit
              </button>
            </ButtonDiv>
          </ConfirmContainer>
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
const FormFields = styled.div`
  padding-left: 18px;
  padding-top: 8px;
  padding-bottom: 20px;
`;
const EventsGreenDiv = styled.div`
  display: flex;
  flex-direction: column;
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
    width: 100%;
  }
  p {
    font-weight: 600;
    margin-bottom: 3px;
    color: white;
  }
`;
const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 0;
  margin-left: auto;
  @media ${device.forms} {
    margin: 0 auto;
    max-width: 400px;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  #cancel {
    flex: 1;
    font-weight: 600;
    font-size: 15px;
    color: white;
    margin: 0;
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
    flex: 3;
    font-weight: 600;
    font-size: 15px;
    color: #518077;
    margin: 0;
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
