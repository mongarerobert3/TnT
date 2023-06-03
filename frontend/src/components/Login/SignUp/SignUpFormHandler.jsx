import { useState, useEffect } from 'react';
import signUpValidation from './signUpValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpFormHandler = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    setErrors(signUpValidation(values));
    setIsSubmitting(true);
  };

  const postData = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      await axios.post('http://localhost:5000/api/user', values, config);
      setShowRedirect(true);
    } catch (error) {
      console.log('Error creating user:', error);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      postData();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (showRedirect) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [navigate, showRedirect]);

  return { handleChange, handleSignUpSubmit, values, errors, showRedirect };
};

export default SignUpFormHandler;
