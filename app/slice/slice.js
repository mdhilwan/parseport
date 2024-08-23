import { createSlice, current } from '@reduxjs/toolkit'
import { State } from '../enums/state'

const defaultMrzStateDropZoneClass = 'bg-white'

export const slice = createSlice({
  name: 'slice',
  initialState: {
    scanned: false,
    parsed: [],
    guid: '',
    disconnected: true,
    qrcodeSrc: 'loading.svg',
    scannedData: [],
    showQrCodeModal: false,
    scanState: State.IDLE,
    targetScan: 0,
    mrzStateDropZoneClass: defaultMrzStateDropZoneClass,
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
  },
})

export const {
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
  setTargetScan
} = slice.actions

export default slice.reducer
