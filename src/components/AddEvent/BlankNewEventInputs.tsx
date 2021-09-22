import styled from "@emotion/styled";
import React, { FC, useState } from "react";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";

interface BlankNewEventInputsProps {
  eventTitle: string;
  setEventTitle(value: string): void;
  startDate: Date | string;
  setStartDate(value: Date): void;
  endDate: Date | string;
  setEndDate(value: Date): void;
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

  const [localStartDate, setLocalStartDate] = useState<string>("");
  const [localEndDate, setLocalEndDate] = useState<string>("");
  const [localStartTime, setLocalStartTime] = useState<string>("");
  const [localEndTime, setLocalEndTime] = useState<string>("");

  const handleChange = (value: string, which: string) => {
    console.log("handling date/time change...", value, which);
    if (which === "et") {
      setLocalEndTime(value);
      props.setEndTime(value);
    } else if (which === "st") {
      setLocalStartTime(value);
      props.setStartTime(value);
    } else if (which === "sd") {
      // TODO: localStartDate is accurate, calling props.setStartDate converts the time wrongly
      // TODO: convert it first to UTC, drop hours/mins/sec/ms, then call props.setstartdate
      setLocalStartDate(value);
      props.setStartDate(new Date(value));
    } else if (which === "ed") {
      setLocalEndDate(value);
      props.setEndDate(new Date(value));
    }
  };

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

      <FormLabel htmlFor="start_date" text="Start Date" />
      <FormInput
        placeholder="Start Date"
        type="date"
        required
        disabled={false}
        value={localStartDate}
        onChange={(value) => handleChange(value, "sd")}
        name="start_date"
      />

      <FormLabel htmlFor="end_date" text="End Date" />
      <FormInput
        placeholder="End Date"
        type="date"
        required
        disabled={false}
        value={localEndDate}
        onChange={(value) => handleChange(value, "ed")}
        name="end_date"
      />

      <FormLabel htmlFor="start_time" text="Start Time" />
      <FormInput
        placeholder="Start Time"
        type="time"
        required
        disabled={false}
        value={localStartTime}
        onChange={(value) => handleChange(value, "st")}
        name="start_time"
      />

      <FormLabel htmlFor="end_time" text="End Time" />
      <FormInput
        placeholder="End Time"
        type="time"
        required
        disabled={false}
        value={localEndTime}
        onChange={(value) => handleChange(value, "et")}
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

      <FormLabel htmlFor="summary" text="Summary" />
      <TextArea
        placeholder="Summary"
        required
        disabled={false}
        value={props.summary}
        onChange={(e) => props.setSummary(e.target.value)}
        name="summary"
      />
    </>
  );
};

const TextArea = styled.textarea`
  color: #e8d9d6;
  font-weight: bold;
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  min-height: 45px;
  padding: 0 15px;
  margin-bottom: 15px;
  max-width: 100%;
  max-width: 100vw;
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
`;

export default BlankNewEventInputs;
