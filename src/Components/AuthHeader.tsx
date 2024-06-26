import React, { useState } from 'react';
import logo from "../files/logo.png";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../Connections/BASEURLS';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ClearUser, selectUserToken } from '../Redux/Slices/UserSlice';
import { message } from 'antd';

interface Props {
    showLogins?: boolean,
    showLogout?: boolean,
    homeLogout?: React.MouseEventHandler<HTMLButtonElement>
}

export const AuthHeader: React.FC<Props> = ({ showLogins, showLogout, homeLogout }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectUserToken);
    const [loadingOut, setloadingOut] = useState<boolean>(false);



    const Logout = () => {
        setloadingOut(true);
        axios.post(`${BASEURL}/auth/logout`, {}, { 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            message.success(response.data.message);
            dispatch(ClearUser());
            navigate("/");
            setloadingOut(false);
        }).catch((err) => {
            console.log(err);
            setloadingOut(false);
            message.warning(err.response.data.message);
        });
    };


    return (
        <div className='flex items-center justify-between px-6 shadow-sm sticky  top-0 z-50 py-1 bg-white'>
            <img onClick={() => {
                navigate("/");
            }} className=' cursor-pointer' src={logo} style={{ width: "100%", maxHeight: 70, maxWidth: 100 }} />
            <div>
                {showLogins ?
                    <div className=' flex items-center space-x-3'>
                        <Button onClick={() => {
                            navigate("/admin-login")
                        }} style={{ border: "1px solid #703578", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>ADMIN</Button>
                        <Button onClick={() => {
                            navigate("/register")
                        }} style={{ backgroundColor: "#703578", color: "white", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>REGISTER</Button>
                    </div>
                    :
                    showLogout ?
                        <div className=' flex items-center space-x-3'>
                            <Button onClick={() => {
                                navigate("/admin-login")
                            }} style={{ border: "1px solid #703578", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>ADMIN</Button>
                            <Button onClick={Logout} style={{ backgroundColor: "#703578", color: "white", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>{loadingOut ? "LODING" : "LOGOUT"}</Button>
                        </div>
                        :
                        <div className=' flex items-center space-x-3'>
                            <Button onClick={() => {
                                navigate("/admin-login")
                            }} style={{ border: "1px solid #703578", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>ADMIN</Button>
                            <Button onClick={() => {
                                navigate("/")
                            }} style={{ backgroundColor: "#703578", color: "white", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>LOGIN</Button>
                        </div>
                }
            </div>
        </div>
    )
}



