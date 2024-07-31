import { createSlice } from '@reduxjs/toolkit';

const formVisibilitySlice = createSlice({
  name: 'formVisibility',
  initialState: { isFormVisible: false },
  reducers: {
    showForm: (state) => {
      state.isFormVisible = true;
    },
    hideForm: (state) => {
      state.isFormVisible = false;
    },
  },
});

export const { showForm, hideForm } = formVisibilitySlice.actions;
export default formVisibilitySlice.reducer;
