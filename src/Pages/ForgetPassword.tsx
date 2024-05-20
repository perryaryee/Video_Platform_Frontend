import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../Connections/BASEURLS";
import { AuthHeader } from "../Components/AuthHeader";
import { message } from "antd";

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [email, setemail] = useState<string>("");


  const submitEmail = () => {
    setLoading(true);
    const payload = {
      email
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
                Password Reset
              </h1>
              <p className="text-center py-3 text-lg">
                Enter your email to reset your password
              </p>
            </div>
            <div className="">
              <TextField value={email} onChange={(e: any) => {
                setemail(e.target.value);
              }} fullWidth label="Email" />
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
                  authenticating......
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

export default ForgetPassword;
