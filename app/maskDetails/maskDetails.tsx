import { toggleMaskPassportDetails } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'

const MaskDetails = () => {
  const { maskPassportDetails, userIsDemo } = useAppSelector(
    (state) => state.mrzStore
  )
  const dispatch = useAppDispatch()
  const baseClass =
    'me-4 border focus:outline-none font-medium rounded-full text-xs px-2 py-1.5 text-center inline-flex items-center focus:ring-gray-600 border-gray-700'

  if (userIsDemo) {
    return (
      <div
        className={`${baseClass} bg-amber-500 border-amber-800 text-amber-100`}
      >
        <div className="text-sm font-normal">Demo Account</div>
      </div>
    )
  }

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
