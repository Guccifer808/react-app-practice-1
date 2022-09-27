import React, { useMemo, useState, useEffect } from 'react';
import './styles/App.css';
import {  BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/About';
import Posts from 'pages/Posts';
import Navbar from 'components/UI/navbar/Navbar';
import Error from './pages/Error';
import AppRouter from './components/AppRouter';
import { AuthContext } from 'context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

//Auth check

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setLoading(false);
  }, [])

  return (
      <AuthContext.Provider value ={{
        isAuth,
        setIsAuth,
        isLoading
      }}>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
      </AuthContext.Provider>
  )
}

export default App;
