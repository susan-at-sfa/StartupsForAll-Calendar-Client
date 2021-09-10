import React, { FC, useState } from "react";
import NewEvent from "../../constants/NewEvent.d";
import { Topics } from "../../constants/Topics.enum";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { saveNewEvent } from "../../store/slices/newEvent/newEventSlice";

import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { Category } from "../../constants/Category.enum";
import { CategoryText } from "../../constants/CategoryText.enum";
interface EventDetailsFormProps {
  eventDetails: NewEvent;
  cancelEvent(): void;
}

const EventDetailsForm: FC<EventDetailsFormProps> = (props) => {
  const { eventDetails } = props;
  const dispatch = useAppDispatch();
  const token = useAppSelector(({ auth }) => auth.token);

  console.log("EventDetails component - got props:", eventDetails);
  const { creator_name, creator_email } = useAppSelector(({ user }) => ({
    creator_email: user.email,
    creator_name: user.name,
  }));

  // const dispatch = useAppDispatch();
  const [eventTitle, setEventTitle] = useState<string>(
    eventDetails.title || ""
  );
  // const [eventReferrer, setEventReferrer] = useState<string>(
  //   eventDetails.creator_name || ""
  // );
  const [category, setCategory] = useState<Category | string>(
    Category.StartupsForAll
  );
  const [categoryText, setCategoryText] = useState<CategoryText | string>(
    CategoryText.StartupsForAll
  );
  const [cost, setCost] = useState<string | number>(eventDetails.cost || 0);
  const [currency, setCurrency] = useState<string>(
    eventDetails.currency || "USD"
  );
  const [description, setDescription] = useState<string>(
    eventDetails.description || ""
  );
  // const [endDate, setEndDate] = useState<Date | string>(
  //   eventDetails.end_date.toISOString().split("T")[0] || null
  // );
  const [startDate, setStartDate] = useState<Date | string>(
    eventDetails.start_date
      ? new Date(Date.parse(eventDetails.start_date))
          .toISOString()
          .split("T")[0]
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

  // const { register, handleSubmit, watch } = useForm<NewEvent>({
  //   resolver: yupResolver(schema),
  // });

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("FORM SUBMIT");
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
      end_date: eventDetails.end_date,
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
    console.log(fd);
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

  return (
    <Wrapper>
      <form onSubmit={submitForm}>
        <FormFields>
          <fieldset>
            <FormLabel htmlFor="url" text="Eventrite URL or ID" />
            <FormInput
              placeholder="URL"
              type="text"
              required
              disabled={false}
              value={url}
              onChange={setUrl}
              name="url"
            />
            {eventDetails.logo ? (
              <img
                src={eventDetails.logo}
                alt="event logo"
                style={{ maxWidth: "100%" }}
              />
            ) : null}
            <FormLabel htmlFor="title" text="Title" />
            <FormInput
              placeholder="Title"
              type="text"
              required
              disabled={false}
              value={eventTitle}
              onChange={setEventTitle}
              name="title"
            />
            <FormLabel htmlFor="creator_name" text="Event Posted By" />
            <FormInput
              placeholder="Event Referrer"
              type="string"
              required
              disabled={false}
              value={creator_name}
              onChange={() => null}
              name="creator_name"
            />
            <FormLabel htmlFor="start_date" text="Date" />
            <FormInput
              placeholder="Date"
              type="date"
              required
              disabled={false}
              value={startDate}
              onChange={setStartDate}
              name="start_date"
            />
            {/* <FormLabel htmlFor="end_date" text="End Date" />
            <FormInput
              placeholder="End Date"
              type="date"
              required
              disabled={false}
              value={endDate}
              onChange={setEndDate}
              name="end_date"
            /> */}
            <FormLabel htmlFor="start_time" text="Start Time" />
            <FormInput
              placeholder="Start Time"
              type="text"
              required
              disabled={false}
              value={startTime}
              onChange={setStartTime}
              name="start_time"
            />
            <FormLabel htmlFor="end_time" text="End Time" />
            <FormInput
              placeholder="End Time"
              type="text"
              required
              disabled={false}
              value={endTime}
              onChange={setEndTime}
              name="end_time"
            />
            <FormLabel htmlFor="location" text="Location" />
            <FormInput
              placeholder="Location"
              type="text"
              required
              disabled={false}
              value={location}
              onChange={setLocation}
              name="location"
            />
            <FormLabel htmlFor="cost" text="Cost" />
            <FormInput
              placeholder="Cost"
              type="string"
              required
              disabled={false}
              value={cost}
              onChange={setCost}
              name="cost"
            />
          </fieldset>
          <fieldset>
            <FormLabel htmlFor="topics" text="Topics" />
            <select
              multiple={true}
              value={topics}
              onChange={(e) => changeTopics(e.target.value)}
            >
              {Topics.map((topic) => (
                <option value={topic} key={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <FormLabel htmlFor="description" text="Description" />
            <textarea
              placeholder="Description"
              required
              disabled={false}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              rows={12}
            />
            <FormLabel htmlFor="category" text="Category" />
            <select
              value={category}
              defaultValue={Category.StartupsForAll}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={Category.Experts}>Experts</option>
              <option value={Category.Founders}>Founders</option>
              <option value={Category.StartupsForAll}>Startups For All</option>
            </select>
            <select
              value={categoryText}
              onChange={(e) => setCategoryText(e.target.value)}
              defaultValue={CategoryText.StartupsForAll}
            >
              <option value={CategoryText.StartupsForAll}>
                {CategoryText.StartupsForAll}
              </option>
              <option value={CategoryText.Community}>
                {CategoryText.Community}
              </option>
            </select>
          </fieldset>
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
