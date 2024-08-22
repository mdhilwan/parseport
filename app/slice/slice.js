import { createSlice, current } from '@reduxjs/toolkit'
import { State } from '../enums/state'

const defaultMrzStateDropZoneClass =
  'mt-10 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-50'

const defaultMrzDropZoneClass =
  'flex justify-center w-full h-60 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'

export const slice = createSlice({
  name: 'slice',
  initialState: {
    scanned: false,
    scans: [],
    parsed: [],
    guid: '',
    disconnected: true,
    qrcodeSrc: 'loading.svg',
    scannedData: [],
    showQrCodeModal: false,
    scanState: State.IDLE,
    targetScan: 0,
    mrzStateDropZoneClass: defaultMrzStateDropZoneClass,
    mrzDropZoneClass: defaultMrzDropZoneClass,
  },
  reducers: {
    setScanned: (state, action) => {
      state.scanned = action.payload
    },
    setParsed: (state, action) => {
      state.parsed = action.payload
    },
    setGuid: (state, action) => {
      state.guid = action.payload
    },
    addNewScan: (state, action) => {
      state.scans = [...state.scans, action.payload]
    },
    setNewValue: (state, action) => {
      const { colKey, rowKey, newValue } = action.payload
      const newScannedDate = JSON.parse(
        JSON.stringify([...current(state.scannedData)])
      )
      newScannedDate[rowKey][colKey] = newValue
      state.scannedData = newScannedDate
    },
    setDisconnected: (state, action) => {
      state.disconnected = action.payload
    },
    setTargetScan: (state, action) => {
      state.targetScan = action.payload
    },
    setQrcodeSrc: (state, action) => {
      state.qrcodeSrc = action.payload
    },
    setScannedData: (state, action) => {
      state.scannedData = action.payload
    },
    setShowQrCodeModal: (state, action) => {
      state.showQrCodeModal = action.payload
    },
    setScanState: (state, action) => {
      state.scanState = action.payload
    },
    setMrzStateDropZoneClass: (state, action) => {
      state.mrzStateDropZoneClass = action.payload
    },
    setMrzDropZoneClass: (state, action) => {
      state.mrzDropZoneClass = action.payload
    },
  },
})

export const {
  addNewScan,
  setScanned,
  setParsed,
  setGuid,
  setDisconnected,
  setQrcodeSrc,
  setScannedData,
  setShowQrCodeModal,
  setScanState,
  setNewValue,
  setMrzStateDropZoneClass,
  setMrzDropZoneClass,
  setTargetScan
} = slice.actions

export default slice.reducer
