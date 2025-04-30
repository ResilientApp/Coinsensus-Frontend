import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AddExpense from 'components/AddExpense';
import Auth from 'components/Auth';
import AccountPage from 'pages/AccountPage';
import ActivityPage from 'pages/ActivityPage';
import FriendsPage from 'pages/FriendsPage';
import GroupsPage from 'pages/GroupsPage';
import HomePage from 'pages/HomePage';
import PublicHomePage from 'pages/PublicHomePage';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

// Create a wrapper component to use navigation
const AppContent: React.FC<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}> = ({ isAuthenticated, setIsAuthenticated, isModalOpen, handleCloseModal }) => {
  const navigate = useNavigate();
  const [showAuthPage, setShowAuthPage] = useState(false);
  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleOpenModal = () => {
    // ✅ open the AddExpense modal
    const openEvent = new CustomEvent('openAddExpense');
    window.dispatchEvent(openEvent);
  };

  return (
    <>
      {isModalOpen && <AddExpense onClose={handleCloseModal} />}
      <Routes>

        <Route path="/" element={
          // showAuthPage ? (
          //   <Auth onAuthenticate={() => { setIsAuthenticated(true); setShowAuthPage(false); }} />
          // ) : (
          //   <PublicHomePage onLoginClick={() => setShowAuthPage(true)} />
          // )
          <PublicHomePage onLoginClick={() => navigate('/auth')}/>
        } />
          {/* <Route path="/auth/*" element={<Auth onAuthenticate={() => setIsAuthenticated(true)} />} /> */}
          <Route path="/auth/*" element={<Auth onAuthenticate={() => setIsAuthenticated(true)} />}>
            <Route index element={<LoginPage onAuthenticate={() => setIsAuthenticated(true)} />} />
            <Route path="signup" element={<SignupPage onAuthenticate={() => setIsAuthenticated(true)} />} />
          </Route>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-expense" element={<AddExpense onClose={() => navigate('/')} />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        {/* </Route> */}
      </Routes>
    </>
  );
};

// Main App component
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to false initially for public page
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Check if the user is already authenticated (optional)
    const username = localStorage.getItem('username');
    if (username) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>

      {isAuthenticated ? (
        <AppContent
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <AppContent
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      )}

    </>
  );
};

export default App;
