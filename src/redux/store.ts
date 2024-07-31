import { configureStore } from "@reduxjs/toolkit";
import formReducer from "@/redux/slices/formVisibilitySlice";
import userReducer from "@/redux/slices/userSlice"
import taskReducer from "@/redux/slices/taskSlice"
import currentStatusReducer from "@/redux/slices/currentStatus"


export const store = configureStore({
  reducer: {
    user: userReducer,
    formVisibility: formReducer,
    tasks : taskReducer,
    currentStatus: currentStatusReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;