import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Dashboard, SignupForm, UserProfile, NotFoundPage } from './components';
import { AuthProvider } from "./HOC/withAuth";
import RequireAuth from "./HOC/RequireAuth";

import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
