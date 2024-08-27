import {
  setShowImportExcelModal,
  setShowQrCodeModal,
  setTargetScan,
} from '@/app/slice/slice'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../enums/state'
import Mrz from '../mrz'
import MrzInputHandler from '../mrz/MrzInutHandler'

const StateMrzInput = ({ dpSetParsed, dpSetScanState }) => {
  const { scanState, targetScan, mrzStateDropZoneClass, showImportExcelModal } =
    useSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  const dragOverHandler = (ev) => ev.preventDefault()
  const dropHandler = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(setTargetScan(targetScan + evt.dataTransfer.files.length))
    MrzInputHandler({
      dpSetParsed,
      dpSetScanState,
      $event: [...evt.dataTransfer.files],
    })
  }

  return (
    <div
      className={`w-100 flex items-center p-5 rounded-md text-gray-700 ${showImportExcelModal ? '' : mrzStateDropZoneClass}`}
      role="alert"
      onDragOver={(evt) => dragOverHandler(evt)}
      onDrop={(evt) => dropHandler(evt)}
    >
      <div className="max-w-lg w-3/5 mx-auto">
        {scanState === State.SCANNING ? (
          <>
            <div className="text-sm font-normal">Scanning...</div>
          </>
        ) : (
          <>
            <div className="text-sm font-normal">
              Drag & drop or
              <label className="ms-auto space-x-2">
                <span className="text-sm font-medium text-blue-600 p-1 hover:bg-blue-100 rounded-md hover:cursor-pointer whitespace-nowrap">
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
