'use client'

import Image from 'next/image'
import QRCode from 'qrcode'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Provider, useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import Controls from '../admin/shared/controls'
import { State } from '../enums/state'
import { decrypt } from '../mrz/crypt'
import {
  addNewScan,
  setDisconnected,
  setGuid,
  setQrcodeSrc,
  setScanned,
  setScannedData,
  setShowQrCodeModal,
} from '../slice/slice'
import store from '../store'
import utils from '../utils'
import LandingZone from './landingZone'
import PostScan from './postScan'
import PreScan from './preScan'

const socketPort = '4001'
const socket = io(`:${socketPort}`)

const AppLanding = ({ uuid, session, user }) => {
  const { parsed, guid, scanned, qrcodeSrc, showQrCodeModal, scanState } =
    useSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  if (guid === '') {
    dispatch(setGuid(uuid))
  }

  const [cookies, setCookie] = useCookies(['guid'])
  const connectedToWs = (guid) => (guid ? guid.includes('@') : false)

  let connectedAgentId = ''
  let scannedDataCol = []

  useEffect(() => {
    if (!connectedToWs(guid)) {
      socket.on('connect', () => {
        if (guid !== '') {
          dispatch(setGuid(`${guid}@@${socket.id}`))
          setCookie('guid', `${uuid}@@${socket.id}`)
        }
      })

      socket.on('scanned:phone:qr', (agentId) => {
        connectedAgentId = agentId
        dispatch(setScanned(true))
        dispatch(setDisconnected(false))
        dispatch(setShowQrCodeModal(false))
      })

      socket.on('parsed', ({ parsed, iv }) => {
        const decrypted = decrypt(parsed, uuid, iv)
        scannedDataCol = [...scannedDataCol, JSON.parse(decrypted)]
        dispatch(setScannedData(scannedDataCol))
        dispatch(addNewScan(scannedDataCol))
      })

      socket.on('disconnected', (socketDisconnected) => {
        if (socketDisconnected === connectedAgentId) {
          dispatch(setDisconnected(true))
          socket.removeAllListeners()
        }
      })
    }
  }, [guid, connectedToWs(guid)])

  useEffect(() => {
    if (connectedToWs(guid)) {
      QRCode.toDataURL(`${window.location.href}link?id=${guid}`)
        .then((urlSrc) => dispatch(setQrcodeSrc(urlSrc)))
        .catch((err) => console.error(err))
    }
  }, [guid, connectedToWs(guid)])

  useEffect(() => utils.EmitToSocket(parsed, socket, cookies.guid), [parsed])

  useEffect(() => {
    if (scanState === State.SUCCESS) {
      dispatch(setScanned(true))
    }
  }, [scanState])

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  const alertUser = (e) => {
    e.preventDefault()
    e.returnValue = ''
  }

  return (
    <>
      <Controls session={session} />
      <LandingZone>
        {scanned ? <PostScan user={user} /> : <PreScan user={user} />}
      </LandingZone>
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
                    onClick={() => dispatch(setShowQrCodeModal(false))}
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
    </>
  )
}

const AppLandingStore = ({ uuid, session, user }) => {
  return (
    <Provider store={store}>
      <AppLanding uuid={uuid} session={session} user={user} />
    </Provider>
  )
}

export default AppLandingStore
