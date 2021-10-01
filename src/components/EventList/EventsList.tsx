import React, { FC } from "react";
import styled from "@emotion/styled";
import { useLocation, useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { currentMonthEpochTime } from "../../helpers";
import { MonthObject } from "../../constants/MonthObject";
import ListEvent from "./ListEvent";
import { device } from "../../constants/Device";
import { getDbEventsByFilter } from "../../store/slices/dbEvent/dbEventSlice";

const EventsListComponent: FC<any> = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  interface EventsList {
    [key: string]: {
      [key: string]: any;
    };
  }

  const events: Record<any, any> = useAppSelector(
    ({ dbEvent }) => dbEvent.dbEvents
  );
  const eventsList: EventsList = {};

  events.forEach((event: any) => {
    const date = new Date(event.start_date);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (eventsList[year] === undefined) {
      eventsList[year] = {};
    }

    if (eventsList[year][month] === undefined) {
      eventsList[year][month] = [];
    }

    eventsList[year][month].push(event);
  });

  Object.entries(eventsList).forEach(([year, monthData]) => {
    const months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const monthsInYear = Object.keys(monthData);
    months.forEach((month) => {
      if (monthsInYear.includes(String(month))) {
        return;
      }
      eventsList[year][month] = [];
    });
  });

  const clearFilters = () => {
    let payload: any = {};
    dispatch(getDbEventsByFilter(payload));
  };

  const navigateToAdd = () => {
    history.push("/add");
  };

  return (
    <Wrapper>
      {events.length === 0 && (
        <NoneContainer>
          <h3>No Events Found!</h3>
          <ButtonsContainer>
            <Button onClick={clearFilters}>Clear Events Filters</Button>
          </ButtonsContainer>
        </NoneContainer>
      )}
      {Object.entries(eventsList).map(([year, months]) => {
        return (
          <React.Fragment key={year}>
            {Object.entries(months).map(([month, eventsThatMonth]) => {
              const calendarMonth = new Date(+year, +month).getTime();
              const currentMonthStart = currentMonthEpochTime();
              return (
                calendarMonth >= currentMonthStart && (
                  <MonthSection key={`${year}-${month}`} id={month}>
                    <div className="stickyBackground">
                      <MonthHeader>
                        <h1>
                          <span>
                            {MonthObject[month]} {year}
                          </span>
                        </h1>
                      </MonthHeader>
                    </div>
                    {eventsThatMonth.length ? (
                      eventsThatMonth.map((displayEvent: any) => {
                        const {
                          id,
                          category,
                          title,
                          start_date,
                          end_date,
                          creator_name,
                          topics,
                        } = displayEvent;
                        const timeOptions: any = {
                          hour: "numeric",
                          minute: "2-digit",
                        };
                        const start_time = new Date(
                          start_date
                        ).toLocaleTimeString([], timeOptions);
                        const end_time = new Date(end_date).toLocaleTimeString(
                          [],
                          {
                            ...timeOptions,
                            timeZoneName: "short",
                          }
                        );

                        if (location.pathname === "/admin") {
                          console.log("loading admin list view...");
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
                              isAdmin={true}
                              selectEvent={props.selectEvent}
                            />
                          );
                        } else {
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
                        }
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
    </Wrapper>
  );
};

export default EventsListComponent;
const Wrapper = styled.div`
  background-color: white;
  z-index: 5;
`;
const MonthHeader = styled.div`
  h1 {
    color: #c79288;
    font-style: normal;
    font-size: 13px;
    font-weight: 600;
    width: 100%;
    text-align: left;
    line-height: 2px;
    margin: 10px 0 20px 0px;
    border-bottom: 1px solid #c79288;
  }
  span {
    background: #fff;
    padding: 0 10px 0 5px;
  }
`;
const MonthSection = styled.section`
  min-height: 80px;
  #noEvents {
    font-size: 14px;
    color: #c4c4c4;
    padding: 20px 10px;
  }
  .stickyBackground {
    background-color: white;
    height: 21px;
    padding-top: 1px;
    padding-bottom: 10px;
    position: sticky;
    top: 48px;
    z-index: 2;
    @media ${device.desktop} {
      position: sticky;
      top: 0px;
    }
  }
  > div:last-child {
    margin-bottom: 8px;
  }
`;

const NoneContainer = styled.div`
  display: flex;
  max-width: 340px;
  margin: 0 auto;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-top: 20px;
  }
`;

const Anchor = styled.a`
  width: 100%;
  text-decoration: none;
  color: unset;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  max-width: 200px;
  border: none;
  height: 35px;
  background-color: #a36760;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    background-color: var(--button-dark-hover);
    cursor: pointer;
    transition: 0.5s ease;
  }
`;
