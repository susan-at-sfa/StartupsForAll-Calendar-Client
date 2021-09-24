import React, { FC } from "react";
import styled from "@emotion/styled";

interface EventbriteEventInfoProps {
  title: string;
  logo?: string;
  creator_name?: string;
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
  console.log("EVENT BRITE EVENT INFO component - ", props);
  return (
    <>
      <HeaderText>Imported Information</HeaderText>
      <BrownSpan />
      <FlexTwoRow>
        <div>
          <Text>{props.title}</Text>
          <Text>{props.creator_name}</Text>
        </div>
        <div>
          <Title>{new Date(props.start_date).toLocaleDateString()}</Title>
          <Text>
            {props.start_time} - {props.end_time}
          </Text>
          TODO: Emojis TODO: Category
        </div>
      </FlexTwoRow>
      {props.logo ? (
        <ImageContainer>
          <img src={props.logo} alt="event logo" />
        </ImageContainer>
      ) : null}
      <Title>{props.title}</Title>
      <Text>
        An event by <Anchor>{props.creator_name}</Anchor>
      </Text>
      <Title>Location</Title>
      <Text>{props.location}</Text>
      <Title>Price</Title>
      <Text>
        {props.cost === 0 || props.cost === "0"
          ? "Free"
          : `${props.currency} $${props.cost}`}
      </Text>
      <Title>Event Summary from Eventbrite</Title>
      <Text>{props.summary}</Text>
      <Title>Event Link</Title>
      <Text>
        <Anchor href={props.url}>{props.url}</Anchor>
      </Text>
    </>
  );
};

export default EventbriteEventInfo;

const HeaderText = styled.div`
  padding-top: 28px;
`;
const BrownSpan = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 11px;
  background: #e8d9d6;
  margin: 0 0 25px 0;
`;
const ImageContainer = styled.div`
  width: calc(100% - 18px);
  max-width: calc(100% - 18px);
  img {
    max-width: 100%;
  }
`;
const Title = styled.div`
  padding-top: 18px;
  font-weight: bold;
`;
const Text = styled.div`
  line-height: 105%;
  margin-bottom: 12px;
  font-size: 0.9rem;
`;
const Anchor = styled.a`
  text-decoration: none;
  color: var(--submit-button-container-bg);
`;
const FlexTwoRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
`;
