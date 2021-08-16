import { FC, useCallback, useState, useEffect, useMemo } from 'react';
import logo from '../../assets/logo.svg';
import Loading from '../../components/Loading';
import { useAppDispatch } from '../../hooks';
import { setToken } from '../../store/slices/auth/authSlice';
import { makeRequest } from '../../store/utils/makeRequest';
import './index.css';

interface APOD {
  hdurl: string;
  explanation: string;
  date: string;
  url: string;
  copyright: string;
  media_type: string;
  service_version: string;
  title: string;
}

const Ratings: FC = () => {
  const dispatch = useAppDispatch();
  const [apod, setApod] = useState<APOD | null>(null);
  const [date, setDate] = useState(new Date());

  console.log(apod);

  const fetchAPOTD = useCallback(async () => {
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${formattedDate}`;
    console.log(url);
    const { success, data, error } = await makeRequest(url, 'GET');
    if (success) {
      setApod(data);
    } else {
      console.log(error);
    }
  }, [date]);

  useEffect(() => {
    fetchAPOTD();
    return () => {
      setApod(null);
    };
  }, [fetchAPOTD]);

  function handleLogout() {
    dispatch(setToken({ token: '' }));
  }

  function handleChangeAPOD() {
    const newDate = new Date(date.setDate(date.getDate() - 1));
    setDate(newDate);
  }
  const media = useMemo(() => {
    const { media_type = '', url = '', hdurl = '', title = '' } = apod ?? {};

    switch (media_type) {
      case 'video':
        return (
          <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auth' }}>
            <iframe width="420" height="315" src={url}></iframe>
          </div>
        );
      case 'image':
        return (
          <picture>
            <source srcSet={hdurl} />
            <source srcSet={url} />
            <img style={{ maxWidth: '100%', height: '500px' }} alt={title} />
          </picture>
        );
      default:
        return '';
    }
  }, [apod]);

  if (!apod) {
    return <Loading />;
  }

  return (
    <div className="Ratings">
      <header className="Ratings-header">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>{apod?.title}</p>
          <button style={{ margin: '1rem', height: '25px' }} onClick={handleChangeAPOD}>
            Next
          </button>
        </div>
        <div className="content">
          {media}
          <p style={{ padding: '1rem 2rem', fontSize: '12px' }}>{apod.explanation}</p>
        </div>
        <div className="button">
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </header>
    </div>
  );
};

export default Ratings;
