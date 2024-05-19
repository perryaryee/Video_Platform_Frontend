import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../files/logo.png";
import { AuthHeader } from '../Components/AuthHeader';
// import axios from "axios";
// import { useDispatch } from 'react-redux';
// import { AuthHeader } from '../Components/AuthHeader';
// import { message } from 'antd';


const Login = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    // const dispatch = useDispatch();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");



    // const Create_account = () => {
    //     if (!email && !password) {
    //         message.warning("Email and Password is required!!");
    //     }
    //     else {
    //         setloading(true);

    //         const payload = {
    //             email,
    //             password
    //         }

    //         axios.post(`${BASEURL}/users/login`, payload).then((response) => {
    //             setloading(false);
    //             const data = response.data.user;
    //             if (data) {
    //                 dispatch(Add_User({
    //                     userid: data.tblid,
    //                     email: data.email,
    //                     user_name: data.user_name
    //                 }))
    //                 navigate("/create-work-space");
    //             }
    //         }).catch((err) => {
    //             setloading(false);
    //             //  setloading(true);
    //             message.error(err.response.data.message);

    //         })
    //     }
    // }

     const Create_account = () => {
        
     }
    return (
        <div>
           <AuthHeader showLogins />
            <div className=' grid place-items-center bg-[#FAF7F6]'>
                <div className=' my-20'>
                    <div className=' bg-white shadow-sm py-8 px-8 rounded-xl'>
                        <div className=' grid place-items-center'>
                            <img src={logo} style={{ width: 120, height: 120 }} />
                        </div>
                        <div className=' space-y-3'>
                            <h1 className=' font-bold text-5xl'>First, enter your email</h1>
                            <h1 className=' text-center'>We suggest using the email address you use at work</h1>
                        </div>
                        <div className=' mt-12'>
                            <div className=' space-y-8'>
                                <TextField value={email} onChange={(e) => {
                                    setemail(e.target.value);
                                }} fullWidth label="Email" />
                                <TextField type="password" value={password} onChange={(e) => {
                                    setpassword(e.target.value);
                                }} fullWidth label="Password" />
                            </div>
                            {loading ? <Button onClick={() => {
                                navigate("/create-work-space")
                            }} style={{ backgroundColor: "#703578", width: "100%", color: "white", padding: 14, marginTop: 30 }}><CircularProgress style={{ color: "white" }} size={17} /></Button> :
                                <Button onClick={Create_account} style={{ backgroundColor: "#703578", width: "100%", color: "white", padding: 14, marginTop: 30 }}>Continue</Button>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login