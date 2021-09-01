import { FC, useState } from "react";
import { makeRequest } from "../../store/utils/makeRequest";
import { useAppSelector } from "../../hooks";
// import AuthorizeToAddEvents from "../../components/AddEvent/AuthorizeToAddEvents";
import EventbriteIDInput from "../../components/AddEvent/EventbriteIDInput";

const Add: FC = () => {
  const token = useAppSelector(({ auth }) => auth.token);
  const [eventBriteDetails, setEventBriteDetails] = useState<any>({});
  // TODO: add logic to conditionally render depending on state
  const handleSubmit = async (id: string) => {
    const url = `${process.env.REACT_APP_API_URL}/events/event-brite/${id}`;
    const method = "GET";
    try {
      const { success, data, error } = await makeRequest(url, method, token);
      if (error) throw new Error(error);
      if (success) setEventBriteDetails(data);
      console.log(eventBriteDetails);
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  };

  // return <AuthorizeToAddEvents />;
  return <EventbriteIDInput handleSubmit={handleSubmit} />;
};

export default Add;

// const ButtonDiv = styled.div``
