import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('stringify') ? JSON.parse(localStorage.getItem('stringify')) : null,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state,action) => {
      state.userInfo = action.payload;
    }
  },
})
export const { userLogin } = counterSlice.actions

export default counterSlice.reducer