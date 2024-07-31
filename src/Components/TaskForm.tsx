import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImCancelCircle } from "react-icons/im";
import { PiArrowsOutSimple } from "react-icons/pi";
import { CiShare2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { ImSun } from "react-icons/im";
import { PiWarningDiamondLight } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addTask } from "@/redux/slices/taskSlice";
import { useDispatch } from "react-redux";

interface TaskFormProps {
  onClose: () => void;
  status?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, status }) => {
  const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.user);

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: status || '',
    priority: '',
    deadline: '',
    user: "",
  });

  useEffect(() => {
    if (status) {
      setTaskData(prev => ({ ...prev, status }));
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (user.id) {
      const updatedTaskData = { ...taskData, user: user.id };
      setTaskData(updatedTaskData);
      setError(null);
  
      try {
          const response = await fetch("https://trello-backend-node.onrender.com/api/tasks", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTaskData),
              credentials: "include" 
          });
  
  
          if (!response.ok) {
              const errorText = await response.text();
              setError(errorText);
              return;
          }
  
          const data = await response.json();
          dispatch(addTask(data));
          console.log(data);
      } catch (err) {
          setError("An error occurred during submission!");
      }
  
      onClose(); 
    }

};
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-4 z-50"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <ImCancelCircle className="text-gray-500" />
          <PiArrowsOutSimple className="text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm bg-gray-200 text-gray-500 px-2 p-1 rounded-md flex items-center gap-1">Share <CiShare2 /> </button>
          <button className="text-sm bg-gray-200 text-gray-500 px-2 p-1 rounded-md flex items-center gap-1">Favourite <CiStar /></button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex">
          <input
            placeholder="Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full p-2 text-4xl"
            type="text"
            required
          />
        </div>
        <div className="mb-4 flex items-center gap-4">
          <ImSun className="text-gray-500 text-lg " />
          <span className="text-sm text-gray-500">Status</span>
          <input
            placeholder="Not Selected"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full p-2 text-sm"
            type="text"
            required
          />
        </div>
        <div className="mb-4 flex items-center gap-4">
          <PiWarningDiamondLight className="text-gray-500 text-lg " />
          <span className="text-sm text-gray-500">Priority</span>
          <input
            placeholder="Not Selected"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full p-2 text-sm"
            type="text"
            required
          />
        </div>
        <div className="mb-4 flex items-center gap-4">
          <CiCalendar className="text-gray-500 text-lg " />
          <span className="text-sm text-gray-500">Deadline</span>
          <input
            placeholder="Not Selected"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            className="w-full p-2 text-sm"
            type="text"
            required
          />
        </div>
        <div className="mb-4 flex items-center gap-4">
          <GoPencil className="text-gray-500 text-lg " />
          <span className="text-sm text-gray-500">Description</span>
          <input
            placeholder="Not Selected"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full p-2 text-sm"
            type="text"
            required
          />
        </div>
        <div className="flex items-center gap-5 my-2">
          <FiPlus />
          <span>Add custom Property</span>
        </div>
        <hr />
        <div className="flex items-center gap-5 mt-4">
          <button type="submit" className="text-white p-2 rounded bg-gradient-to-b from-[#4C38C2] to-[#2F2188]">
            Add Task
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;
