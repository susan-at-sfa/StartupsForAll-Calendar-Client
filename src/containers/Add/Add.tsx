import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";
import { resetEvent } from "../../store/slices/newEvent/newEventSlice";
import { resetEventBrite } from "../../store/slices/eventbrite/eventbriteSlice";
import { emptyEvent } from "../../constants/NewEvent";

import AuthorizeToAddEvents from "../../components/AddEvent/AuthorizeToAddEvents";
import EventbriteIDInput from "../../components/AddEvent/EventbriteIDInput";
import EventDetailsForm from "../../components/AddEvent/NewEventForm";

const Add: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const token = useAppSelector(({ auth }) => auth.token);
  const eventbriteDetails = useAppSelector(({ eventbrite }) => eventbrite);

  const [isCreatingNewEmptyEvent, setCreatingNewEmptyEvent] = useState(false);
  const cancelEvent = () => {
    dispatch(resetEvent(emptyEvent));
    dispatch(resetEventBrite(emptyEvent));
    setCreatingNewEmptyEvent(false);
    history.push("/add");
  };

  if (!token) {
    return <AuthorizeToAddEvents />;
  }

  return (eventbriteDetails && eventbriteDetails.id) ||
    isCreatingNewEmptyEvent ? (
    <EventDetailsForm
      cancelEvent={cancelEvent}
      eventDetails={eventbriteDetails}
    />
  ) : (
    <EventbriteIDInput newEvent={setCreatingNewEmptyEvent} />
  );
};

export default Add;
