import React, { FormEvent, FC } from "react";
import { titleCase } from "../../hooks";
import { EventbriteEvent } from "../../store/slices/eventbrite/eventbriteSlice";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import RedButton from "../RedButton";

interface EventDetailsFormProps {
  eventDetails: EventbriteEvent;
}

const EventDetailsForm: FC<EventDetailsFormProps> = ({ eventDetails }) => {
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const makeChange = (element: any, value: any) => {
    console.log("make change val:", element, value);
  };

  return (
    <>
      <img src={eventDetails.logo} alt="event logo" />
      <form onSubmit={submitForm}>
        {Object.entries(eventDetails).map(([key, value]) => {
          if (key === "created" || key === "changed" || key === "logo") {
            // ignore event created and changed dates for this view
            return null;
          } else {
            if (typeof value === "object") {
              return <p key={key}>{key} has a value that is an object</p>;
            }
            const isDate = Date.parse(value);
            if (value instanceof Date && !isNaN(isDate.valueOf())) {
              console.log("found date", value);
              value = value.toLocaleString();
            }
            return (
              <React.Fragment key={key}>
                <FormLabel htmlFor={key} text={titleCase(key)} />
                <FormInput
                  placeholder={value}
                  type="text"
                  required
                  onChange={(change) => makeChange(value, change)}
                  value={value}
                  name={key}
                />
              </React.Fragment>
            );
          }
        })}
        <div>
          <RedButton buttonType="submit" buttonText="Looks Alright To Me" />
        </div>
      </form>
    </>
  );
};

export default EventDetailsForm;
