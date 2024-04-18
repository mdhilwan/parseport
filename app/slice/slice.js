import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'slice',
  initialState: {
    scanned: false,
    scans: [],
  },
  reducers: {
    setScanned: (state, action) => {
      state.scanned = action.payload
    },
    addNewScan: (state, action) => {
      console.log('addNewScan', action.payload)
      state.scans = [...state.scans, action.payload]
    },
  },
})

export const { addNewScan, setScanned } = slice.actions

export default slice.reducer
