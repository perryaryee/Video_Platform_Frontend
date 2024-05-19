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
        <div className='flex items-center justify-between  px-28 shadow-sm sticky  top-0 z-50 py-1'>
            <img onClick={() => {
                navigate("/");
            }} className=' cursor-pointer' src={logo} style={{ width: "100%", maxHeight: 70, maxWidth: 100 }} />
            <div>
                {showLogins ?
                    <Button onClick={() => {
                        navigate("/register")
                    }} style={{ backgroundColor: "#703578", color: "white", paddingLeft: 60, paddingRight: 60, borderRadius: 30, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>REGISTER</Button>
                    : <Button onClick={() => {
                        navigate("/")
                    }} style={{ backgroundColor: "#703578", color: "white", paddingLeft: 80, paddingRight: 80, borderRadius: 30, paddingTop: 13, paddingBottom: 13, fontWeight: "bold", fontSize: 13 }}>LOGIN</Button>}
            </div>
        </div>
    )
}



