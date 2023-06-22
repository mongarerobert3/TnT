import { useState } from 'react';
import validation from './validation';
//import { useAuth0 } from "@auth0/auth0-react";
//import auth0 from 'auth0';
//import { useNavigate } from 'react-router-dom';
//import axios from 'axios';

const useForm = () => {
  //const { loginWithRedirect } = useAuth0();
  //const navigate = useNavigate();

  /**const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const auth0Management = new auth0.ManagementClient({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  }); **/

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  /**const handleLogin = async () => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently();
        const user = await auth0Management.getUser({ id: accessToken.sub });

        if (user) {
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };

          const response = await axios.post(
            'http://localhost:5000/api/user/login',
            values,
            config
          );

          const data = response.data;
          console.log('Login data:', data);
          
          navigate('/dashboard', { replace: true });
        } else {
          // User does not exist in the database
          // Display an error message or take appropriate action
          console.log('User does not exist');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }; **/

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setLoginError(false);

    /**if (Object.keys(errors).length === 0) {
      try {
        await loginWithRedirect({
          redirectUri: "https://127.0.0.1:3000/dashboard",
        });
        //handleLogin();
      } catch (error) {
        setLoginError(true);
      }
    }**/
  };

  return { handleChange, handleFormSubmit, errors, loginError, values };
};

export default useForm;
