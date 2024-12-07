import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignupPage from '../pages/Signup';
import LoginPage from '../pages/Login';

interface AuthProps {
  onAuthenticate: () => void; // Pass authentication handler as a prop
}

const Auth: React.FC<AuthProps> = ({ onAuthenticate }) => (
  <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage onAuthenticate={onAuthenticate} />} />
          <Route path="/signup" element={<SignupPage onAuthenticate={onAuthenticate} />} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default Auth;
