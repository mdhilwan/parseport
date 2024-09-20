import { toggleMaskPassportDetails } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'

const MaskDetails = () => {
  const { maskPassportDetails } = useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()
  const baseClass =
    'me-4 border focus:outline-none font-medium rounded-md text-xs px-2 py-1.5 text-center inline-flex items-center focus:ring-gray-600 border-gray-700'

  return (
    <button
      className={`${baseClass} ${maskPassportDetails ? 'bg-gray-500 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
      onClick={() => dispatch(toggleMaskPassportDetails())}
    >
      <div className="text-sm font-normal">Mask Details</div>
    </button>
  )
}

export default MaskDetails
