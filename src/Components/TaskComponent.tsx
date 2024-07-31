import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import Task from "./Task";
import NewTask from "./NewTask";
import TaskForm from "./TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { hideForm } from "@/redux/slices/formVisibilitySlice";
import { setTasks } from "@/redux/slices/taskSlice";
import { showForm } from "@/redux/slices/formVisibilitySlice";
import { setStatus } from "@/redux/slices/currentStatus";

const status = [
  "To Do",
  "In Progress",
  "Under Review",
  "Finished"
];

const TaskComponent: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user);
  const isFormVisible = useSelector((state: RootState) => state.formVisibility.isFormVisible);
  
  const currentStatus = useSelector((state: RootState) => state.currentStatus.status);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`https://trello-backend-node.onrender.com/api/tasks?userId=${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        
        const data = await response.json();
        console.log(data)
        dispatch(setTasks(data));
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchTasks();
  }, [dispatch]);
  
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  
  const handleNewTaskClick = (status: string) => {
    dispatch(setStatus(status));
    dispatch(showForm()); // Show the form
  };
  return (
    <div className="relative flex gap-4 bg-white rounded-lg p-4">
      {status.map((element) => (
        <div key={element} className="flex flex-col w-1/4 bg-gray-100 p-2 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{element}</span>
            <BiMenuAltRight className="text-2xl text-gray-500 scale-y-[-1] scale-x-[-1]" />
          </div>
          <div className="flex flex-col gap-2">
            {tasks
              ? tasks.filter(task => task.status === element).map(task => (
                  <Task key={task._id} task={task} />
                ))
              : null}
            <NewTask onClick={() => handleNewTaskClick(element)} />
          </div>
        </div>
      ))}
      {isFormVisible && <TaskForm onClose={() => dispatch(hideForm())} status={currentStatus} />}
    </div>
  );
};

export default TaskComponent;
