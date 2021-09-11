import React, { FC } from "react";
import styled from "@emotion/styled";

interface EventbriteEventInfoProps {
  title: string;
  logo?: string;
  start_date: Date | string;
  end_date: Date | string;
  start_time: string;
  end_time: string;
  location: string;
  cost: number | string;
  currency: string;
  summary: string;
  url: string;
}

const EventbriteEventInfo: FC<EventbriteEventInfoProps> = (props) => {
  return (
    <>
      <h3>Imported Information</h3>
      <BrownSpan />
      {props.title}
      {props.logo ? (
        <img src={props.logo} alt="event logo" style={{ maxWidth: "100%" }} />
      ) : null}
      {props.start_date}
      {props.start_time}
      {props.end_time}
      {props.location}
      {props.cost}
      {props.summary}
    </>
  );
};

export default EventbriteEventInfo;

const BrownSpan = styled.div`
  width: 100%;
  height: 42px;
  background: brown;
  padding: 10px;
  margin: 10px;
`;
