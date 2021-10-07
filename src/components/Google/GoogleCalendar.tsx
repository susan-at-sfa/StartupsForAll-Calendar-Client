import React, { FC } from "react";
import styled from "@emotion/styled";

const GoogleCalendar: FC = () => {
  const calendarStyles = {
    width: "800px",
    height: "600px",
    scrolling: "no",
    border: "none",
    frameborder: "0",
    title: "0",
  };

  return (
    <CalendarWrapper>
      <iframe
        title="embeddedCal"
        src="https://calendar.google.com/calendar/u/0/embed?src=c_gpvmiq36ebi5m48qpf4gr16pqk@group.calendar.google.com"
        // src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&src=ZG91Z2xhc2Z1bm5hZUBnbWFpbC5jb20&color=%23eeeeee&showTabs=0&showPrint=0&showCalendars=0"
        style={calendarStyles}
      ></iframe>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  .today-button,
  .view-container-border,
  .mv-daynames-table {
    background: rgb(163, 103, 96) !important;
  }
  .mv-dayname {
    color: white !important;
  }
  #calendarTitle {
    display: none !important;
  }
`;

export default GoogleCalendar;
