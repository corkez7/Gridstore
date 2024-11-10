import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEditConfiguration from './pages/AddEditConfiguration';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/configuration/:id" element={<PrivateRoute><AddEditConfiguration /></PrivateRoute>} />
        <Route path="/configuration/new" element={<PrivateRoute><AddEditConfiguration /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
