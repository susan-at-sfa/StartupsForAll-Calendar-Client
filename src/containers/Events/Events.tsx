import { FC } from "react";
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

const Events: FC<EventPageProps> = () => {
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
      start_date: "2021-12-13",
      start_time: "6:00 PM",
      title: "People and Power: Advancing Communication",
      topics: ['🔍 User Research', '🌎 Social Impact'],
      url: "https://www.website.com"
    }
  ]

  return (
    <div>
      {events.map((event) => {
        const { id, category, title, start_date, start_time, end_time, creator_name, topics } = event;
        return <ListEvent
          key={id}
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
    </div>
  );
};

export default Events;
