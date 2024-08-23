import { useDispatch, useSelector } from 'react-redux'
import { State } from '../enums/state'
import Mrz from '../mrz'
import MrzInputHandler from '../mrz/MrzInutHandler'
import { setShowQrCodeModal, setTargetScan } from '@/app/slice/slice'

const StateMrzInput = ({ dpSetParsed, dpSetScanState }) => {
  const { scanState, scannedData, targetScan, mrzStateDropZoneClass } = useSelector((state) => state.mrzStore)
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
      className={`mx-auto flex items-center w-3/5 p-3 rounded-lg text-gray-700 ${mrzStateDropZoneClass}`}
      role="alert"
      onDragOver={(evt) => dragOverHandler(evt)}
      onDrop={(evt) => dropHandler(evt)}
    >
      {scanState === State.SCANNING ? (
        <>
          <div className="text-sm font-normal">Scanning...</div>
        </>
      ) : (
        <>
          <div className="text-sm font-normal">
            Drag & drop or
            <label className="ms-auto space-x-2">
              <span className="text-sm font-medium text-blue-600 p-1 hover:bg-blue-100 rounded-lg hover:cursor-pointer whitespace-nowrap">
                Or browse
              </span>
              <Mrz dpSetParsed={dpSetParsed} dpSetScanState={dpSetScanState} />
            </label>{' '}
            for a passport photo (jpg, png). Or link your phone by scanning the
            <span className="ms-auto space-x-2 ">
              <a
                className="text-blue-600 p-1 rounded-lg hover:cursor-pointer hover:bg-blue-100"
                onClick={() => dispatch(setShowQrCodeModal(true))}
              >
                QR Code here.
              </a>
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default StateMrzInput
