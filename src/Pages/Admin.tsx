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
import { Modal, message } from 'antd';
import axios from 'axios';
import { BASEURL } from '../Connections/BASEURLS';
import { useDispatch, useSelector } from 'react-redux';
import { Add_VideoDetails, selectVideoDetails } from '../Redux/Slices/VideoSlice';
import AdminHeader from '../Components/AdminHeader';
import { useNavigate } from 'react-router-dom';



interface Video {
    title: string,
    description: string,
    videopath: string,
    _id: string

}

const Admin: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videoDetails = useSelector(selectVideoDetails);
    const [showModal, setshowModal] = useState<boolean>(false);
    const [title, settitle] = useState<string>("");
    const [description, setdescription] = useState<string>("");
    const [all_video, setall_video] = useState<Video[]>([]);
    const [loader, setloader] = useState<boolean>(false);
    const [videopath, setvideopath] = useState([]);
    const [TriggerRefresh, setTriggerRefresh] = useState<number>(0);
    const [submit_loading, setsubmit_loading] = useState<boolean>(false);
    const [EditModal, setEditModal] = useState<boolean>(false);
    const [CurrentVideoId, setCurrentVideoId] = useState<string>("");

    useEffect(() => {
        setloader(true);
        axios.get(`${BASEURL}/video/all`).then((response) => {
            const data = response.data.videos;
            setall_video(data);
            setloader(false);
        }).catch((err) => {
            console.log(err);

        })
    }, [TriggerRefresh]);


    const handleVideoChange = (e: any) => {
        setvideopath(Array.from(e.target.files));
    };


    const handleSubmit = async () => {
        if (!title || !description) {
            message.warning("All Fields are required!!")
        }
        else {
            setsubmit_loading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            videopath.forEach((videopath) => {
                formData.append('videopath', videopath);
            })

            try {
                const response = await axios.post(`${BASEURL}/video/upload_video`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setsubmit_loading(false);
                setshowModal(false);
                message.success(response.data.message);
                settitle("");
                setdescription("");
                setvideopath([]);
                setTriggerRefresh(Math.random());
            } catch (error: any) {
                console.error('Error uploading video:', error);
                setsubmit_loading(false);
                message.warning(error.response.data.message);

            }
        }

    };

    const openEditModal = (video: Video) => {
        setCurrentVideoId(video._id);
        settitle(video.title);
        setdescription(video.description);
        setEditModal(true);
    };

    const [editloading, seteditloading] = useState(false);

    const handleEditSubmit = async () => {
        seteditloading(true);
        const payload = {
            title,
            description
        }
        try {
            const response = await axios.put(`${BASEURL}/video/${CurrentVideoId}`, payload);
            seteditloading(false);
            message.success(response.data.message);
            setTriggerRefresh(Math.random());
            setEditModal(false);
        } catch (error: any) {
            seteditloading(false);
            message.error(error.response.data.message);
            console.log(error);

        }

    }


    return (
        <>
            <Modal onCancel={() => {
                setshowModal(false);
            }} open={showModal} footer={null} title={<h1>Add Video</h1>}>
                <div className=' space-y-6 mt-5'>
                    <TextField label="Title" fullWidth value={title} onChange={(e) => {
                        settitle(e.target.value);
                    }} />
                    <TextField label="Description" fullWidth value={description} onChange={(e) => {
                        setdescription(e.target.value);
                    }} />
                    {/* <input type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleVideoChange}
                        multiple
                        required /> */}
                    <label className=' w-full rounded-md' htmlFor="video" style={{ border: "2px dashed #ccc", padding: "14px", display: "inline-block", cursor: "pointer" }}>
                        <div className=' grid place-items-center'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                Upload Video
                            </div>
                        </div>
                        <input
                            type="file"
                            id="video"
                            accept="video/*"
                            onChange={handleVideoChange}
                            multiple
                            required
                            style={{ display: "none" }} // Hide the actual input element
                        />
                    </label>
                    <div>
                        {submit_loading ? <Button variant="contained" style={{ width: "100%", backgroundColor: "#703578", color: "white" }}><CircularProgress size={17} style={{ color: "white" }} /></Button> :
                            <Button onClick={handleSubmit} variant="contained" style={{ width: "100%", backgroundColor: "#703578", color: "white" }}>Submit</Button>
                        }
                    </div>
                </div>
            </Modal>
            <Modal open={EditModal} footer={null} title={<h1>Edit Video</h1>} onCancel={() => {
                setEditModal(false);
                setTriggerRefresh(Math.random());
            }}>
                <div className=' space-y-6 mt-5'>
                    <TextField label="Title" fullWidth value={title} onChange={(e) => {
                        settitle(e.target.value);
                    }} />
                    <TextField label="Description" fullWidth value={description} onChange={(e) => {
                        setdescription(e.target.value);
                    }} />
                    {editloading ? <Button variant="contained" style={{ width: "100%", backgroundColor: "#703578", color: "white" }}><CircularProgress size={17} style={{ color: "white" }} /></Button> : <Button onClick={handleEditSubmit} variant="contained" style={{ width: "100%", backgroundColor: "#703578", color: "white" }}>Submit</Button>}

                </div>
            </Modal>
            <div className='grid grid-cols-10'>
                <div className=' col-span-2'>
                    <AdminSidebar />
                </div>
                <div className=' col-span-8  bg-[#FAF7F6]'>
                    <AdminHeader onClick={() => {
                        Modal.warning({
                            title: "Are you sure you want to make logout?",
                            okText: "Yes",
                            centered: true,
                            closable: true,
                            onOk: () => {
                                navigate("/");
                            },

                        })

                    }} />

                    <div className=' flex items-center justify-between px-5 mt-3'>
                        <div>
                            <h1 className=' text-2xl font-semibold'>All Videos</h1>
                        </div>
                        <div>
                            <Button variant="contained" style={{ backgroundColor: "#703578", color: "white", paddingLeft: 30, paddingRight: 30 }} onClick={() => {
                                setshowModal(true);
                            }}>Add Video</Button>
                        </div>
                    </div>
                    <div className=' px-5 mt-6'>
                        {loader ? <div className=' grid place-items-center'> <CircularProgress style={{ color: "#703578" }} size={40} /></div> :
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
                                            all_video.map((video: Video) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell
                                                            style={{
                                                                fontFamily: "'Poppins', sans-serif",
                                                                paddingLeft: 21,
                                                            }}
                                                        >
                                                            {video.title}
                                                        </TableCell>
                                                        <TableCell
                                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                                        >
                                                            {video.description}
                                                        </TableCell>
                                                        <TableCell
                                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                                        >
                                                            <div>
                                                                <IconButton onClick={() => openEditModal(video)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                                    </svg>

                                                                </IconButton>
                                                                <IconButton onClick={() => {
                                                                    Modal.warning({
                                                                        title: "Are you sure you wan to delete this video?",
                                                                        okText: "Yes",
                                                                        centered: true,
                                                                        closable: true,
                                                                        onOk: () => {
                                                                            axios.delete(`${BASEURL}/video/${video._id}`).then((res) => {
                                                                                setTriggerRefresh(Math.random());

                                                                            }).catch((err) => {
                                                                                console.log(err);
                                                                            });
                                                                        }
                                                                    })
                                                                }}>
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
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;