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
import AdminProducts from './pages/Admin/adminProducts';
import Forgotpassword from './pages/Auth/forgotPassword';
import Resetpassword from './pages/Auth/resetPassword';
import Signin from './pages/Auth/signin';
import Signup from './pages/Auth/signup';
import Cart from './pages/User/cart';
import Home from './pages/User/home';
import NotFound from './pages/User/NotFound';
import Profile from './pages/User/profile';

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/cart' index element={<Cart />} />
        <Route element={<AvoidCreateOrSignin />}>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
          <Route path='/reset-password/:id' element={<Resetpassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin/products' index element={<AdminProducts />} />
        </Route>
        <Route path='*' element={<NotFound />} />
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

function AdminRoute() {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (!auth.isLoggedIn || auth.userInfo.role !== 'admin') {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

export default PageRoutes;
