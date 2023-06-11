import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkEmailExists();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const checkEmailExists = async () => {
    try {
      alert ('A moment we are sorting you')
      const response = await axios.get(`http://localhost:5000/api/user/${email}`);
      const userData = response.data;
      if (userData && userData.email === email) {
        alert ('Please check your Email to change your Password')
      } else {
        console.log('Email does not exist');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='forgot-password'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Enter your Email'
            onChange={handleChange}
            required
          />
        </div>
        <button 
          className='btn-login forgot-btn'
          type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
