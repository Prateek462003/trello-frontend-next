"use client"
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { showForm } from "@/redux/slices/formVisibilitySlice";

interface NewTaskProps {
    onClick: () => void; 
  }
const NewTask : React.FC<NewTaskProps> = ({ onClick }) =>{
    

    return(
        <div onClick={onClick}>
            <button className="flex items-center justify-between gap-2 bg-gray-800 text-white rounded-md p-2 w-full text-sm">Add New <FaPlus className="text-white"  /> </button>
        </div>
    )
}

export default NewTask