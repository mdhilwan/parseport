import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../enums/state'
import Mrz from '../mrz'
import MrzInputHandler from '../mrz/MrzInutHandler'
import { setParsed, setScanState } from '../slice/slice'

const PreScan = ({ user }) => {
  const { qrcodeSrc, guid, scanState, mrzDropZoneClass } = useSelector(
    (state) => state.mrzStore
  )
  const dispatch = useDispatch()

  const dragOverHandler = (ev) => ev.preventDefault()
  const dropHandler = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    MrzInputHandler({
      dpSetParsed,
      dpSetScanState,
      $event: [...evt.dataTransfer.files],
    })
  }

  const dpSetParsed = async (obj) => {
    window.gtag('event', 'new_scan', { email: user.email })
    dispatch(setParsed(obj))
  }
  const dpSetScanState = (obj) => dispatch(setScanState(obj))

  return (
    <div className={guid.includes('@') ? 'grid grid-cols-2 gap-24' : 'grid grid-cols-1 gap-24'}>
      <div>
        <div className="w-96 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-justify">
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
                d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Scan this QR code{' '}
            <span className="text-slate-400 text-2xl">
              with the phone you want to use to scan
            </span>
          </h2>
          <Image
            src={qrcodeSrc}
            alt=""
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      </div>
      {guid.includes('@') ? (
        <div>
          <div className="w-96 mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-justify">
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Or drag & drop the file{' '}
              <span className="text-slate-400 text-2xl">
                you can still link your phone later on
              </span>
            </h2>
            {scanState.state === State.SCANNING ? (
              <>
                <button
                  disabled
                  type="button"
                  className="flex justify-center w-full h-60 text-slate-500 bg-white focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Scanning...
                </button>
              </>
            ) : (
              <>
                <div
                  className="max-w-xl p-8 px-14 my-auto"
                  onDragOver={() => dragOverHandler()}
                  onDrop={(evt) => dropHandler(evt)}
                >
                  <label className={mrzDropZoneClass}>
                    <span className="flex items-center space-x-2">
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
                          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                        />
                      </svg>
                      <span className="font-medium text-gray-600">
                        Drop files (.png, .jpeg, .jpg) to scan, or
                        <span className="text-blue-600 underline"> browse</span>
                      </span>
                    </span>
                    <Mrz
                      dpSetParsed={dpSetParsed}
                      dpSetScanState={dpSetScanState}
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default PreScan
