import React, { useEffect, useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import {
    Button,
    CircularProgress,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
    Avatar,
} from "@mui/material";
import logo from "../files/logo.png";
import { Modal } from 'antd';
import axios from 'axios';
import { BASEURL } from '../Connections/BASEURLS';


const Admin: React.FC = () => {
    const [showModal, setshowModal] = useState<boolean>(false);
    const [title, settitle] = useState<string>("");
    const [description, setdescription] = useState<string>("");
    const [all_video, setall_video] = useState([]);

    useEffect(() => {
        axios.get(`${BASEURL}/video/all`).then((response) => {
            const data = response.data.videos;
            setall_video(data);
        }).catch((err) => {
            console.log(err);

        })
    }, [])


    return (
        <>
            <Modal  open={showModal} footer={null} title={<h1>Add Video</h1>}>
                <div className=' space-y-4 mt-5'>
                    <TextField label="Title" fullWidth value={title} onChange={(e) => {
                        settitle(e.target.value);
                    }} />
                    <TextField label="Description" fullWidth value={description} onChange={(e) => {
                        setdescription(e.target.value);
                    }} />
                    <input type="file" />
                    <div>
                       <Button style={{width:"100%"}}>Submit</Button>
                    </div>
                </div>
            </Modal>
            <div className='grid grid-cols-10'>
                <div className=' col-span-2'>
                    <AdminSidebar />
                </div>
                <div className=' col-span-8  bg-[#FAF7F6]'>
                    <div className=' bg-white shadow-sm'>
                        <img className=' cursor-pointer' src={logo} style={{ width: "100%", maxHeight: 70, maxWidth: 100 }} />
                    </div>
                    <div className=' flex items-center justify-between px-5 mt-3'>
                        <div>
                            <h1 className=' text-2xl font-semibold'>All Videos</h1>
                        </div>
                        <div>
                            <Button onClick={() => {
                                setshowModal(true);
                            }}>Add Video</Button>
                        </div>
                    </div>
                    <div className=' px-5 mt-6'>
                        <TableContainer
                            elevation={3}
                            component={Paper}
                            style={{ borderRadius: 10 }}
                        >

                            <Table>
                                <TableHead style={{ backgroundColor: "#F8F9FA" }}>
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                fontFamily: "'Poppins', sans-serif",
                                                paddingLeft: 21,
                                            }}
                                        >
                                            Title
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                fontFamily: "'Poppins', sans-serif",
                                                paddingLeft: 21,
                                            }}
                                        >
                                            Description
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                fontFamily: "'Poppins', sans-serif",
                                                paddingLeft: 21,
                                            }}
                                        >
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        all_video.map((list: any) => {
                                            return (
                                                <TableRow>
                                                    <TableCell
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                            paddingLeft: 21,
                                                        }}
                                                    >
                                                        {list.title}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                                    >
                                                        {list.description}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                                    >
                                                        <div>
                                                            <IconButton>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                                </svg>

                                                            </IconButton>
                                                            <IconButton>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>

                                                            </IconButton>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;