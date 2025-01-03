import { State } from '@/app/enums/state'
import { setScanState } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

const ScanNotification = () => {
  const { scanState, scannedData } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  return scanState.state === State.ERROR ? (
    <div className={'relative ms-4'}>
      <span
        className={
          'absolute bottom-full text-sm border p-3 rounded-lg mb-4 shadow-md'
        }
      >
        <span className={'font-semibold'}>Files failed to scan:</span>
        <ul className={'list-disc'}>
          {scanState.failedFiles.map((f: string, i: number) => (
            <li key={i} className={'ml-4'}>
              {f}
            </li>
          ))}
        </ul>
      </span>
      <button
        className={`cursor-pointer p-1 bg-red-700 border border-red-800 items-center text-red-100 leading-none rounded-full inline-flex`}
        role="alert"
        onClick={() => {
          dispatch(
            setScanState({
              success: 0,
              error: 0,
              length: 0,
              scanning: 0,
              failedFiles: [],
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
    </div>
  ) : (
    <></>
  )
}

export default ScanNotification
