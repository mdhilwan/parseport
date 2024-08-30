import { createSlice, current } from '@reduxjs/toolkit'
import { State } from '../enums/state'

const defaultMrzStateDropZoneClass = 'bg-white'

interface IScanState {
  success: number
  scanning: number
  error: number
  length: number
  state: State
}

interface IinitialState {
  scanned: boolean
  parsed: any[]
  guid: string
  disconnected: boolean
  qrcodeSrc: string
  scannedData: any[]
  showQrCodeModal: boolean
  showImportExcelModal: boolean
  highlightExpiredPassports: boolean
  scanState: IScanState
  mrzStateDropZoneClass: string
  excelImportData: {
    table?: any
    obj?: any
  }
  excelFile: string
}

const initialState: IinitialState = {
  scanned: false,
  parsed: [],
  guid: '',
  disconnected: true,
  qrcodeSrc: 'loading.svg',
  scannedData: [],
  showQrCodeModal: false,
  showImportExcelModal: false,
  highlightExpiredPassports: false,
  scanState: {
    success: 0,
    scanning: 0,
    error: 0,
    length: 0,
    state: State.IDLE,
  },
  mrzStateDropZoneClass: defaultMrzStateDropZoneClass,
  excelImportData: {},
  excelFile: '',
}

export const slice = createSlice({
  initialState: initialState,
  name: 'slice',
  reducers: {
    addScannedData: (state, action) => {
      state.scannedData = [...current(state.scannedData), ...[action.payload]]
    },
    revertMrzStateDropZoneClass: (state) => {
      state.mrzStateDropZoneClass = defaultMrzStateDropZoneClass
    },
    setDisconnected: (state, action) => {
      state.disconnected = action.payload
    },
    setExcelFile: (state, action) => {
      state.excelFile = action.payload
    },
    setExcelImportData: (state, action) => {
      state.excelImportData = action.payload
    },
    setGuid: (state, action) => {
      state.guid = action.payload
    },
    setMrzStateDropZoneClass: (state, action) => {
      state.mrzStateDropZoneClass = action.payload
    },
    setNewValue: (state, action) => {
      const { colKey, rowKey, newValue } = action.payload
      const newScannedDate = JSON.parse(
        JSON.stringify([...current(state.scannedData)])
      )
      newScannedDate[rowKey][colKey] = newValue
      state.scannedData = newScannedDate
    },
    setParsed: (state, action) => {
      state.parsed = action.payload
    },
    setQrcodeSrc: (state, action) => {
      state.qrcodeSrc = action.payload
    },
    setScanState: (state, action) => {
      state.scanState = action.payload
    },
    setScanned: (state, action) => {
      state.scanned = action.payload
    },
    setScannedData: (state, action) => {
      state.scannedData = action.payload
    },
    setShowImportExcelModal: (state, action) => {
      state.showImportExcelModal = action.payload
    },
    setShowQrCodeModal: (state, action) => {
      state.showQrCodeModal = action.payload
    },
    toggleHighlightExpiredPassports: (state) => {
      state.highlightExpiredPassports = !state.highlightExpiredPassports
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
  toggleHighlightExpiredPassports,
  revertMrzStateDropZoneClass,
  setExcelImportData,
  setExcelFile,
} = slice.actions

export default slice.reducer
