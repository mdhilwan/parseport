import { setShowQrCodeModal } from '@/app/slice/slice'
import store, { useAppDispatch, useAppSelector } from '@/app/store'
import { Provider } from 'react-redux'

const StatePhoneConnection = () => {
  const { disconnected, qrcodeSrc } = useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()

  let statusLight: string
  let statusText: string

  if (qrcodeSrc !== 'loading.svg' && disconnected) {
    statusText = 'No device connected'
    statusLight = 'ring-4 ring-amber-400 bg-amber-500 animate-pulse'
  } else if (qrcodeSrc !== 'loading.svg' && !disconnected) {
    statusText = 'Phone connected'
    statusLight = 'bg-green-500'
  } else {
    statusText = 'Getting ready'
    statusLight = 'ring-4 ring-red-700 bg-red-500 animate-pulse'
  }

  return (
    <a
      className="me-4 border cursor-pointer font-medium rounded-full text-xs px-4 py-2 text-center inline-flex items-center bg-white border-gray-300 text-base-color transition-all hover:shadow"
      onClick={() => dispatch(setShowQrCodeModal(true))}
    >
      <div className="flex items-center ">
        <span
          className={`rounded-full ${statusLight} mr-2.5 inline-block`}
          style={{ height: '10px', width: '10px' }}
        />
      </div>
      <div className="text-sm font-normal">{statusText}</div>
    </a>
  )
}

const StatePhoneConnectionProvider = () => {
  return (
    <Provider store={store}>
      <StatePhoneConnection />
    </Provider>
  )
}

export default StatePhoneConnectionProvider
