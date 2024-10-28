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
  showNameFileModal: boolean
  showBagTagModal: {
    show: boolean
    rowKey: number | undefined
  }
  userIsDemo: boolean
  showImportExcelModal: boolean
  highlightExpiredPassports: boolean
  maskPassportDetails: boolean
  scanState: IScanState
  mrzStateDropZoneClass: string
  excelImportData: {
    table?: any
    obj?: any
  }
  excelFileName: string
  excelFile: string
}

const initialState: IinitialState = {
  scanned: false,
  parsed: [],
  guid: '',
  disconnected: true,
  qrcodeSrc: 'loading.svg',
  scannedData: [],
  userIsDemo: false,
  showQrCodeModal: false,
  showImportExcelModal: false,
  highlightExpiredPassports: false,
  maskPassportDetails: false,
  scanState: {
    success: 0,
    scanning: 0,
    error: 0,
    length: 0,
    state: State.IDLE,
  },
  mrzStateDropZoneClass: defaultMrzStateDropZoneClass,
  excelImportData: {},
  showNameFileModal: false,
  showBagTagModal: {
    show: false,
    rowKey: undefined,
  },
  excelFileName: 'untitled',
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
    setShowNameFileModal: (state, action) => {
      state.showNameFileModal = action.payload
    },
    setShowBagTagModal: (state, action) => {
      const { show, rowKey } = action.payload
      state.showBagTagModal.show = show
      state.showBagTagModal.rowKey = rowKey
    },
    setUserIsDemo: (state) => {
      state.userIsDemo = true
    },
    setExcelFileName: (state, action) => {
      state.excelFileName = action.payload
    },
    toggleHighlightExpiredPassports: (state) => {
      state.highlightExpiredPassports = !state.highlightExpiredPassports
    },
    toggleMaskPassportDetails: (state) => {
      state.maskPassportDetails = !state.maskPassportDetails
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
  toggleMaskPassportDetails,
  toggleHighlightExpiredPassports,
  setShowBagTagModal,
  revertMrzStateDropZoneClass,
  setExcelImportData,
  setExcelFile,
  setShowNameFileModal,
  setUserIsDemo,
  setExcelFileName,
} = slice.actions

export default slice.reducer
