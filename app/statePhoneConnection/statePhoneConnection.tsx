import { setShowQrCodeModal } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'

const StatePhoneConnection = () => {
  const { disconnected } = useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()

  const baseClass =
    'me-4 border focus:outline-none font-medium rounded-full text-xs px-2 py-1.5 text-center inline-flex items-center focus:ring-gray-600'
  return (
    <div
      className={`${baseClass} ${disconnected ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-lime-100 border-lime-700 text-lime-800'}`}
    >
      {disconnected ? (
        <>
          <div className="text-sm font-normal">Phone not connected</div>
          <div className="flex items-center ">
            <a
              className="font-medium text-blue-600 px-1 ms-2 hover:bg-blue-100 rounded-md hover:cursor-pointer"
              onClick={() => dispatch(setShowQrCodeModal(true))}
            >
              Connect
            </a>
          </div>
        </>
      ) : (
        <div className="text-sm font-normal">Phone connected.</div>
      )}
    </div>
  )
}

export default StatePhoneConnection
