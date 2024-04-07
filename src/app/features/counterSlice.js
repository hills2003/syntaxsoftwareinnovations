import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: "",
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updater: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.location = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updater } = counterSlice.actions

export default counterSlice.reducer