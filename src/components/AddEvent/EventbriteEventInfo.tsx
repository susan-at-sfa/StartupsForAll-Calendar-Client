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
      <Text>{props.title}</Text>
      <Title>{props.start_date}</Title>
      <Text>
        {props.start_time} - {props.end_time}
      </Text>
      {props.logo ? (
        <img src={props.logo} alt="event logo" style={{ maxWidth: "100%" }} />
      ) : null}
      <Title>{props.title}</Title>
      <Text>An event by TODO:</Text>
      <Title>Location</Title>
      <Text>{props.location}</Text>
      <Title>Price</Title>
      <Text>
        {props.currency}
        {props.cost}
      </Text>
      <Title>Event Summary from Eventbrite</Title>
      <Text>{props.summary}</Text>
      TODO: buttons
      <Title>Event Link</Title>
      <Text>{props.url}</Text>
    </>
  );
};

export default EventbriteEventInfo;

const BrownSpan = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 12px;
  background: #e8d9d6;
  margin: 10px;
`;
const Title = styled.div`
  font-weight: bold;
`;
const Text = styled.div`
  margin-bottom: 12px;
`;
