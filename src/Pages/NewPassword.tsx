import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Connections/BASEURLS";
import { AuthHeader } from "../Components/AuthHeader";
import { message } from "antd";

const NewPassword: React.FC = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token");

    const [loading, setLoading] = useState(false);

    const [NewPassword, setNewPassword] = useState<string>("");


    const submitEmail = () => {
        setLoading(true);
        const payload = {
            NewPassword,
            token
        };
        axios
            .post(`${BASEURL}/auth/reset-password`, payload)
            .then((response) => {
                const data = response.data.message;
                message.success(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                message.error(err.response.data.message);
            });
    };

    return (
        <>
            <AuthHeader />
            <div className="bg-white lg:bg-[#F5F6F8] h-screen">
                <div className="grid place-items-center h-[80%]">
                    <div className="bg-[white] rounded-xl w-full lg:shadow-md lg:w-[40%] p-3 lg:p-10">
                        <div className="space-y-5">
                            <h1 className="text-center font-bold text-xl lg:text-2xl">
                                New Password
                            </h1>
                        </div>
                        <div className="">
                            <TextField value={NewPassword} onChange={(e: any) => {
                                setNewPassword(e.target.value);
                            }} fullWidth label="New Password" />
                        </div>
                        <div className="py-4 mt-4">
                            {loading ? (
                                <Button
                                    startIcon={
                                        <CircularProgress size={17} style={{ color: "white" }} />
                                    }
                                    onClick={submitEmail}
                                    style={{
                                        backgroundColor: "#703578",
                                        color: "white",
                                        padding: 13,
                                        width: "100%",
                                    }}
                                >
                                    please wait......
                                </Button>
                            ) : (
                                <Button
                                    onClick={submitEmail}
                                    style={{
                                        backgroundColor: "#703578",
                                        color: "white",
                                        padding: 13,
                                        width: "100%",
                                    }}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPassword;
