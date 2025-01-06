import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Layout/Navbar/Navbar';
import HomePage from './components/Home/HomePage';
import UserDashboard from './components/Dashboard/UserDashboard';
import OrganizerDashboard from './components/Dashboard/OrganizerDashboard';
import LoadingSpinner from './components/Layout/LoadingSpinner';
import ProtectedRoute from './components/Layout/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/events" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/organizer" 
            element={
              <ProtectedRoute requiredRole="organizer">
                <OrganizerDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;