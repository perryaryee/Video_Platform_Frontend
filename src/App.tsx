import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Regsiter from "./Pages/Register";
import Register from './Pages/Register';
import ForgetPassword from './Pages/ForgetPassword';
import EmailVerifcation from './Pages/EmailVerifcation';
import NewPassword from './Pages/NewPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/email-verification" element={<EmailVerifcation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
