import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import { AuthHeader } from '../Components/AuthHeader';
import axios from 'axios';
import { BASEURL, FILEPATH } from '../Connections/BASEURLS';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import { Button } from '@mui/material';


interface video {
    title: string,
    description: string,
    videopath: string

}

const Home: React.FC = () => {
    const user = useSelector(selectUser);
    const [all_video, setall_video] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}/video/all_video`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        }).then((response) => {
            const data = response.data.videos;
            setall_video(data);
        }).catch((err) => {
            console.log(err);

        })
    }, [])

    return (
        <div className=' bg-[#FAF7F6] h-screen'>
            <AuthHeader />
            <div>
                {
                    all_video.map((list: video) => {
                        return (
                            <div className=' grid place-items-center h-[75vh]'>
                                <div className=' h-[400px] w-[700px]  bg-white'>
                                    <video
                                        autoPlay
                                        className=" w-full rounded-none "
                                        controls
                                    >
                                        <source
                                            src={`${FILEPATH}${list.videopath}`}
                                            type="video/mp4" />

                                    </video>
                                    <div className=' px-2 bg-white shadow-sm py-3 lg:rounded-[5px]'>
                                        <h1 className=' font-semibold text-xl'>{list.title}</h1>
                                        <h1>{list.description}</h1>
                                    </div>
                                    <div className=' grid place-items-center'>
                                        <div className=' flex items-center space-x-4 mt-3'>
                                            <button className='  border border-[#703578] bg-white px-4 py-2 rouded-[5px] rounded-[5px] text-[#703578]'>Previous</button>
                                            <button className=' bg-[#703578] px-8 text-white py-2 rounded-[5px]'>Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default Home;