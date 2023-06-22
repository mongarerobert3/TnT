import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RequireAuth } from './HOC/RequireAuth'
import './index.css'
import App from './App.jsx';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RequireAuth>
        <App />
      </RequireAuth>
    </BrowserRouter>
  </React.StrictMode>
);