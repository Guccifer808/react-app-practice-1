import {React, useContext} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Navbar from 'components/UI/navbar/Navbar';
import Error from '../pages/Error';
import PostIdPage from 'pages/PostIdPage';
import { publicRoutes, privateRoutes } from './router';
import Login from 'pages/Login';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';


const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth)

  if(isLoading) {
    return <Loader/>
  }

  return (
    isAuth 
    ?
    <Routes>
      {privateRoutes.map((route) => (
        <Route element={<route.element />} path={route.path} key={route.path}/>
      ))}

      <Route path="*" element={<Navigate replace to="/posts" />} />
    </Routes>
    : 
    <Routes>
      {publicRoutes.map((route) => (
        <Route element={<route.element />} path={route.path} key={route.path}/>
      ))}
      <Route path="/error" element={<Error />}></Route>
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default AppRouter