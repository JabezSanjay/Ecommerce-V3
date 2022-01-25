import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Auth/signin';
import Signup from './pages/Auth/signup';
import Home from './pages/User/home';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
