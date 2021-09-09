import { FC } from "react";
import styled from "styled-components";
import ListEvent from "../../components/EventList/ListEvent";

export interface EventPageProps {
  id: number;
  category: string;
  cost: string;
  creator_name: string;
  description: string;
  end_time: string;
  location: string;
  start_date: string;
  start_time: string;
  title: string;
  topics: string[];
  url: string;
}

const Events: FC = () => {
  const events = [
    {
      id: 1,
      category: "Founder",
      cost: "$20.00",
      creator_name: "Mira Karsgaard",
      description: "This is an event",
      end_time: "6:00 PM",
      location: "Over There",
      start_date: "2021-09-25",
      start_time: "4:00 PM",
      title: "People and Power: Advancing Leadership",
      // We will want to account for title length. Perhaps append "..." after a certain number of characters for list view
      topics: ['🚀 Open Space', '🧩 Strategy'],
      url: "https://www.website.com"
    },
    {
      id: 2,
      category: "Expert",
      cost: "$500.00",
      creator_name: "Tatiana Press",
      description: "This is another event",
      end_time: "10:00 PM",
      location: "Over Here",
      start_date: "2021-10-13",
      start_time: "6:00 PM",
      title: "People and Power: Advancing Each Other",
      // We will want to account for title length. Perhaps append "..." after a certain number of characters for list view
      topics: ['🔍 User Research', '🌎 Social Impact'],
      url: "https://www.website.com"
    },
    {
      id: 3,
      category: "Community",
      cost: "$500.00",
      creator_name: "Ziare Botosh",
      description: "This is another event",
      end_time: "10:00 PM",
      location: "Over Here",
      start_date: "2021-11-18",
      start_time: "6:00 PM",
      title: "And Justice For All",
      // We will want to account for title length. Perhaps append "..." after a certain number of characters for list view
      topics: ['☕️ Action Cafe', '🌎 Social Impact'],
      url: "https://www.website.com"
    }
  ]

  return (
    <ListEventContainer>
      <ul className="displayListEventList">
        {events.map((event) => {
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
