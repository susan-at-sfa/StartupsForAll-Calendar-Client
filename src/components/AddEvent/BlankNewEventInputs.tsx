import React, { FC } from "react";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";

interface BlankNewEventInputsProps {
  eventTitle: string;
  setEventTitle(value: string): void;
  startDate: Date | string;
  setStartDate(value: string): void;
  endDate: Date | string;
  setEndDate(value: string): void;
  startTime: string;
  setStartTime(value: string): void;
  endTime: string;
  setEndTime(value: string): void;
  location: string;
  setLocation(value: string): void;
  cost: string | number;
  setCost(value: string): void;
  currency: string;
  setCurrency(value: string): void;
  summary: string;
  setSummary(value: string): void;
  url: string;
  setUrl(value: string): void;
}

const BlankNewEventInputs: FC<BlankNewEventInputsProps> = (props) => {
  console.log("BlankNewEventInputs component - got props:", props);

  return (
    <>
      <FormLabel htmlFor="title" text="Title" />
      <FormInput
        placeholder="Title"
        type="text"
        required
        disabled={false}
        value={props.eventTitle}
        onChange={props.setEventTitle}
        name="title"
      />

      <FormLabel htmlFor="start_date" text="Date" />
      <FormInput
        placeholder="Date"
        type="date"
        required
        disabled={false}
        value={props.startDate}
        onChange={props.setStartDate}
        name="start_date"
      />

      <FormLabel htmlFor="start_time" text="Start Time" />
      <FormInput
        placeholder="Start Time"
        type="time"
        required
        disabled={false}
        value={props.startTime}
        onChange={props.setStartTime}
        name="start_time"
      />

      <FormLabel htmlFor="end_time" text="End Time" />
      <FormInput
        placeholder="End Time"
        type="time"
        required
        disabled={false}
        value={props.endTime}
        onChange={props.setEndTime}
        name="end_time"
      />

      <FormLabel htmlFor="location" text="Location" />
      <FormInput
        placeholder="Location"
        type="text"
        required
        disabled={false}
        value={props.location}
        onChange={props.setLocation}
        name="location"
      />

      <FormLabel htmlFor="cost" text="Cost" />
      <FormInput
        placeholder="Cost"
        type="string"
        required
        disabled={false}
        value={props.cost}
        onChange={props.setCost}
        name="cost"
      />

      <FormLabel htmlFor="summary" text="summary" />
      <textarea
        placeholder="summary"
        required
        disabled={false}
        value={props.summary}
        onChange={(e) => props.setSummary(e.target.value)}
        name="summary"
        rows={12}
      />
    </>
  );
};

export default BlankNewEventInputs;
