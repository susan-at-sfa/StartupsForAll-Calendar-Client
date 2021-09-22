import React, { FC } from 'react';

const GoogleCalendar: FC = () => {

  const calendarStyles = {
    border: "solid 1px #777",
    width: "800px",
    height: "600px",
    frameborder: "0",
    scrolling: "no"
  }

  return (
    <React.Fragment>
      <iframe
        title="embeddedCal"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&src=ZG91Z2xhc2Z1bm5hZUBnbWFpbC5jb20&color=%23039BE5&showTabs=0&showPrint=0&showCalendars=0"
        style={calendarStyles}
      ></iframe>
    </React.Fragment >
  )
}

export default GoogleCalendar;