import { FC } from "react";
import styled from "styled-components";
import ListEvent from "../../components/EventList/ListEvent";
// import { events } from "./DummyEvents";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { FiList } from 'react-icons/fi'
import { setFilterModalOpen } from "../../store/slices/filterModal/showFilterModalSlice";

// export interface EventPageProps {
//   id: string;
//   category: string;
//   cost: string;
//   created_at: string;
//   creator_name: string;
//   description: string;
//   end_time: string;
//   location: string;
//   logo: string;
//   start_date: string;
//   start_time: string;
//   title: string;
//   topics: string[];
//   url: string;
// }

const Events: FC = () => {

  const dispatch = useAppDispatch();
  const events: Record<any, any> = useAppSelector(({ dbEvent }) => dbEvent.dbEvents);

  interface OrganizedEvents {
    [key: string]: {
      [key: string]: any
    }
  }

  const organizedEvents: OrganizedEvents = {};
  console.log("ORGANIZEDEVENTS", organizedEvents)

  events.forEach((event: any) => {
    const date = new Date(event.start_date);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (organizedEvents[year] === undefined) {
      organizedEvents[year] = {};
    }

    if (organizedEvents[year][month] === undefined) {
      organizedEvents[year][month] = [];
    }

    organizedEvents[year][month].push(event);
  });

  const eventSection =
    Object.entries(organizedEvents).map(([year, months]) => {
      console.log("Organized Year", year, "Months", months)
      return (
        <>
          {Object.entries(months).map(([month, displayEvents]) => {
            console.log("Month", month, "Doug", displayEvents)
            return (
              <MonthSection id={month}>
                <MonthHeader>
                  <h1><span>{month} {year}</span></h1>
                </MonthHeader>
                {displayEvents.map((displayEvent: any) => {
                  const { id, category, title, start_date, start_time, end_time, creator_name, topics } = displayEvent;
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
              </MonthSection>
            )
          }
          )}
        </>
      )
    }
    )

  return (
    <Wrapper>
      <ListEventContainer>
        <FilterButton onClick={() => dispatch(setFilterModalOpen(true))}>
          <FiList id="filterIcon" />
          <p> Filter</p>
        </FilterButton>
        <>{eventSection}</>
      </ListEventContainer>
    </Wrapper>
  )
};

export default Events;

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const ListEventContainer = styled.div`
  width: 340px;
  `
const FilterButton = styled.div`
position: sticky;
top: 20px;
width: 75px;
text-align: right;
z-index: 2;
background-color: white;
p{
    display: inline;
    color: #C79288;
    font-size: 14px; 
    font-weight: bold;
  }
  #filterIcon{
    color: #C79288;
    margin: 2px 2px 0 0;
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