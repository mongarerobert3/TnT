import React from 'react';
import { Link } from "react-router-dom";
import SignUpFormHandler from './SignUpFormHandler';
import { Footer } from '../../../components';

import '../App.css';

const SignupForm = ({ submitForm }) => {
  const { handleChange, handleSignUpSubmit, values, errors, showRedirect } = SignUpFormHandler();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h2 className="text-4xl text-center mb-8 font-semibold text-gray-700">Sign Up <span className="login-title">Tours N Travel</span></h2>
        
        {showRedirect ? (
          <div className="redirect-message text-center text-lg text-gray-700">
            <p>Redirecting in 5 seconds...</p>
          </div>
        ) : (
          <form className="form-wrapper" onSubmit={handleSignUpSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                name="password"
                placeholder="5+ characters"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="login-submit"
                type="submit"
              >
                Create Account
              </button>
            </div>

            <div className="text-center py-4 mt-3 text-gray-600">
              Already a member? <Link className="underline text-blue-500" to="/login">Login</Link>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
