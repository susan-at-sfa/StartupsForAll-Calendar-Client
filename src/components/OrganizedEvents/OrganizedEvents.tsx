import React, { FC } from "react";
import styled from "@emotion/styled";
import { useAppSelector } from "../../hooks";
import { currentMonthEpochTime } from "../../helpers";
import { MonthObject } from "../../constants/MonthObject";
import ListEvent from "../EventList/ListEvent";

const OrganizedEventsComponent: FC = () => {
  interface OrganizedEvents {
    [key: string]: {
      [key: string]: any;
    };
  }

  const events: Record<any, any> = useAppSelector(
    ({ dbEvent }) => dbEvent.dbEvents
  );
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

  Object.entries(organizedEvents).forEach(([year, monthData]) => {
    const months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const monthsInYear = Object.keys(monthData);
    months.forEach((month) => {
      if (monthsInYear.includes(String(month))) {
        return;
      }
      organizedEvents[year][month] = [];
    });
  });

  return (
    <>
      {Object.entries(organizedEvents).map(([year, months]) => {
        return (
          <React.Fragment key={year}>
            {Object.entries(months).map(([month, eventsThatMonth]) => {
              const calendarMonth = new Date(+year, +month).getTime();
              const currentMonthStart = currentMonthEpochTime();
              console.log(
                `${year} ${month} comparing calendarMonth ${calendarMonth} with current time ${currentMonthStart}`
              );
              return (
                calendarMonth >= currentMonthStart && (
                  <MonthSection key={`${year}-${month}`} id={month}>
                    <MonthHeader>
                      <h1>
                        <span>
                          {MonthObject[month]} {year}
                        </span>
                      </h1>
                    </MonthHeader>
                    {eventsThatMonth.length ? (
                      eventsThatMonth.map((displayEvent: any) => {
                        const {
                          id,
                          category,
                          title,
                          start_date,
                          start_time,
                          end_time,
                          creator_name,
                          topics,
                        } = displayEvent;

                        return (
                          <ListEvent
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
                        );
                      })
                    ) : (
                      <div id="noEvents">
                        <h1>No Events</h1>
                      </div>
                    )}
                  </MonthSection>
                )
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default OrganizedEventsComponent;

const MonthHeader = styled.div`
  position: sticky;
  top: 98px;
  z-index: 1;
  h1 {
    color: #c79288;
    font-style: normal;
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    text-align: left;
    line-height: 2px;
    margin: 10px 0 10px 0px;
    border-bottom: 1px solid #c79288;
  }
  span {
    background: #fff;
    padding: 0 5px 0 5px;
  }
`;
const MonthSection = styled.section`
  min-height: 80px;
  #noEvents {
    font-size: 14px;
    color: #c4c4c4;
    padding: 20px 10px;
  }
`;
