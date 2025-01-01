import { LayoutCompo } from '../componets/layout';
import { useSelector } from 'react-redux';

export const HomePage = () => {
  const { user } = useSelector(state => state.user);
  // const getUserData = () => {

  //   const cookies = document.cookie;
  //   if (!cookies.includes('logintoken=')) {
  //     setError('Redirecting to login...');
  //     setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
  //     return;
  //   }

  //   setLoading(true);
  //   axios.post(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {}, {
  //     withCredentials: true,
  //   })
  //     .then(res => {
  //       setUserData(res.data);
  //     })
  //     .catch(err => {
  //       setError(err.response?.data?.message || 'Failed to fetch user data.');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getUserData();
  // }, [user]);

  return (
    <>
      <LayoutCompo >
        <div>
          <h1>Home Page</h1>
          <p>Welcome to the home page, {user?.name}!</p>
        </div>
      </LayoutCompo>
    </>
  );
};
