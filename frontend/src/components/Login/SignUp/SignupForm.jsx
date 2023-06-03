import React from 'react';
import {Link} from "react-router-dom";
import SignUpFormHandler from './SignUpFormHandler';
import { Footer } from '../../../components'

import '../App.css'

const SignupForm = ({ submitForm }) => {
  const { handleChange, handleSignUpSubmit, values, errors, showRedirect } = SignUpFormHandler();

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <div>
          <h2 className="login-title text-4xl text-center mb-4">Create Account</h2>
        </div>
        {showRedirect ? (
          <div className="redirect-message">
            <p>Redirecting in 5 seconds...</p>
          </div>
        ) : (
          <form className="form-wrapper max-w-md mx-auto" onSubmit={handleSignUpSubmit}>
            <div className="login-name">
              <label className="label">Full Name</label>
              <input
                className="login-input"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="login-email">
              <label className="label">Email</label>
              <input
                className="login-input"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="login-password">
              <label className="label">Password</label>
              <input
                className="login-input"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <button className="login-submit" type="submit">
                Submit
              </button>
            </div>
            <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
          </form>
        )}
      </div>
      < Footer />
    </div>
  );
};

export default SignupForm;
