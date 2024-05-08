import { useSelector } from 'react-redux'
import { State } from '../enums/state'
import Mrz from '../mrz'
import MrzInputHandler from '../mrz/MrzInutHandler'

const StateMrzInput = ({ dpSetParsed, dpSetScanState, bg }) => {
  const { scanState } = useSelector((state) => state.mrzStore)

  const dragOverHandler = (ev) => ev.preventDefault()
  const dropHandler = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    MrzInputHandler({
      dpSetParsed,
      dpSetScanState,
      $event: [...evt.dataTransfer.files],
    })
  }

  return (
    <>
      <div
        className={bg}
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
              Drag and drop here to scan.
            </div>
            <label className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-200 hover:cursor-pointer">
                Or browse
              </span>
              <Mrz dpSetParsed={dpSetParsed} dpSetScanState={dpSetScanState} />
            </label>
          </>
        )}
      </div>
    </>
  )
}

export default StateMrzInput
