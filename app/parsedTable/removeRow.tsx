import { setScannedData } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

interface RemoveRowProps {
  rowKey: number
}

export const RemoveRow = ({ rowKey }: RemoveRowProps) => {
  const { scannedData } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  const doRemoveRow = () => {
    const dupScannedData = [...scannedData]
    dupScannedData.splice(rowKey, 1)
    dispatch(setScannedData(dupScannedData))
  }

  return (
    <button
      type="button"
      className="button text-xs px-2 py-1.5 text-gray-400 hover:text-red-200 hover:bg-red-600 bg-slate-50 rounded-md border border-white hover:border-red-700"
      onClick={doRemoveRow}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        <line x1="18" y1="9" x2="12" y2="15" />
        <line x1="12" y1="9" x2="18" y2="15" />
      </svg>
    </button>
  )
}
