import React from 'react';
import logo from "../files/logo.png";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface Props {
    onClick: () => void;
}

const AdminHeader: React.FC<Props> = ({ onClick }) => {
    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-between  px-4 shadow-sm sticky  top-0 z-50 py-1 bg-white'>
            <img onClick={() => {
                navigate("/");
            }} className=' cursor-pointer' src={logo} style={{ width: "100%", maxHeight: 70, maxWidth: 100 }} />

            <button onClick={onClick} className=' border-2 border-[#703578] text-[#703578] px-5 py-2 font-bold rounded-[3px]'>LOGOUT</button>

        </div>
    )
}

export default AdminHeader