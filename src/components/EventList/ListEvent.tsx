import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface ListEventProps {
  category: string;
  creator_name: string;
  date: string;
  end_time: string;
  id: number;
  start_time: string;
  title: string;
  topics: string[];
}

const ListEvent: FC<ListEventProps> = (props) => {
  const { id, category, title, date, start_time, end_time, creator_name, topics } = props;
  console.log("Topics", topics);

  const topicEmojis: Record<string, string> = {
    '💵 Funding / Financial': '💵',
    '☕️ Action Cafe': '☕️',
    '🚀 Open Space': '🚀',
    '🌎 Social Impact': '🌎',
    '🧩 Strategy': '🧩',
    '🔍 User Research': '🔍',
  }

  const categoryBackgroundColor: Record<string, string> = {
    "Founder": "#9DD3C9",
    "Expert": "#A0BAD2",
    "Community": "#B6A5D3"
  }

  return (
    <Wrapper key={id}>
      <LeftDisplay>
        <Title>{title}</Title>
        <CreatedBy>{creator_name}</CreatedBy>
      </LeftDisplay>
      <RightDisplay>
        <DateDisplay>{date}</DateDisplay>
        <TimeDisplay>{start_time} - {end_time}</TimeDisplay>
        <TopicsDisplay>
          <ul>
            {topics.map((topic, index) => {
              return (
                <li key={index}>
                  {topicEmojis[topic]}
                </li>
              )
            })}
          </ul>
        </TopicsDisplay>
        <CategoryDisplay style={{ backgroundColor: categoryBackgroundColor[category] }}>
          {category}
        </CategoryDisplay>
      </RightDisplay>
    </Wrapper>
  )
}

export default ListEvent;

const Wrapper = styled.div`
display: flex;
height: 80px;
border: 1px solid black;
`
const LeftDisplay = styled.div`
flex: 0.6;
display: flex;
flex-direction: column;
`
const Title = styled.div`
font-size: 14px;
font-weight: bold;
`
const CreatedBy = styled.div`
font-size: 12px;
`
const RightDisplay = styled.div`
flex: 0.4;
display: flex;
align-items: center;
flex-wrap: wrap;
justify-content: right;
`
const DateDisplay = styled.div`
display: flex;
font-size: 14px;
font-weight: bold;
align-items: flex-end;
`
const TimeDisplay = styled.div`
display: flex;
align-items: center;
font-size: 12px;
`
const TopicsDisplay = styled.div`
display: flex;
flex-direction: row;
align-items: center;
height: 20px;
padding: 0;
ul{
  font-size: 12px;
  padding: 0;
  list-style: none;
  display: flex;
  margin-right: 10px;
}
li{
  display: flex;
  margin: 0 5px 0px 5px;
}
`
const CategoryDisplay = styled.div`
font-size: 12px;
color: white;
height: 19px;
padding-left: 5px;
padding-right: 5px;
`