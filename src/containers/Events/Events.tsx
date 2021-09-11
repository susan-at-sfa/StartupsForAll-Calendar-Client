import { FC } from "react";
import styled from "styled-components";
import ListEvent from "../../components/EventList/ListEvent";
// import { events } from "./DummyEvents";
import { useAppSelector } from "../../hooks";

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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const sections = months.map((month, index) => {
    return (
      <MonthSection id={month} key={index}>
        <MonthHeader>
          <h1><span>{month}</span></h1>
        </MonthHeader>
        <DisplayEvents>

        </DisplayEvents>
      </MonthSection>
    )
  })


  return (
    <ListEventContainer>
      <>{sections}</>
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

const MonthSection = styled.section`
height: 85px;
`
const MonthHeader = styled.div`
  position: sticky;;
  top: 270px;
  h1 {
    color: #C79288;
    font-style: normal;
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #C79288;
    line-height: 2px;
    margin: 10px 0 20px 10px;
  }
  span{
    background:#fff;
    padding:0 15px;
  }
  `
const DisplayEvents = styled.div`
  
`

const ListEventContainer = styled.div`
   display: flex;
   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   .displayListEventList{
  //     padding: 0;
  //   margin: 0;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   flex-wrap: wrap;
  //   list-style: none;
  // }
  `