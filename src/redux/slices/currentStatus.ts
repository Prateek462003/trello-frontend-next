import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentStatusState {
  status: string | undefined;
}

const initialState: CurrentStatusState = {
  status: undefined,
};

const currentStatusSlice = createSlice({
  name: "currentStatus",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string | undefined>) => {
      state.status = action.payload;
    },
    clearStatus: (state) => {
      state.status = "";
    },
  },
});

export const { setStatus, clearStatus } = currentStatusSlice.actions;
export default currentStatusSlice.reducer;
