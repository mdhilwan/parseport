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
    showImportExcelModal: false,
    scanState: {
      success: 0,
      scanning: 0,
      error: 0,
      length: 0,
      state: State.IDLE
    },
    mrzStateDropZoneClass: defaultMrzStateDropZoneClass,
    excelImportData: [],
    excelFile: ''
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
    setQrcodeSrc: (state, action) => {
      state.qrcodeSrc = action.payload
    },
    setScannedData: (state, action) => {
      state.scannedData = action.payload
    },
    addScannedData: (state, action) => {
      state.scannedData = [...current(state.scannedData), ...[action.payload]]
    },
    setShowQrCodeModal: (state, action) => {
      state.showQrCodeModal = action.payload
    },
    setShowImportExcelModal: (state, action) => {
      state.showImportExcelModal = action.payload
    },
    setScanState: (state, action) => {
      state.scanState = action.payload
    },
    setMrzStateDropZoneClass: (state, action) => {
      state.mrzStateDropZoneClass = action.payload
    },
    setExcelImportData: (state, action) => {
      state.excelImportData = action.payload
    },
    setExcelFile: (state, action) => {
      state.excelFile = action.payload
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
  addScannedData,
  setShowQrCodeModal,
  setShowImportExcelModal,
  setScanState,
  setNewValue,
  setMrzStateDropZoneClass,
  setExcelImportData,
  setExcelFile
} = slice.actions

export default slice.reducer
