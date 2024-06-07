import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import { AuthHeader } from '../Components/AuthHeader';
import axios from 'axios';
import { BASEURL, FILEPATH } from '../Connections/BASEURLS';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import { Button, IconButton, Toolbar } from '@mui/material';


interface video {
    title: string,
    description: string,
    videopath: string

}

interface Pagination {
    next?: {
        page: number;
        limit: number;
    };
    prev?: {
        page: number;
        limit: number;
    };
}


interface ApiResponse {
    total: number;
    videos: video[];
    pagination: Pagination;
}

const Home: React.FC = () => {
    const user = useSelector(selectUser);
    const [all_video, setall_video] = useState<video[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [pagination, setPagination] = useState<Pagination>({});


    useEffect(() => {
        axios.get(`${BASEURL}/video/all_video?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        }).then((response) => {
            const data = response.data.videos;
            setPagination(data.pagination);
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
                    all_video.map((list) => {
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
                                    <div className=' px-2 bg-white shadow-sm py-1 lg:rounded-[5px] flex justify-between items-center'>
                                        <div>
                                            <h1 className=' font-semibold text-xl'>{list.title}</h1>
                                            <h1>{list.description}</h1>
                                        </div>
                                        <div>
                                            <Toolbar title="Share">
                                                <IconButton>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                    </svg>
                                                </IconButton>
                                            </Toolbar>
                                        </div>
                                    </div>
                                    <div className=' grid place-items-center'>
                                        <div>
                                            <div className=' flex items-center space-x-4 mt-3'>
                                                {pagination.prev && (
                                                    <button onClick={() => setPage(pagination.prev!.page)} className='  border border-[#703578] bg-white px-4 py-2 rouded-[5px] rounded-[5px] text-[#703578]'>Previous</button>
                                                )}
                                                {pagination.next && (
                                                    <button onClick={() => setPage(pagination.next!.page)} className=' bg-[#703578] px-8 text-white py-2 rounded-[5px]'>Next</button>
                                                )}
                                            </div>
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