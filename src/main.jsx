import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProviderWrapper } from "./context/auth.context"
import { NextUIProvider } from "@nextui-org/react";
import App from './App.jsx'
/* import './index.css' */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </Router>
    </NextUIProvider>
  </React.StrictMode>,
)
