import styled from "@emotion/styled";
import { FC, useState, useEffect } from "react";

const AdminGoogle: FC = () => {
  const [consentURL, setConsentURL] = useState("");

  useEffect(() => {
    getConsentURL()
  }, [])

  const getConsentURL = async (): Promise<any> => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(`${apiUrl}/events/google/google_consent`);
    const returnedConsentURL = await res.text();
    setConsentURL(returnedConsentURL);
  };

  return (
    <Button>
      <Anchor href={consentURL}>Authorize GCal</Anchor>
    </Button>
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
