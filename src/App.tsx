import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth'; // Assuming this is the login/signup component

const App: React.FC = () => {
  // State to manage whether to show landing page or auth component
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful authentication
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <LandingPage />
      ) : (
        <Auth onAuthenticate={handleAuthentication}/>
      )}
    </>
  );
};

export default App;