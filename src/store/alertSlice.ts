import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    isShow: false,
    isSuccess: false,
  },
  reducers: {
    setIsShow(state, action) {
      state.isShow = action.payload
    },

    setIsSuccess(state, action) {
      state.isSuccess = action.payload;
    }
  }
});


export const { setIsShow, setIsSuccess } = alertSlice.actions;
export default alertSlice.reducer;