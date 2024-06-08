import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { AuthHeader } from '../Components/AuthHeader';
import axios from 'axios';
import { BASEURL, FILEPATH } from '../Connections/BASEURLS';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';
import { Button, CircularProgress, IconButton, Toolbar } from '@mui/material';

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
    const [limit] = useState<number>(1);
    const [pagination, setPagination] = useState<Pagination>({});
    const [Loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        setLoader(true);
        axios.get(`${BASEURL}/video/all_video?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        }).then((response) => {
            const data: ApiResponse = response.data;
            setPagination(data.pagination);
            setall_video(data.videos);
            setLoader(false);
        }).catch((err) => {
            console.log(err);
        });
    }, [page, limit, user?.token]);


    const handleShare = (video: video) => {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: video.description,
                url: `${FILEPATH}${video.videopath}`
            }).then(() => {
                console.log('Successful share');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    return (
        <div className='bg-[#FAF7F6] h-screen'>
            <AuthHeader />
            {Loader ? <div className=' grid place-items-center pt-16'>
                <CircularProgress size={18} style={{ color: "#703578" }} />
            </div> :
                <div>
                    {
                        all_video.map((list) => {
                            return (
                                <div className='grid place-items-center h-[72vh]' key={list.videopath}>
                                    <div className='h-[400px] w-[700px] bg-white'>
                                        <video
                                            autoPlay
                                            className="w-full rounded-none"
                                            controls
                                        >
                                            <source
                                                src={`${FILEPATH}${list.videopath}`}
                                                type="video/mp4" />
                                        </video>
                                        <div className='px-2 bg-white shadow-sm py-1 lg:rounded-[5px] flex justify-between items-center'>
                                            <div>
                                                <h1 className='font-semibold text-xl'>{list.title}</h1>
                                                <h1>{list.description}</h1>
                                            </div>
                                            <div>
                                                <Toolbar title="Share">
                                                    <IconButton onClick={() => handleShare(list)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                        </svg>
                                                    </IconButton>
                                                </Toolbar>
                                            </div>
                                        </div>
                                        <div className='grid place-items-center'>
                                            <div>
                                                <div className='flex items-center space-x-4 mt-5'>
                                                    {pagination.prev && (
                                                        <button onClick={() => setPage(pagination.prev?.page ?? 1)} className='border-2 border-[#703578] bg-white px-4 py-3 rounded-[5px] text-[#703578] flex items-center space-x-2'>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                                                            </svg>
                                                            <p className='text-[#703578]'>Previous</p>

                                                        </button>
                                                    )}
                                                    {pagination.next && (
                                                        <button onClick={() => setPage(pagination.next?.page ?? 1)} className='bg-[#703578] px-8 text-white py-3 rounded-[5px]  flex items-center space-x-2 border-2 border-[#703578]'>
                                                            <p className='text-[white]'>Next</p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                                                            </svg>

                                                        </button>
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
            }
        </div>

    );
}

export default Home;
