import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, 
  Login, 
  Dashboard, 
  SignupForm,
  UserProfile, 
  NotFoundPage,
  HotDeals,
  TourPage,
  BookingWidget,
  ForgotPassword,
} from './components';

import './index.css';

const App = () => {

  function isAuthenticated() {
    return (
      localStorage.getItem('userId') && localStorage.getItem('token')) ||
      localStorage.getItem('googleToken')
  }
  
  const ProtectedRoute = ({ children, ...rest }) => {
    const isAuth = isAuthenticated();
    return isAuth ? children : 
    (
      <>
        <Navigate to="/login" replace />
      </>
    );
  };

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<UserProfile />} /> 
          <Route path="/signup" element={<SignupForm />} /> 
          <Route path="/hotdeals" element={<HotDeals />} /> 
          <Route path="/tour/:id" element={<TourPage />} />
          <Route path="/book" element={<BookingWidget />} />
          <Route path="/reset" element={<ForgotPassword />} /> 
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
