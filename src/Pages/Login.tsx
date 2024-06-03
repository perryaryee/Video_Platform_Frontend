import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../files/logo.png";
import { AuthHeader } from '../Components/AuthHeader';
import { message } from 'antd';
import axios from 'axios';
import { BASEURL } from '../Connections/BASEURLS';
import { useDispatch } from 'react-redux';
import { Add_User } from '../Redux/Slices/UserSlice';


const Login = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");



    const Create_account = () => {
        if (!email && !password) {
            message.warning("Email and Password is required!!");
        }
        else {
            setloading(true);

            const payload = {
                email,
                password
            }

            axios.post(`${BASEURL}/auth/login`, payload).then((response) => {
                setloading(false);
                const data = response.data;
                if (data) {
                    dispatch(Add_User({
                        email: data.user.email,
                        token: data.token
                    }))
                    navigate("/home");
                }
            }).catch((err) => {
                setloading(false);
                //  setloading(true);
                message.error(err.response.data.message);

            })
        }
    }


    return (
        <div>
            <AuthHeader showLogins />
            <div className=' grid place-items-center bg-[#FAF7F6]'>
                <div className=' my-20'>
                    <div className=' bg-white shadow-sm py-4 px-8 rounded-xl'>
                        <div className=' grid place-items-center'>
                            <img src={logo} style={{ width: 120, height: 120 }} />
                        </div>
                        <div className=' space-y-3'>
                            <h1 className=' font-bold xl text-center'>First, enter your email</h1>
                        </div>
                        <div className=' mt-4'>
                            <div className=' space-y-8'>
                                <TextField value={email} onChange={(e) => {
                                    setemail(e.target.value);
                                }} fullWidth label="Email" />
                                <TextField type="password" value={password} onChange={(e) => {
                                    setpassword(e.target.value);
                                }} fullWidth label="Password" />
                            </div>
                            <div className=' flex justify-end cursor-pointer hover:underline'>
                                <h1 className=' pt-3' onClick={() => {
                                    navigate("/forgot-password");
                                }}>forgot password?</h1>
                            </div>
                            {loading ? <Button style={{ backgroundColor: "#703578", width: "100%", color: "white", padding: 14, marginTop: 30 }}><CircularProgress style={{ color: "white" }} size={17} /></Button> :
                                <Button onClick={Create_account} style={{ backgroundColor: "#703578", width: "100%", color: "white", padding: 14, marginTop: 30 }}>Login</Button>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login