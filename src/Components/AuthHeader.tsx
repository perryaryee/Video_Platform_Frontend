import React from 'react';
import logo from "../files/logo.png";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
    showLogins?: boolean
}

export const AuthHeader: React.FC<Props> = ({ showLogins }) => {

    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-between px-6 shadow-sm sticky  top-0 z-50 py-1 bg-white'>
            <img onClick={() => {
                navigate("/login");
            }} className=' cursor-pointer' src={logo} style={{ width: "100%", maxHeight: 70, maxWidth: 100 }} />
            <div>
                {showLogins ?
                    <div className=' flex items-center space-x-3'>
                        <Button style={{ border: "1px solid #703578", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>ADMIN</Button>
                        <Button onClick={() => {
                            navigate("/register")
                        }} style={{ backgroundColor: "#703578", color: "white", paddingLeft: 50, paddingRight: 50, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>REGISTER</Button>
                    </div>
                    : <Button onClick={() => {
                        navigate("/")
                    }} style={{ backgroundColor: "#703578", color: "white", paddingLeft: 80, paddingRight: 80, borderRadius: 6, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>LOGIN</Button>}
            </div>
        </div>
    )
}



