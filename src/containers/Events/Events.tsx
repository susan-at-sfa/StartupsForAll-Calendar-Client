import { FC } from "react";
import styled from "styled-components";
import ListEvent from "../../components/EventList/ListEvent";
// import { events } from "./DummyEvents";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { FiList } from 'react-icons/fi'
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";

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
  const dispatch = useAppDispatch();
  const events = useAppSelector(({ dbEvent }) => dbEvent.dbEvents);

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
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
    <Wrapper>
      <FilterButton onClick={() => dispatch(setFilterModalOpen(true))}>
        <FiList id="filterIcon" />
        <p> Filter</p>
      </FilterButton>
      {/* <>{sections}</> */}
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
    </Wrapper>

  );
};

export default Events;
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const ListEventContainer = styled.div`
  width: 340px;
  ul{
    padding: 0;
  }
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
const FilterButton = styled.div`
  position: fixed;
  display: flex;
  right: 20px;
  top: 265px;
  width: 60px; 
  padding-left: 5px;
  background-color: white;
  z-index: 2;
  p{
    color: #C79288;
    margin: 0;
    font-size: 14px; 
    font-weight: bold;
    padding: 0;
  }
  #filterIcon{
    color: #C79288;
    margin: 2px 2px 0 0;
    height: 15px;
  }
`
const MonthSection = styled.section`
  height: 125px;
`
const MonthHeader = styled.div`
  position: sticky;
  top: 25px;
  h1 {
    color: #C79288;
    font-style: normal;
    font-size: 13px;
    font-weight: bold;
    width: 90%;
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