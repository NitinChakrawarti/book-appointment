
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../componets/soinner';

export const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserData = () => {

    const cookies = document.cookie;
    if (!cookies.includes('logintoken=')) {
      setError('Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
      return;
    }

    setLoading(true);
    axios.post(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {}, {
      withCredentials: true,
    })
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to fetch user data.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {loading &&
        <Spinner />
      }
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}</h1>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        !loading && <p>No user data available.</p>
      )}
    </div>
  );
};
