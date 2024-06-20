import React, { useState } from 'react';
import logo from "../files/logo.png";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../Connections/BASEURLS';
import { ClearAdmin, selectAdminToken } from '../Redux/Slices/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';



const AdminHeader: React.FC = () => {
    const navigate = useNavigate();
    const [logoutload, setlogoutload] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(selectAdminToken);

    const logout_Admin = () => {
        setlogoutload(true);
        axios.post(`${BASEURL}/admin/admin-logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            message.success(response.data.message);
            dispatch(ClearAdmin());
            navigate("/");
            setlogoutload(false);
        }).catch((err) => {
            console.log(err);
            setlogoutload(false);
            message.warning(err.response.data.message);
        });
    };

    return (
        <div className='flex items-center justify-between  px-4 shadow-sm sticky  top-0 z-50 py-1 bg-white'>
            <img onClick={() => {
                navigate("/");
            }} className=' cursor-pointer' src={logo} style={{ width: "100%", maxHeight: 70, maxWidth: 100 }} />

            <button onClick={logout_Admin} className=' border-2 border-[#703578] text-[#703578] px-5 py-2 font-bold rounded-[3px]'>{logoutload ? "LOADING" : "LOGOUT"}</button>

        </div>
    )
}

export default AdminHeader