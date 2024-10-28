import { setShowNameFileModal } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

const GenerateCsvButton = () => {
  const { scannedData } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  return scannedData.length > 0 ? (
    <button
      type="button"
      className="border focus:outline-none font-medium rounded-md text-xs px-2 py-1 text-center inline-flex items-center focus:ring-gray-600 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
      onClick={async () => {
        dispatch(setShowNameFileModal(true))
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
        />
      </svg>
      Download Excel
    </button>
  ) : (
    <></>
  )
}

export default GenerateCsvButton
