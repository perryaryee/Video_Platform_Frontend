import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Connections/BASEURLS";
import { AuthHeader } from "../Components/AuthHeader";
import { message } from "antd";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../Redux/Slices/UserSlice";


const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const email = useSelector(selectUserEmail);

    const codeInputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [codeValues, setCodeValues] = useState(["", "", "", "", "", ""]);
    const codeValuesJoined = codeValues.join("");

    const handleCodeChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const code = e.target.value;
        const newCodeValues = [...codeValues];
        newCodeValues[index] = code;
        setCodeValues(newCodeValues);

        if (code.length === 1 && index < codeInputRefs.length - 1) {
            codeInputRefs[index + 1].current?.focus();
        }
    };

    const submitCode = () => {
        setLoading(true);
        const payload = {
            email: email,
            verification_code: codeValuesJoined,
        };
        axios
            .post(`${BASEURL}/auth/verify-email`, payload)
            .then((response) => {
                const data = response.data.code;
                setLoading(false);
                navigate("/home");
                // if (data) {

                // }
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
                                Email Verification
                            </h1>
                            <p className="text-center py-3 text-lg">
                                Enter the 6-digit code you received in your mail
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            {codeInputRefs.map((inputRef, index) => (
                                <TextField
                                    key={index}
                                    inputRef={inputRef}
                                    autoFocus={index === 0}
                                    type="tel"
                                    value={codeValues[index]}
                                    style={{
                                        margin: 8,
                                        fontSize: 19,
                                        fontWeight: "bold",
                                    }}
                                    onChange={(e) => handleCodeChange(index, e)}
                                />
                            ))}
                        </div>
                        <div className="py-4 mt-4">
                            {loading ? (
                                <Button
                                    startIcon={
                                        <CircularProgress size={17} style={{ color: "white" }} />
                                    }
                                    onClick={submitCode}
                                    style={{
                                        backgroundColor: "#703578",
                                        color: "white",
                                        padding: 13,
                                        width: "100%",
                                    }}
                                >
                                    authenticating......
                                </Button>
                            ) : (
                                <Button
                                    onClick={submitCode}
                                    style={{
                                        backgroundColor: "#703578",
                                        color: "white",
                                        padding: 13,
                                        width: "100%",
                                    }}
                                >
                                    submit
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailVerification;
