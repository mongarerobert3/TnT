import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './HOC/withAuth';


import './index.css';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    )
  }
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<AuthProvider><Dashboard /></AuthProvider>} /> 
        <Route path="/profile" element={<AuthProvider><UserProfile /></AuthProvider>} /> 
        <Route path="/signup" element={<SignupForm />} /> 
        <Route path="/hotdeals" element={<HotDeals />} /> 
        <Route path="/tour/:id" element={<TourPage />} />
        <Route path="/book" element={<BookingWidget />} />
        <Route path="/reset" element={<ForgotPassword />} /> 
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
  );
};

export default App;
