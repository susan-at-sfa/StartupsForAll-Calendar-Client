import React, { FC, useState } from "react";
import EventbriteEvent from "../../store/slices/eventbrite/EventbriteEvent";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import styled from "@emotion/styled";
import { Topics } from "../../store/slices/eventbrite/Topics.enum";
import { useAppDispatch } from "../../hooks";
// import { setEventbrite } from "../../store/slices/eventbrite/eventbriteSlice";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object().shape({
//   title: yup.string().required(),
//   description: yup.string().required(),
//   creator_email: yup.string().required(),
//   creator_name: yup.string().required(),
//   event_link: yup.string().required(),
//   cost: yup.number().required(),
//   when: yup.date().required(),
//   where: yup.string().required(),
//   who: yup.string().required(),
//   topics: yup
//     .string()
//     .oneOf([...Topics])
//     .required(),
// });
interface EventDetailsFormProps {
  eventDetails: EventbriteEvent;
  cancelEvent(value: boolean): void;
}

const EventDetailsForm: FC<EventDetailsFormProps> = (props) => {
  const { eventDetails } = props;
  console.log("EventDetails component - got props:", eventDetails);

  // const dispatch = useAppDispatch();
  const [eventName, setEventName] = useState<string>(eventDetails.name || "");
  const [cost, setCost] = useState<string | number>(eventDetails.cost || 0);
  const [currency, setCurrency] = useState<string>(
    eventDetails.currency || "USD"
  );
  const [description, setDescription] = useState<string>(
    eventDetails.description || ""
  );
  const [endDate, setEndDate] = useState<Date | string>(
    eventDetails.end_date.toISOString().split("T")[0] || null
  );
  const [startDate, setStartDate] = useState<Date | string>(
    eventDetails.start_date.toISOString().split("T")[0] || null
  );
  const [endTime, setEndTime] = useState<string>(
    eventDetails.end_time.toLocaleTimeString() || ""
  );
  const [startTime, setStartTime] = useState<string>(
    eventDetails.end_time.toLocaleTimeString() || ""
  );
  const [url, setUrl] = useState<string>(eventDetails.url || "");
  const [topics, setTopics] = useState<string[]>([]);

  // const { register, handleSubmit, watch } = useForm<EventbriteEvent>({
  //   resolver: yupResolver(schema),
  // });

  const submitForm = (event: any) => {
    event.preventDefault();
    console.log("FORM SUBMIT");
    // handleSubmit((data) => console.log(data));
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
            {eventDetails.id ? (
              <>
                <FormInput
                  type="hidden"
                  disabled={true}
                  value={eventDetails.changed}
                  onChange={() => null}
                />
                <FormInput
                  type="hidden"
                  disabled={true}
                  value={eventDetails.created}
                  onChange={() => null}
                />
                <FormInput
                  type="hidden"
                  disabled={true}
                  value={eventDetails.id}
                  onChange={() => null}
                />
              </>
            ) : null}
            <FormLabel htmlFor="name" text="Name" />
            <FormInput
              placeholder="Name"
              type="text"
              required
              disabled={false}
              value={eventName}
              onChange={setEventName}
              name="name"
            />
            <FormLabel htmlFor="cost" text="Cost" />
            <FormInput
              placeholder="Cost"
              type="number"
              required
              disabled={false}
              value={cost}
              onChange={setCost}
              name="cost"
            />
            <FormLabel htmlFor="description" text="Description" />
            <FormInput
              placeholder="Description"
              type="text"
              required
              disabled={false}
              value={description}
              onChange={setDescription}
              name="description"
            />
            <FormLabel htmlFor="url" text="URL" />
            <FormInput
              placeholder="URL"
              type="text"
              required
              disabled={false}
              value={url}
              onChange={setUrl}
              name="url"
            />
            <FormLabel htmlFor="start_date" text="Start Date" />
            <FormInput
              placeholder="Start Date"
              type="date"
              required
              disabled={false}
              value={startDate}
              onChange={setStartDate}
              name="start_date"
            />
            <FormLabel htmlFor="end_date" text="End Date" />
            <FormInput
              placeholder="End Date"
              type="date"
              required
              disabled={false}
              value={endDate}
              onChange={setEndDate}
              name="end_date"
            />
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
        </FormFields>
        <EventsGreenDiv>
          <ButtonDiv>
            <p>Does this look right?</p>
            <button
              type="button"
              id="dark"
              onClick={() => props.cancelEvent(false)}
            >
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
