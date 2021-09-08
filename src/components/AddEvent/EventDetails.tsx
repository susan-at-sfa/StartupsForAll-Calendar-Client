import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import EventbriteEvent from "../../store/slices/eventbrite/EventbriteEvent";
import AddEventFormInput from "./AddEventFormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { Topics } from "../../store/slices/eventbrite/Topics.enum";
import { useAppDispatch } from "../../hooks";
import { setEventbrite } from "../../store/slices/eventbrite/eventbriteSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  creator_email: yup.string().required(),
  creator_name: yup.string().required(),
  event_link: yup.string().required(),
  cost: yup.number().required(),
  when: yup.date().required(),
  where: yup.string().required(),
  who: yup.string().required(),
  topics: yup
    .string()
    .oneOf([...Topics])
    .required(),
});
interface EventDetailsFormProps {
  eventDetails: EventbriteEvent;
}

const EventDetailsForm: FC<EventDetailsFormProps> = ({ eventDetails }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [topics, setTopics] = useState<string[]>([]);

  const { register, handleSubmit, watch } = useForm<EventbriteEvent>({
    resolver: yupResolver(schema),
  });

  const submitForm = (event: any) => {
    event.preventDefault();
    console.log("FORM SUBMIT");
    handleSubmit((data) => console.log(data));
  };

  // const submitForm = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // TODO: handle form submission
  //   // handleSubmit(event);
  // };
  // const onSubmit = (data: TetherFormData) => {
  //   dispatch(createTether({ data, onSuccess }));
  //   // setFormStep('two');
  // };

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
    const eventData: EventbriteEvent = {} as EventbriteEvent;
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
          <fieldset>
            <AddEventFormInput
              placeholder="null"
              type="hidden"
              required
              disabled={true}
              value={eventDetails.changed}
              // name="changed"
              {...register("changed")}
            />
            <AddEventFormInput
              placeholder="null"
              type="hidden"
              required
              disabled={true}
              value={eventDetails.created}
              // name="created"
              {...register("created")}
            />
            <FormLabel htmlFor="name" text="Name" />
            <AddEventFormInput
              placeholder="Name"
              type="text"
              required
              disabled={false}
              value={eventDetails.name}
              // name="name"
              {...register("name")}
            />
            <FormLabel htmlFor="cost" text="Cost" />
            <AddEventFormInput
              placeholder="Cost"
              type="text"
              required
              disabled={false}
              value={eventDetails.cost}
              // name="cost"
              {...register("cost")}
            />
            <FormLabel htmlFor="summary" text="Summary" />
            <AddEventFormInput
              placeholder="Summary"
              type="text"
              required
              disabled={false}
              value={eventDetails.summary}
              // name="summary"
              {...register("summary")}
            />
            <FormLabel htmlFor="url" text="URL" />
            <AddEventFormInput
              placeholder="URL"
              type="text"
              required
              disabled={false}
              value={eventDetails.url}
              // name="url"
              {...register("url")}
            />
            <FormLabel htmlFor="start_date" text="Start Date" />
            <AddEventFormInput
              placeholder="Start Date"
              type="date"
              required
              disabled={false}
              value={eventDetails.start_date}
              // name="start_date"
              {...register("start_date")}
            />
            <FormLabel htmlFor="end_date" text="End Date" />
            <AddEventFormInput
              placeholder="End Date"
              type="date"
              required
              disabled={false}
              value={eventDetails.end_date}
              // name="end_date"
              {...register("end_date")}
            />
            <FormLabel htmlFor="start_time" text="Start Time" />
            <AddEventFormInput
              placeholder="Start Time"
              type="text"
              required
              disabled={false}
              value={eventDetails.start_time}
              // name="start_time"
              {...register("start_time")}
            />
            <FormLabel htmlFor="end_time" text="End Time" />
            <AddEventFormInput
              placeholder="End Time"
              type="text"
              required
              disabled={false}
              value={eventDetails.end_time}
              // name="end_time"
              {...register("end_time")}
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
                <option value={topic}>{topic}</option>
              ))}
            </select>
          </fieldset>
        </FormFields>
        <EventsGreenDiv>
          <ButtonDiv>
            <p>Does this look right?</p>
            <button type="button" id="dark" onClick={cancelEvent}>
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
