import React from "react";
import { GrCircleQuestion } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { CiCalendar, CiFilter, CiShare2 } from "react-icons/ci";
import { WiStars } from "react-icons/wi";
import { FaCirclePlus } from "react-icons/fa6";
import TaskComponent from "./TaskComponent";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "@/redux/slices/formVisibilitySlice";
import { RootState } from "@/redux/store";
import { clearStatus,  } from "@/redux/slices/currentStatus";

const TaskSection: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const currentStatus = useSelector((state: RootState) => state.currentStatus.status);
    
    const handleCreateTaskClick = () => {
        dispatch(clearStatus()); 
        dispatch(showForm());
    };

    return (
        <div>
            {/* Good Morning Text */}
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">
                    Good Morning, {user.username}!
                </h1>
                <span className="text-sm flex gap-2 items-center ">Help & Feedback <GrCircleQuestion /> </span>
            </div>

            {/* Image Cards */}
            <div className="flex my-3 gap-4">
                {/* Cards with information */}
                <div className="bg-white flex p-4 gap-3 rounded-lg">
                    <img src="/assets/introducingTags.png" className="h-16 w-20" alt="" />
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Introducing Tags</span>
                        <span className="text-gray-400 text-sm">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</span>
                    </div>
                </div>
                <div className="bg-white flex p-4 gap-3 rounded-lg">
                    <img src="/assets/shareNotes.png" className="h-16 w-20" alt="" />
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Share Notes Instantly</span>
                        <span className="text-gray-400 text-sm">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</span>
                    </div>
                </div>
                <div className="bg-white flex p-4 gap-3 rounded-lg">
                    <img src="/assets/accessAnywhere.png" className="h-16 w-20" alt="" />
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Access Anywhere</span>
                        <span className="text-gray-400 text-sm">Sync your notes across all devices. Stay productive whether you are on your phone, tablet, or computer.</span>
                    </div>
                </div>
            </div>

            {/* SearchBar Navigation */}
            <div className="flex justify-between my-3">
                <div className="flex items-center">
                    <input type="text" className="p-1 rounded-lg" placeholder="Search" />
                    <FaSearch className="-translate-x-5 text-gray-400" />
                </div>

                <div className="flex items-center gap-6 text-gray-500">
                    <div className="flex items-center gap-1">
                        <span className="text-sm">Calendar View</span>
                        <CiCalendar className="text-2xl" />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm">Automation</span>
                        <WiStars className="text-2xl" />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm">Filter</span>
                        <CiFilter className="text-2xl" />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm">Share</span>
                        <CiShare2 className="text-2xl" />
                    </div>
                    <button onClick={handleCreateTaskClick} className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#4C38C2] to-[#2F2188] text-gray-100 rounded-md p-2 text-sm">
                        Create new <FaCirclePlus className="text-white" />
                    </button>
                </div>
            </div>

            {/* Task Component */}
            <TaskComponent />
        </div>
    );
};

export default TaskSection;
