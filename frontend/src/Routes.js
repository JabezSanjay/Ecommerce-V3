import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from 'react-router-dom';
import Signin from './pages/Auth/signin';
import Signup from './pages/Auth/signup';
import Home from './pages/User/home';
import Profile from './pages/User/profile';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route element={<AvoidCreateOrSignin />}>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

function AvoidCreateOrSignin() {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (auth.isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

function PrivateRoute() {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

export default PageRoutes;
