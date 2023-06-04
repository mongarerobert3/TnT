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
          <h2 className="login-title text-4xl text-center mb-4">Sign Up <span>Tours N Travel</span></h2>
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
                className="input-line"
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
                className="input-line"
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
                className="input-line"
                type="password"
                name="password"
                placeholder='5+ characters'
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <button className="login-submit" type="submit">
              Create Account
              </button>
            </div>
            <div className="text-center py-4 mt-3 text-gray-500">
            Already a member? <Link className="underline text-blue-500" to={'/login'}>Login</Link>
          </div>
          </form>
        )}
      </div>
      < Footer />
    </div>
  );
};

export default SignupForm;
