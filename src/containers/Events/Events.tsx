import { FC } from "react";
import styled from "styled-components";
import ListEvent from "../../components/EventList/ListEvent";
// import { events } from "./DummyEvents";
import { useAppDispatch, useAppSelector } from "../../hooks";

export interface EventPageProps {
  id: string;
  category: string;
  cost: string;
  created_at: string;
  creator_name: string;
  description: string;
  end_time: string;
  location: string;
  logo: string;
  start_date: string;
  start_time: string;
  title: string;
  topics: string[];
  url: string;
}

const Events: FC = () => {
  const events = useAppSelector(({ dbEvent }) => dbEvent.dbEvents);

  return (
    <ListEventContainer>
      <ul className="displayListEventList">
        {events.map((event: any) => {
          const { id, category, title, start_date, start_time, end_time, creator_name, topics } = event;
          return <ListEvent
            key={id}
            id={id}
            category={category}
            title={title}
            date={start_date}
            start_time={start_time}
            end_time={end_time}
            creator_name={creator_name}
            topics={topics}
          />
        })
        }
      </ul>
    </ListEventContainer>
  );
};

export default Events;

const ListEventContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
.displayListEventList{
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
}
`
