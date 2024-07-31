import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string; // "To Do", "In Progress", "Under Review", "Finished"
  priority: string;
  deadline: string;
  user:string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<string>) {
        console.log("Removing task with id:", action.payload); 
        state.tasks = state.tasks.filter(task => {
          const isMatch = task._id !== action.payload;
          if (!isMatch) {
            console.log("Task removed:", task);
          }
          return isMatch;
        });
    },
  },
});

export const { setTasks, addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
