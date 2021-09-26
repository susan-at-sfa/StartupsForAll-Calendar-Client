import { FC, useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';

const AdminGoogle: FC = () => {
  const [consentURL, setConsentURL] = useState('')

  //When the user clicks the button, it will call to server to run generateAuthUrl
  //The url created by generateAuthUrl will be returned to browser.
  //User will be taken to url to authorize consent
  //User will be redirected to localhost:3000
  //Code will be sent to ? Database(store refresh token) : Front End(store in admin user)

  const user = useAppSelector(({ user }) => user)
  console.log("User", user)

  useEffect(() => {
    getConsentURL();
  }, [consentURL])

  const getConsentURL = async (): Promise<any> => {
    const res = await fetch('http://localhost:1323/events/google/google_consent')
    const returnedConsentURL = await res.text()
    console.log("RETURNED URL", returnedConsentURL)
    return (
      setConsentURL(returnedConsentURL)
    )
  }

  return (
    <div>
      <a href={consentURL}><button>Click to Authorize App</button></a>
    </div >
  )
}

export default AdminGoogle;