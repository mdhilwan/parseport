import { toggleHighlightExpiredPassports } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'

const HighlightExpiredPassports = () => {
  const { scannedData, highlightExpiredPassports } = useAppSelector(
    (state) => state.mrzStore
  )
  const dispatch = useAppDispatch()
  const baseClass =
    'ms-4 border focus:outline-none font-medium rounded-md text-xs px-2 py-1.5 text-center inline-flex items-center focus:ring-gray-600 border-gray-700'

  return scannedData.length > 0 ? (
    <button
      onClick={() => dispatch(toggleHighlightExpiredPassports())}
      className={`${baseClass} ${highlightExpiredPassports ? 'bg-gray-500 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
    >
      <div className="text-sm font-normal">Highlight Expired Passports </div>
    </button>
  ) : (
    <></>
  )
}

export default HighlightExpiredPassports
