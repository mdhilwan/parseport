'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import QRCode from 'qrcode'
import ParsedTable from '../parsedTable'
import Mrz from '../mrz'
import MrzInputHandler from '../mrz/MrzInutHandler'
import { State } from '../enums/state'
import { useCookies } from 'react-cookie'
import StatePhoneConnection from '../statePhoneConnection'
import StateMrzInput from '../stateMrzInput'
import Controls from '../admin/shared/controls'
import utils from '../utils'
import { decrypt } from '../mrz/crypt'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from '../store'
import { addNewScan } from '../slice/slice'

const AppLanding = ({ uuid, session }) => {
  const socketPort = '4001'
  const socket = io(`:${socketPort}`)

  const state = useSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  console.log(state)

  const [guid, setGuid] = useState(uuid)
  const [scanned, setScanned] = useState(false)
  const [disconnected, setDisconnected] = useState(true)
  const [qrcodeSrc, setQrcodeSrc] = useState('loading.svg')
  const [scannedData, setScannedData] = useState([])
  const [showQrCodeModal, setShowQrCodeModal] = useState(false)
  const [scanState, setScanState] = useState(State.IDLE)
  const [parsed, setParsed] = useState({})
  const [cookies, setCookie] = useCookies(['guid'])
  const connectedToWs = () => (guid ? guid.includes('@') : false)

  const [mrzDropZoneClass, setMrzDropZoneClass] = useState(
    'flex justify-center w-full h-60 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
  )
  const [mrzStateDropZoneClass, setMrStateDropZoneClass] = useState(
    'mt-10 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-50'
  )

  let connectedAgentId = ''
  let scannedDataCol = []

  const dragOverHandler = (ev) => ev.preventDefault()
  const dropHandler = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    MrzInputHandler({
      setParsed,
      setScanState,
      $event: [...evt.dataTransfer.files],
    })
  }

  useEffect(() => {
    socket.on('connect', () => {
      setGuid(`${guid}@@${socket.id}`)
      setCookie('guid', `${guid}@@${socket.id}`)
    })

    socket.on('scanned:phone:qr', (agentId) => {
      connectedAgentId = agentId
      setScanned(true)
      setDisconnected(false)
      setShowQrCodeModal(false)
    })

    socket.on('parsed', ({ parsed, iv }) => {
      console.log('parsed!!!!')
      const decrypted = decrypt(parsed, guid, iv)
      scannedDataCol = [...scannedDataCol, JSON.parse(decrypted)]
      setScannedData(scannedDataCol)
      dispatch(addNewScan(scannedDataCol))
    })

    socket.on('disconnected', (socketDisconnected) => {
      if (socketDisconnected === connectedAgentId) {
        setDisconnected(true)
      }
    })
  }, [])

  useEffect(() => {
    if (connectedToWs()) {
      QRCode.toDataURL(`${window.location.href}link?id=${guid}`)
        .then((urlSrc) => setQrcodeSrc(urlSrc))
        .catch((err) => console.error(err))
    }
  }, [guid, connectedToWs()])

  useEffect(() => utils.EmitToSocket(parsed, socket, cookies.guid), [parsed])

  useEffect(() => {
    if (scanState === State.SUCCESS) {
      setScanned(true)
    }
  }, [scanState])

  const dragOverDocHandler = (ev) => {
    if (connectedToWs() && scanned) {
      setMrStateDropZoneClass(
        'mt-10 flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow text-gray-400 bg-lime-100'
      )
    } else if (connectedToWs()) {
      setMrzDropZoneClass(
        'flex justify-center w-full h-60 px-4 transition bg-lime-100 border-2 border-lime-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
      )
    }
  }

  const dragEndHandler = () => {
    setTimeout(() => {
      if (connectedToWs() && scanned) {
        setMrStateDropZoneClass(
          'mt-10 flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow text-gray-400 bg-gray-50'
        )
      } else if (connectedToWs()) {
        setMrzDropZoneClass(
          'flex justify-center w-full h-60 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
        )
      }
    }, 1000)
  }

  const landingClassName = () => {
    if (scanned) {
      return 'flex min-h-screen flex-col items-center justify-between p-12 w-full mx-auto'
    }
    return 'flex min-h-screen flex-col items-center justify-between p-12 max-w-6xl mx-auto'
  }

  return (
    <div>
      <Controls session={session} />
      <div
        className={landingClassName()}
        onDragOver={($event) => dragOverDocHandler($event)}
        onDragLeave={() => dragEndHandler()}
        onDrop={() => dragEndHandler()}
      >
        {scanned ? (
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-10">
              Passport to Visa Scans
            </h2>
            <ParsedTable parsed={scannedData} session={session} />
            <StateMrzInput
              setParsed={setParsed}
              scanState={scanState}
              setScanState={setScanState}
              bg={mrzStateDropZoneClass}
            />
            <StatePhoneConnection
              disconnected={disconnected}
              setShowQrCodeModal={setShowQrCodeModal}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-24">
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
                {scanState === State.SCANNING ? (
                  <>
                    <button
                      disabled
                      type="button"
                      className="flex justify-center w-full h-60 text-slate-500 bg-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 items-center"
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
                      onDragOver={(evt) => dragOverHandler(evt)}
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
                            <span className="text-blue-600 underline">
                              {' '}
                              browse
                            </span>
                          </span>
                        </span>
                        <Mrz
                          setParsed={setParsed}
                          setScanState={setScanState}
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {showQrCodeModal ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Reconnect your phone
                    </h3>
                    <Image
                      src={qrcodeSrc}
                      alt=""
                      width={300}
                      height={300}
                      className="mt-2 mx-auto"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowQrCodeModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

const AppLandingStore = ({ uuid, session }) => {
  return (
    <Provider store={store}>
      <AppLanding uuid={uuid} session={session} />
    </Provider>
  )
}

export default AppLandingStore
