import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import AuthorizeToAddEvents from "../../components/AddEvent/AuthorizeToAddEvents";
import EventbriteIDInput from "../../components/AddEvent/EventbriteIDInput";
import EventDetailsForm from "../../components/AddEvent/EventDetails";
import { requestEventbriteEvent } from "../../store/slices/eventbrite/eventbriteSlice";
import { resetEvent } from "../../store/slices/newEvent/newEventSlice";
import { resetEventBrite } from "../../store/slices/eventbrite/eventbriteSlice";
import { emptyEvent } from "../../constants/NewEvent";

const Add: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useAppSelector(({ auth }) => auth.token);
  const eventbriteDetails = useAppSelector(({ eventbrite }) => eventbrite);

  const handleSubmit = (id: string) => {
    dispatch(requestEventbriteEvent({ id }));
  };

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

  return (
    // Since our default state is now the initialState object seen in newEventSlice, we check existence differently.
    // There's probably a better way to do this.
    (eventbriteDetails && eventbriteDetails.id) || isCreatingNewEmptyEvent ? (
      <EventDetailsForm
        cancelEvent={cancelEvent}
        eventDetails={eventbriteDetails}
      />
    ) : (
      <EventbriteIDInput
        newEvent={setCreatingNewEmptyEvent}
        handleSubmit={handleSubmit}
      />
    )
  );
};

export default Add;
