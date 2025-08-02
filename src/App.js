// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import Result from './components/Result';
import AdminPanel from './components/AdminPanel';
import NavBar from './components/NavBar';
import Home from './components/Home';
import MyResults from './components/MyResults';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  return (
    <Router>
      {isLoggedIn && (
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/quizlist" element={isLoggedIn ? <QuizList /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/quiz/:id" element={isLoggedIn ? <Quiz /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/result/:id" element={isLoggedIn ? <Result /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/results" element={isLoggedIn ? <Result /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={isLoggedIn ? <AdminPanel /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/myresults" element={<MyResults /> } />
      </Routes>
    </Router>
  );
}

export default App;
