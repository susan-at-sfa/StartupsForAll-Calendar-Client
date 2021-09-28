import styled from "@emotion/styled";
import { FC, useState, useEffect } from "react";
import { useAppSelector } from "../../hooks";

const AdminGoogle: FC = () => {
  const [consentURL, setConsentURL] = useState("");

  //When the user clicks the button, it will call to server to run generateAuthUrl
  //The url created by generateAuthUrl will be returned to browser.
  //User will be taken to url to authorize consent
  //User will be redirected to localhost:3000
  //Code will be sent to ? Database(store refresh token) : Front End(store in admin user)

  const user = useAppSelector(({ user }) => user);
  console.log("User", user);

  useEffect(() => {
    getConsentURL();
  }, [consentURL]);

  const getConsentURL = async (): Promise<any> => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const res = await fetch(`${apiUrl}/events/google/google_consent`);
    const returnedConsentURL = await res.text();
    console.log("RETURNED URL", returnedConsentURL);
    return setConsentURL(returnedConsentURL);
  };

  return (
    <Button>
      <Anchor href={consentURL}>Authorize GCal</Anchor>
    </Button>
  );
};

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
`;
export default AdminGoogle;
