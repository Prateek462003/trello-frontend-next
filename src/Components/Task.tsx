import { removeTask } from "@/redux/slices/taskSlice";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

interface TaskProps {
  task: {
    _id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    deadline: string;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id: string) => {
    console.log(id, "requested remove task id is")
    try {
      const response = await fetch(`https://trello-backend-node.onrender.com/api/tasks?taskId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      dispatch(removeTask(id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-50 border-2 border-gray-200 rounded-lg">
      <span className="text-gray-500 font-semibold">{task.title}</span>
      <span className="text-gray-400">{task.description}</span>
      <div className={`text-gray-200 rounded-lg text-sm text-center w-20 ${
        task.priority === "Urgent" ? "bg-red-600" :
        task.priority === "Medium" ? "bg-orange-600" :
        task.priority === "Low" ? "bg-green-600" : "bg-gray-600"
      }`}>
        {task.priority}
      </div>
      <div className="flex gap-2">
        <CiClock2 className="text-2xl" />
        <span className="text-gray-600 text-sm">{task.deadline}</span>
      </div>
      <span className="text-gray-400">Few Seconds ago</span>
      <RiDeleteBin6Line onClick={() => handleDelete(task._id)} className="text-xl text-gray-500 cursor-pointer"/>
    </div>
  );
};

export default Task;
