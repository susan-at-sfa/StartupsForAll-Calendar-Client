import styled from "@emotion/styled";
import { FC } from "react";
// import { to24HourTime } from "../../helpers";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BlankNewEventInputsProps {
  eventTitle: string;
  setEventTitle(value: string): void;
  startDate: Date;
  setStartDate(value: Date): void;
  endDate: Date;
  setEndDate(value: Date): void;
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

  return (
    <form>
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

      <FormLabel htmlFor="start_date" text="Start" />
      <DatePicker
        selected={props.startDate}
        name="start_date"
        onChange={(date: Date) => props.setStartDate(date)}
        showTimeSelect
        timeCaption="Start"
        timeFormat="HH:mm"
        timeIntervals={5}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <FormLabel htmlFor="end_date" text="End" />
      <DatePicker
        selected={props.endDate}
        name="end_date"
        onChange={(date: Date) => props.setEndDate(date)}
        showTimeSelect
        timeCaption="End"
        timeFormat="HH:mm"
        timeIntervals={5}
        dateFormat="MMMM d, yyyy h:mm aa"
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
    </form>
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

export default BlankNewEventInputs;
