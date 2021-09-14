import {FC} from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '../../hooks';
import { MonthObject } from '../../constants/MonthObject';
import ListEvent from '../EventList/ListEvent';
import { events } from '../../constants/DummyEvents';

const OrganizedEventsComponent: FC = () => {
  interface OrganizedEvents {
    [key: string]: {
      [key: string]: any
    }
  }
  // const events: Record<any, any> = useAppSelector(({ dbEvent }) => dbEvent.dbEvents);
console.log("Events", events)
  const organizedEvents: OrganizedEvents = {};

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

  return(
    <>
    {Object.entries(organizedEvents).map(([year, months]) => {
      return (
        <>
          {Object.entries(months).map(([month, displayEvents]) => {
            return (
              <MonthSection key={month} id={month}>
                <MonthHeader>
                  <h1><span>{MonthObject[month]} {year}</span></h1>
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
            )}
          )}
        </>
      )}
    )}
  </>
  )
};

export default OrganizedEventsComponent;

const MonthSection = styled.section`
`
const MonthHeader = styled.div`
  position: sticky;
  top: 25px;
  h1 {
    color: #C79288;
    font-style: normal;
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #C79288;
    line-height: 2px;
    margin: 10px 0 10px 0px;
  } 
  span{
    background:#fff;
    padding:0 5px 0 5px;
  }
  `