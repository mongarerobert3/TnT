import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const LoginHandler = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handleLogin = async () => {
    if (isAuthenticated) {
      try {
        await getAccessTokenSilently();
        navigate('/dashboard'); // Redirect to the dashboard page
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { handleLogin };
};

export default LoginHandler;
