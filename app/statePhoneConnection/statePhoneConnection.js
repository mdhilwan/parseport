import { useDispatch, useSelector } from 'react-redux'
import { setShowQrCodeModal } from '../slice/slice'

const StatePhoneConnection = () => {
  const { disconnected } = useSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  return (
    <button className="me-4 border focus:outline-none font-medium rounded-md text-xs px-2 py-1 text-center inline-flex items-center focus:ring-gray-600 bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
      {disconnected ? (
        <>
          <div className="text-sm font-normal">Phone not connected</div>
          <div className="flex items-center ">
            <a
              className="font-medium text-blue-600 p-1 hover:bg-blue-100 rounded-md"
              href="#"
              onClick={() => dispatch(setShowQrCodeModal(true))}
            >
              Connect
            </a>
          </div>
        </>
      ) : (
        <div
          className="flex items-center w-full max-w-xs p-4 text-lime-800 bg-lime-50 rounded-md shadow"
          role="alert"
        >
          <div className="text-sm font-normal">Phone connected.</div>
        </div>
      )}
    </button>
  )
}

export default StatePhoneConnection
