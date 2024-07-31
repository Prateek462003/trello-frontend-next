import React from "react";
import { LuBellDot } from "react-icons/lu";
import { ImSun } from "react-icons/im";
import { IoHomeOutline } from "react-icons/io5";
import { LuGanttChartSquare } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { AiOutlineTeam } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { TfiDownload } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "@/redux/slices/formVisibilitySlice";
import { RootState } from "@/redux/store";
import { clearStatus } from "@/redux/slices/currentStatus";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/slices/userSlice";

const ProfileSection: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const currentStatus = useSelector((state: RootState) => state.currentStatus.status);
    const router = useRouter() 

    const handleCreateTaskClick = () => {
        dispatch(clearStatus());
        dispatch(showForm());
    };

    const handleLogout = async () => {
    
        try {
            const response = await fetch("https://trello-backend-node.onrender.com/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
            });
    
            if (!response.ok) {
                throw new Error("Logout failed");
            }
    
            dispatch(clearUser());
    

            router.push("/login"); 
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    return (
        <div className="flex flex-col h-full justify-between ">
            <div className="flex-col">
                <div className="flex justify-start items-center">
                    <img src="/assets/profileImage.png" className="w-9 h-9 rounded-lg mr-2" alt="" />
                    <h2 className="text-xl font-bold">{user.username}</h2>
                </div>
                <div className="flex text-2xl gap-2 my-3 items-center justify-between">
                    <div className="flex gap-4 text-gray-500">
                        <LuBellDot />
                        <ImSun />
                    </div>
                    <button className="text-lg bg-gray-200 text-gray-500 p-1 px-2 rounded-lg" onClick={handleLogout}>Logout</button>
                </div>
                <div className="flex-col flex gap-2 text-2xl text-gray-500">
                    <div className="flex gap-4 bg-gray-200 rounded-lg p-1">
                        <IoHomeOutline />
                        <span className="text-lg">Home</span>
                    </div>
                    <div className="flex gap-4 p-1">
                        <LuGanttChartSquare />
                        <span className="text-lg">Boards</span>
                    </div>
                    <div className="flex gap-4 p-1">
                        <CiSettings />
                        <span className="text-lg">Settings</span>
                    </div>
                    <div className="flex gap-4 p-1">
                        <AiOutlineTeam />
                        <span className="text-lg">Teams</span>
                    </div>
                    <div className="flex gap-4 p-1">
                        <FaChartLine />
                        <span className="text-lg">Charts</span>
                    </div>
                    <div className="flex gap-4 p-1" onClick={handleCreateTaskClick}>
                        <button className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-gray-100 rounded-md p-2 text-xl w-full">Create new Task <FaCirclePlus className="text-white" /> </button>
                    </div>
                </div>
            </div>
            <div className="flex">
                <button className="flex items-center w-full justify-center gap-2 bg-gray-200 text-gray-500 rounded-md p-2 text-xl">
                    <TfiDownload />
                    <div className="flex flex-col ">
                        <span>Download the app</span>
                        <span className="text-xs">Get the Full Experience</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProfileSection;
