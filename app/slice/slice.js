import { createSlice } from '@reduxjs/toolkit'
import { State } from '../enums/state'

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
    setDisconnected: (state, action) => {
      state.disconnected = action.payload
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
} = slice.actions

export default slice.reducer
