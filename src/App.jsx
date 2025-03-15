// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        
      </Routes>
    
  );
};

export default App;