import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar: React.FC = () => {

    const navigate = useNavigate();
    const loc = useLocation();

    const handleClickRoute = (route: any) => {
        navigate(route);
    };

    const isActive = (route: any) => {
        return loc.pathname === route;
    };

    return (
        <div className=' bg-[#703578] h-screen'>
            <List>
                <ListItemButton
                    selected={isActive("/dashboard")}
                    onClick={() => handleClickRoute("/dashboard")}
                    style={{
                        margin: 8,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 9,
                        backgroundColor: isActive("/dashboard") ? "#EB0A8E" : "initial",
                    }}
                >
                    <ListItemIcon style={{ paddingLeft: "10px" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            color={isActive("/dashboard") ? "white" : "#8B91A1"}
                            // color="#8B91A1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                color="#8B91A1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </ListItemIcon>
                    <ListItemText
                        className={
                            loc.pathname === "/dashboard"
                                ? " text-white font-bold"
                                : "text-[14px] text-[#9299A6] font-bold"
                        }
                        // className=" text-[14px] text-[#9299A6]"
                        // style={{ fontWeight: "bold" }}
                        primary="Dashboard"
                    />
                </ListItemButton>
            </List>
        </div>
    )
}

export default AdminSidebar;