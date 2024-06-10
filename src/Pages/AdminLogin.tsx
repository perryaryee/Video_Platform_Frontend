import { Button, CircularProgress, TextField } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../Connections/BASEURLS';

const AdminLogin: React.FC = () => {
    const [username, setusername] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);

    const navigate = useNavigate();

    const Login = () => {
        if (!username || !password) {
            message.warning("All fields are required!")
        }
        else {
            setloading(true);

            const payload = {
                username,
                password
            }

            axios.post(`${BASEURL}/admin/admin-login`, payload).then((response) => {
                setloading(false);
                const data = response.data;
                if (data) {
                    navigate("/admin");
                }
            }).catch((err) => {
                setloading(false);
                message.error(err.response.data.message);

            });
        }
    }

    return (
        <div>
            <div className=' grid place-items-center bg-[#FAF7F6] h-screen'>
                <div className=' bg-white shadow-sm py-8 px-8 rounded-xl'>

                    <div className=' space-y-3 py-3'>
                        <h1 className=' font-bold text-3xl text-center'>Admin</h1>
                    </div>
                    <div className=' mt-4'>
                        <div className=' space-y-8'>
                            <TextField value={username} onChange={(e) => {
                                setusername(e.target.value);
                            }} fullWidth label="Username" />
                            <TextField type="password" value={password} onChange={(e) => {
                                setpassword(e.target.value);
                            }} fullWidth label="Password" />
                        </div>
                        {loading ? <Button style={{ backgroundColor: "#703578", width: "100%", color: "white", padding: 14, marginTop: 30 }}><CircularProgress style={{ color: "white" }} size={17} /></Button> :
                            <Button onClick={Login} style={{ backgroundColor: "#703578", width: "100%", color: "white", padding: 14, marginTop: 30 }}>Login</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin