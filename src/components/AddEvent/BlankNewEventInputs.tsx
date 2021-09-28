import styled from "@emotion/styled";
import React, { FC, useState } from "react";
import { to24HourTime } from "../../helpers";
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
  currency?: string;
  setCurrency?(value: string): void;
  summary: string;
  setSummary(value: string): void;
  url: string;
  setUrl(value: string): void;
}

const BlankNewEventInputs: FC<BlankNewEventInputsProps> = (props) => {
  console.log("BlankNewEventInputs component - got props:", props);
  let start_time;
  if (
    props.startTime &&
    (props.startTime.includes("AM") || props.startTime.includes("PM"))
  ) {
    start_time = to24HourTime(props.startTime);
  } else {
    start_time = props.startTime;
  }
  let end_time;
  if (
    props.endTime &&
    (props.endTime.includes("AM") || props.endTime.includes("PM"))
  ) {
    end_time = to24HourTime(props.endTime);
  } else {
    end_time = props.endTime;
  }

  const [localStartDate, setLocalStartDate] = useState<string | Date>(
    props.startDate || ""
  );
  const [localEndDate, setLocalEndDate] = useState<string | Date>(
    props.endDate || ""
  );
  const [localStartTime, setLocalStartTime] = useState<string>(
    start_time || ""
  );
  const [localEndTime, setLocalEndTime] = useState<string>(end_time || "");

  const handleChange = (value: string, which: string) => {
    console.log("handling date/time change...", value, which);
    if (which === "et") {
      setLocalEndTime(value);
      props.setEndTime(value);
    } else if (which === "st") {
      setLocalStartTime(value);
      props.setStartTime(value);
    } else if (which === "sd") {
      setLocalStartDate(value);
      // calling toString() ensures it is saved as a string formatted YYYY-MM-DD
      // without toString it will be converted to a Date eg: "Date Fri Oct 22 2021 17:00:00 GMT-0700 (Pacific Daylight Time)"
      // having a Date saved in state in this way makes it much harder to combine
      // Date+Time to generate an accurate UTC/ISO8601 formatted date for the back end
      props.setStartDate(value.toString());
    } else if (which === "ed") {
      setLocalEndDate(value);
      props.setEndDate(value.toString());
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

      <div>
        <FormLabel htmlFor="" text="Time" />
        <TimesContainer>
          <FormLabel htmlFor="start_time" text="" />
          <FormInput
            placeholder="Start Time"
            type="time"
            required
            disabled={false}
            value={localStartTime}
            onChange={(value) => handleChange(value, "st")}
            name="start_time"
          />
          <span>to</span>
          <FormLabel htmlFor="end_time" text="" />
          <FormInput
            placeholder="End Time"
            type="time"
            required
            disabled={false}
            value={localEndTime}
            onChange={(value) => handleChange(value, "et")}
            name="end_time"
          />
        </TimesContainer>
      </div>

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
  border: 8px solid #e8d9d6;
  border-right-width: 20px;
  min-height: 45px;
  padding: 0 15px;
  margin-bottom: 15px;
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
const TimesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  span {
    margin-bottom: 20px;
    padding: 10px 8px 10px 0;
    width: 40px;
    background-color: var(--input-border-color);
  }
`;

export default BlankNewEventInputs;
