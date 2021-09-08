import React, { FC } from 'react';
import styled from '@emotion/styled';

export interface ListEventProps {
  category: string;
  creator_name: string;
  date: string;
  end_time: string;
  key: number;
  start_time: string;
  title: string;
  topics: string[];
}

const ListEvent: FC<ListEventProps> = (props) => {
  const { key, category, title, date, start_time, end_time, creator_name, topics } = props;
  return (
    <Wrapper key={key}>
      <LeftDisplay>
        <Title>{title}</Title>
        <CreatedBy>{creator_name}</CreatedBy>
      </LeftDisplay>
      <RightDisplay>
        <DateDisplay>{date}</DateDisplay>
        <TimeDisplay>{start_time} - {end_time}</TimeDisplay>
        <TopicsDisplay>{topics.map((topic) => {
          return { topic }
        })}
        </TopicsDisplay>
        <CategoryDisplay>
          {category}
        </CategoryDisplay>
      </RightDisplay>
    </Wrapper>
  )
}

export default ListEvent;

const Wrapper = styled.div`

`
const LeftDisplay = styled.div`
`
const Title = styled.div`

`
const CreatedBy = styled.div`
`
const RightDisplay = styled.div`
`
const DateDisplay = styled.div`
`
const TimeDisplay = styled.div`
`
const TopicsDisplay = styled.div`
`
const CategoryDisplay = styled.div`
`