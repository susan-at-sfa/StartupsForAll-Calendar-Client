import React, { FormEvent, FC } from "react";
import { EventbriteEvent } from "../../store/slices/eventbrite/eventbriteSlice";

interface EventDetailsFormProps {
  eventDetails: EventbriteEvent;
}

const EventDetailsForm: FC<EventDetailsFormProps> = ({ eventDetails }) => {
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitForm}>
      {Object.entries(eventDetails).map(([key, value]) => {
        if (typeof value === "object") {
          return <p key={key}>{key} has a value that is an object</p>
        }
        return (
          <React.Fragment key={key}>
            <p>{key}: {value}</p>
          </React.Fragment>
        );
      })}
    </form>
  );
};

export default EventDetailsForm;
