import { useState } from 'react';
import validation from './validation';
import axios from 'axios';


const useForm = (submitForm) => {

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setLoginError(false);
    
    try {
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

      if (data.token && data._id) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id);
        submitForm();
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      setLoginError(true);
    }
  };

  return { handleChange, handleFormSubmit, errors, loginError, values };
};

export default useForm;
