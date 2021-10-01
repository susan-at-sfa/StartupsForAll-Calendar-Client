import styled from "@emotion/styled";
import { FC, useState, useEffect } from "react";
import { makeRequest } from "../../store/utils/makeRequest";
import { useAppSelector } from "../../hooks";
import FormInput from "../FormInput";
import FormLabel from "../FormLabel";
import { toast } from "react-toastify";

const AdminGoogle: FC = () => {
  const [consentURL, setConsentURL] = useState("");
  const [calendarID, setCalendarID] = useState("");
  const token = useAppSelector(({ auth }) => auth.token);
  console.log("CALENDAR ID", calendarID)

  useEffect(() => {
    getConsentURL()
  }, [])

  const getConsentURL = async (): Promise<any> => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(`${apiUrl}/events/google/google_consent`);
    const returnedConsentURL = await res.text();
    setConsentURL(returnedConsentURL);
  };

  const updateCalendarID = async (): Promise<any> => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await makeRequest(`${apiUrl}/google/update-calendar-id`, 'POST', { calendarID }, token);
    if (response.success) {
      toast("Calendar ID successfully updated")
    }
  }

  return (
    <>
      <form>
        <FormLabel htmlFor="calendarID" text="Calendar ID" />
        <FormInput
          placeholder="Calendar ID"
          type="text"
          required
          disabled={false}
          value={calendarID}
          onChange={setCalendarID}
          name="calendarID"
        />
        <Button onClick={() => updateCalendarID()}>
          <Anchor href={consentURL}>Authorize GCal</Anchor>
        </Button>
      </form>
    </>
  );
}

const Anchor = styled.a`
  display: inline-block;
  width: 100%;
  height: 100%;
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
    &:hover{
      color: white;
      background-color: var(--button-dark-hover);
      cursor: pointer;
      transition: 0.5s ease;
    }
`;
export default AdminGoogle;
