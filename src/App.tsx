import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Regsiter from "./Pages/Register";
import Register from './Pages/Register';
import ForgetPassword from './Pages/ForgetPassword';
import EmailVerifcation from './Pages/EmailVerifcation';
import NewPassword from './Pages/NewPassword';
import Admin from "./Pages/Admin";
import AdminLogin from './Pages/AdminLogin';
import { useSelector } from 'react-redux';
import { selectUserToken } from './Redux/Slices/UserSlice';
import { selectAdminToken } from './Redux/Slices/AdminSlice';

function App() {

  const isLoggedInUser = useSelector(selectUserToken);
  const isLoggedInAdmin = useSelector(selectAdminToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={isLoggedInAdmin ? <Admin /> : <Navigate to="/" />} />
        <Route path="/home" element={isLoggedInUser ? <Home /> : <Navigate to="/" />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/email-verification" element={<EmailVerifcation />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
