import { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { makeRequest } from '../../store/utils/makeRequest';
import { useAppSelector } from '../../hooks';

const GoogleAuthCallback = () => {
  const location = useLocation();
  const history = useHistory();
  const token = useAppSelector(({ auth }) => auth.token);

  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  useEffect(() => {
    const sendCodeToApi = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await makeRequest(`${apiUrl}/events/google/oauth2callback`, 'POST', { code }, token);
      console.log(`response`, response);

      if (response.success) {
        history.push('/admin');
      }
    }

    if (code) {
      sendCodeToApi();
    }
  }, [code]);

  return (
    <div>
      Authorizing...
    </div>
  )
}

export default GoogleAuthCallback;
