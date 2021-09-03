import { FC } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import AuthorizeToAddEvents from "../../components/AddEvent/AuthorizeToAddEvents";
import EventbriteIDInput from "../../components/AddEvent/EventbriteIDInput";
import EventDetailsForm from "../../components/AddEvent/EventDetails";
import { requestEventbriteEvent } from "../../store/slices/eventbrite/eventbriteSlice";

const Add: FC = () => {
  const dispatch = useDispatch();
  const token = useAppSelector(({ auth }) => auth.token);
  const eventbriteDetails = useAppSelector(({ eventbrite }) => eventbrite);

  const handleSubmit = (id: string) => {
    dispatch(requestEventbriteEvent({ id }));
  };

  if (!token) {
    return <AuthorizeToAddEvents />;
  }

  return (
    // Since our default state is now the initialState object seen in eventbriteSlice, we check existence differently.
    // There's probably a better way to do this.
    !eventbriteDetails.id ? (
      <EventbriteIDInput handleSubmit={handleSubmit} />
    ) : (
      <EventDetailsForm eventDetails={eventbriteDetails} />
    )
  );
};

export default Add;
