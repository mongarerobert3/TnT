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

import ProtectedRoute from './HOC/Protected';

import './index.css';

const App = () => {

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
