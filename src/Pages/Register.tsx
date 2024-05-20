import React, { useState } from 'react'
import { AuthHeader } from '../Components/AuthHeader';
// import Team from "../files/team.jfif"
import { Button, Checkbox, CircularProgress, TextField } from '@mui/material';
// import axios from 'axios';
// import BASEURL from '../Connection/Connecction';
// import { useDispatch } from 'react-redux';
// import { Add_Wk } from '../Redux/Slices/WorkSpaceData';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { BASEURL } from '../Connections/BASEURLS';
// import { Add_User } from '../Redux/Slices/UserSlice';

const Register: React.FC = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpLoading, setsignUpLoading] = useState<boolean>(false);
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const Register_Account = () => {
    if (!email && !password) {
      message.warning("All fields are required !!")
    } else {
      setsignUpLoading(true);
      const payload = {
        email,
        password
      }

      axios.post(`${BASEURL}/auth/signup`, payload).then((response) => {
        setsignUpLoading(false);
        const data = response.data.user;
        if (data) {
          // dispatch(Add_User({
          //     userid: data.tblid,
          //     email: data.email,
          //     user_name: data.user_name
          // }))
          navigate("/email-verification");
        }
      }).catch((err) => {
        setsignUpLoading(false);
        message.error(err.response.data.message);
      });
    }

  }


  return (
    <>
      <AuthHeader />
      <div className=' grid grid-cols-10 bg-[#FAF7F6] h-screen'>
        <div className=' col-span-3  px-10  py-16 '>
          {/* <img className=' rounded-3xl ml-10' src={Team} style={{ width: "100%", height: 600, width: 700 }} /> */}
        </div>
        <div className=' col-span-7 px-32'>
          <div className='pt-16'>
            <div>
              <h1 className=' text-5xl'>Create your <span className=' text-5xl font-semibold'>personal</span> account</h1>
              <div className=' bg-white rounded-xl px-8 py-10 mt-6 shadow-sm'>
                <h1 className=' pb-4'>or clients trading for business purposes or on behalf of a business entity. Learn more</h1>
                <div className=' space-y-6'>
                  <TextField value={email} onChange={(e) => {
                    setemail(e.target.value);
                  }} fullWidth label="Email" />
                  <TextField type="password" value={password} onChange={(e) => {
                    setpassword(e.target.value);
                  }} fullWidth label="Password" />
                  <div className=' flex justify-end'>
                    {/* <Checkbox /> */}
                    <h1 onClick={() => {
                      navigate("/reset-password");
                    }}>forgot password?</h1>
                  </div>
                  <div className=' grid place-items-center'>
                    {signUpLoading ? <Button onClick={Register_Account} style={{ backgroundColor: "#703578", color: "white", textTransform: "initial", paddingTop: 13, fontSize: 14, fontWeight: "bold", paddingBottom: 13, paddingLeft: 100, paddingRight: 100, borderRadius: 30 }}> <CircularProgress size={17} style={{ color: "white" }} /></Button> :
                      <Button onClick={Register_Account} style={{ backgroundColor: "#703578", color: "white", textTransform: "initial", paddingTop: 13, fontSize: 14, fontWeight: "bold", paddingBottom: 13, paddingLeft: 100, paddingRight: 100, borderRadius: 30 }}>Create Account</Button>
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;