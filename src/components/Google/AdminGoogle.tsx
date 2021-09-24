import { FC, useState } from 'react';

const AdminGoogle: FC = () => {
  const [consentURL, setConsentURL] = useState('')

  //When the user clicks the button, it will call to server to run generateAuthUrl
  //The url created by generateAuthUrl will be returned to browser.
  //User will be taken to url to authorize consent
  //User will be redirected to localhost:3000
  //Code will be sent to ? Database(store refresh token) : Front End(store in admin user)

  const getConsentURL = async (): Promise<any> => {
    const res = await fetch('http://localhost:1323/events/google/consent_url')
    const consentURL = await res.text()
    return (
      setConsentURL(consentURL)
    )
  }

  return (
    <div>
      <button onClick={() => getConsentURL()}>Click to Authorize App</button>
    </div >
  )
}

export default AdminGoogle;