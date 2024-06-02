import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import { AuthHeader } from '../Components/AuthHeader';
import axios from 'axios';
import { BASEURL, FILEPATH } from '../Connections/BASEURLS';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slices/UserSlice';

const Home: React.FC = () => {
    const user = useSelector(selectUser);
    const [all_video, setall_video] = useState([]);
    useEffect(() => {
        axios.get(`${BASEURL}`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        }).then((response) => {
            const data = response.data;
            setall_video(data);
        }).catch((err) => {
            console.log(err);

        })
    }, [])

    return (
        <div>
            <AuthHeader />
            <div>
                {
                    all_video.map((list: any) => {
                        return (
                            <div className=''>
                                <video
                                    autoPlay
                                    className=" w-full rounded-none lg:rounded-[5px]"
                                    height={220}
                                    controls
                                >
                                    <source
                                        src={`${FILEPATH}${list.videopath}`}
                                        type="video/mp4" />

                                </video>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default Home;