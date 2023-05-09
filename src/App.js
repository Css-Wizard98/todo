import logo from './logo.svg';
import './App.css';
import LandingPage from './components/landingPage';
import Home from './components/home';
import Login from './components/login';
import Nav from './components/nav';
import { Fragment } from 'react';
import { Switch, Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from './authContext';
import { Navigate } from 'react-router-dom';
import AuthGuard from './components/authGuard';


function App() {
  const { loggedInUser, setLoggedUser } = useContext(AuthContext);
  console.log("hihihihi", loggedInUser)
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {!loggedInUser && <Route path="/login" element={<Login />} />}
        <Route path="/dashboard" element={<AuthGuard/>} >
          <Route exact path='/dashboard' element={<Home />} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}

export default App;
