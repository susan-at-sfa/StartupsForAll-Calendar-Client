import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";
import { resetEvent } from "../../store/slices/newEvent/newEventSlice";
import { resetEventBrite } from "../../store/slices/eventbrite/eventbriteSlice";
import { emptyEvent } from "../../constants/NewEvent";
import styled from '@emotion/styled'

import AuthorizeToAddEvents from "../../components/AddEvent/AuthorizeToAddEvents";
import EventbriteIDInput from "../../components/AddEvent/EventbriteIDInput";
import NewEventForm from "../../components/AddEvent/NewEventForm";
import { device } from "../../constants/Device";

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
    return (
      <Wrapper>
        <AuthorizeToAddEvents />
      </Wrapper>
    )
  }

  return (eventbriteDetails && eventbriteDetails.id) ||
    isCreatingNewEmptyEvent ? (
    <Wrapper>
      <NewEventForm cancelEvent={cancelEvent} eventDetails={eventbriteDetails} />
    </Wrapper>
  ) : (
    <Wrapper>
      <EventbriteIDInput newEvent={setCreatingNewEmptyEvent} />
    </Wrapper>
  );
};

export default Add;

const Wrapper = styled.div`
background-color: white;
z-index: 5;
`
