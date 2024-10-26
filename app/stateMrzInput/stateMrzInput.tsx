import {
  setExcelFile,
  setShowImportExcelModal,
  setShowQrCodeModal,
} from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { DragEvent } from 'react'
import { State } from '../enums/state'
import Mrz from '../mrz'
import MrzInputHandler from '../mrz/MrzInutHandler'

type StateMrzInputType = {
  dpSetParsed: Function
  dpSetScanState: Function
}

const StateMrzInput = (props: StateMrzInputType) => {
  const { dpSetParsed, dpSetScanState } = props
  const {
    scanState,
    scannedData,
    mrzStateDropZoneClass,
    showImportExcelModal,
  } = useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()

  const dragOverHandler = (ev: DragEvent<HTMLDivElement>) => ev.preventDefault()
  const dropHandler = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    if (
      Array.from(evt.dataTransfer.files)
        .map((f) => f.type)
        .every((f) => f.match(/sheet|excel|xls/g))
    ) {
      dispatch(setExcelFile(evt.dataTransfer.files[0]))
      dispatch(setShowImportExcelModal(true))
    } else {
      MrzInputHandler({
        dpSetParsed,
        dpSetScanState,
        $event: [...Array.from(evt.dataTransfer.files)],
      })
    }
  }

  return (
    <div
      className={`w-100 flex items-center ${scannedData.length > 0 ? 'p-5' : 'p-8'} transition-all delay-100 rounded-md text-gray-700 hover:p-14 ${showImportExcelModal ? '' : mrzStateDropZoneClass}`}
      role="alert"
      onDragOver={(evt) => dragOverHandler(evt)}
      onDrop={(evt) => dropHandler(evt)}
    >
      <div className="max-w-lg w-3/5 mx-auto">
        {scanState.state === State.SCANNING ? (
          <>
            <div className="text-xs font-normal">Scanning...</div>
          </>
        ) : (
          <>
            <div className="text-sm text-slate-400 font-normal hover:text-black">
              Drag & drop or
              <label className="ms-auto space-x-2">
                <span className="font-medium text-blue-600 p-1 hover:bg-blue-100 rounded-md hover:cursor-pointer whitespace-nowrap">
                  Or browse
                </span>
                <Mrz
                  dpSetParsed={dpSetParsed}
                  dpSetScanState={dpSetScanState}
                />
              </label>{' '}
              for a passport photo (jpg, png). Or link your phone by scanning
              the
              <a
                className="text-blue-600 p-1 rounded-md hover:cursor-pointer hover:bg-blue-100"
                onClick={() => dispatch(setShowQrCodeModal(true))}
              >
                QR Code here
              </a>
              . You can also
              <a
                className="text-blue-600 p-1 rounded-md hover:cursor-pointer hover:bg-blue-100"
                onClick={() => dispatch(setShowImportExcelModal(true))}
              >
                import an excel sheet here
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StateMrzInput
