import { State } from '@/app/enums/state'
import { setScanState } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

const ScanNotification = () => {
  const { scanState } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  return scanState.state === State.ERROR ? (
    <button
      className={`cursor-pointer ms-4 p-1 bg-red-700 border border-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex`}
      role="alert"
      onClick={() => {
        dispatch(
          setScanState({
            success: 0,
            error: 0,
            length: 0,
            scanning: 0,
            state: State.IDLE,
          })
        )
      }}
    >
      <span
        className={`flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3`}
      >
        {scanState.state}
      </span>
      <span className="font-medium mr-2 text-left flex-auto text-sm">
        Failed to scan {scanState.error} passport(s)
      </span>
    </button>
  ) : (
    <></>
  )
}

export default ScanNotification
