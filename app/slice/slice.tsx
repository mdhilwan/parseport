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

export type CardFace = 'front' | 'back'

interface IinitialState {
  disconnected: boolean
  excelFile: string
  excelFileName: string
  excelImportData: {
    table?: any
    obj?: any
  }
  guid: string
  highlightExpiredPassports: boolean
  maskPassportDetails: boolean
  showAddPassport: boolean
  mrzStateDropZoneClass: string
  parsed: any[]
  qrcodeSrc: string
  scanState: IScanState
  scanned: boolean
  scannedData: any[]
  showBagTagModal: {
    show: boolean
    rowKey: number | undefined
    elementsPos: {
      name: {
        display: CardFace[]
        front: {
          x: string
          y: string
        }
        back: {
          x: string
          y: string
        }
      }
    }
    design: {
      front: string
      back: string
      dimension: {
        h: number
        w: number
      }
    }
  }
  showImportExcelModal: boolean
  showNameFileModal: boolean
  showQrCodeModal: boolean
  userIsDemo: boolean
}

const initialState: IinitialState = {
  disconnected: true,
  excelFile: '',
  excelFileName: 'untitled',
  excelImportData: {},
  guid: '',
  highlightExpiredPassports: false,
  maskPassportDetails: false,
  showAddPassport: false,
  mrzStateDropZoneClass: defaultMrzStateDropZoneClass,
  parsed: [],
  qrcodeSrc: 'loading.svg',
  scanState: {
    success: 0,
    scanning: 0,
    error: 0,
    length: 0,
    state: State.IDLE,
  },
  scanned: false,
  scannedData: [],
  showBagTagModal: {
    show: false,
    rowKey: undefined,
    elementsPos: {
      name: {
        front: {
          x: '0px',
          y: '0px',
        },
        back: {
          x: '0px',
          y: '0px',
        },
        display: ['front'],
      },
    },
    design: {
      front: '',
      back: '',
      dimension: {
        h: 0,
        w: 0,
      },
    },
  },
  showImportExcelModal: false,
  showNameFileModal: false,
  showQrCodeModal: false,
  userIsDemo: false,
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
    setShowAddPassport: (state, action) => {
      state.showAddPassport = action.payload
    },
    setExcelFile: (state, action) => {
      state.excelFile = action.payload
    },
    setExcelFileName: (state, action) => {
      state.excelFileName = action.payload
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
    setShowBagTagModal: (state, action) => {
      const { show, rowKey } = action.payload
      state.showBagTagModal.show = show
      state.showBagTagModal.rowKey = rowKey
    },
    setShowImportExcelModal: (state, action) => {
      state.showImportExcelModal = action.payload
    },
    setShowNameFileModal: (state, action) => {
      state.showNameFileModal = action.payload
    },
    setShowQrCodeModal: (state, action) => {
      state.showQrCodeModal = action.payload
    },
    setBagTagNamePos: (state, action) => {
      state.showBagTagModal.elementsPos.name = action.payload
    },
    setBagTagDesign: (state, action) => {
      state.showBagTagModal.design = action.payload
    },
    setUserIsDemo: (state) => {
      state.userIsDemo = true
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
  setShowAddPassport,
  addScannedData,
  setShowQrCodeModal,
  setShowImportExcelModal,
  setScanState,
  setNewValue,
  setMrzStateDropZoneClass,
  toggleMaskPassportDetails,
  toggleHighlightExpiredPassports,
  setShowBagTagModal,
  setBagTagNamePos,
  setBagTagDesign,
  revertMrzStateDropZoneClass,
  setExcelImportData,
  setExcelFile,
  setShowNameFileModal,
  setUserIsDemo,
  setExcelFileName,
} = slice.actions

export default slice.reducer
