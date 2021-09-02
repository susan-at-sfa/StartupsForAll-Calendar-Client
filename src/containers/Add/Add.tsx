import { FC, useState } from "react";
import { makeRequest } from "../../store/utils/makeRequest";
import { useAppSelector } from "../../hooks";
import AuthorizeToAddEvents from "../../components/AddEvent/AuthorizeToAddEvents";
import EventbriteIDInput from "../../components/AddEvent/EventbriteIDInput";
import EventDetailsForm from "../../components/AddEvent/EventDetails";

const Add: FC = () => {
  const token = useAppSelector(({ auth }) => auth.token);
  const [eventBriteDetails, setEventBriteDetails] = useState<any>({});

  const handleSubmit = async (id: string) => {
    const url = `${process.env.REACT_APP_API_URL}/events/event-brite/${id}`;
    const method = "GET";
    try {
      const { success, data, error } = await makeRequest(url, method);
      if (error) throw new Error(error);
      if (success) setEventBriteDetails(data);
      console.log(eventBriteDetails);
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  };

  const addEvent = async () => {
    console.log("addevent 165969600543");
  };

  let renderedElement;
  if (!token) {
    renderedElement = <AuthorizeToAddEvents />;
  } else if (Object.keys(eventBriteDetails).length === 0) {
    console.log("eb details:", eventBriteDetails);
    renderedElement = <EventbriteIDInput handleSubmit={handleSubmit} />;
  } else {
    console.log("eb details:", eventBriteDetails);
    renderedElement = (
      <EventDetailsForm
        handleSubmit={addEvent}
        eventDetails={eventBriteDetails}
      />
    );
  }

  return renderedElement;
};

export default Add;

// const ButtonDiv = styled.div``
