import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'slice',
  initialState: {
    scans: [],
  },
  reducers: {
    addNewScan: (state, action) => {
      state.scans.push(action.payload)
    },
  },
})

export const { addNewScan } = slice.actions

export default slice.reducer
