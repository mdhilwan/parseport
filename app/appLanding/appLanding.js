'use client'

import ImportExcelModal from '@/app/importExcelModal'
import QrCodeModal from '@/app/qrCodeModal'
import QRCode from 'qrcode'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Provider, useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import Controls from '../admin/shared/controls'
import { State } from '../enums/state'
import { decrypt } from '../mrz/crypt'
import {
  addScannedData,
  revertMrzStateDropZoneClass,
  setDisconnected,
  setGuid,
  setQrcodeSrc,
  setScanned,
  setShowQrCodeModal,
} from '../slice/slice'
import store from '../store'
import utils from '../utils'
import LandingZone from './landingZone'
import PostScan from './postScan'

const socketPort = '4001'
const socket = io(`:${socketPort}`)

const AppLanding = ({ uuid, session, user }) => {
  const { parsed, guid, scanState } = useSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  if (guid === '') {
    dispatch(setGuid(uuid))
  }

  const [cookies, setCookie] = useCookies(['guid'])
  const connectedToWs = (guid) => (guid ? guid.includes('@') : false)

  let connectedAgentId = ''

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

      socket.off('parsed').on('parsed', ({ parsed, iv }) => {
        dispatch(addScannedData(JSON.parse(decrypt(parsed, uuid, iv))))
        dispatch(revertMrzStateDropZoneClass())
      })

      socket.on('disconnected', (socketDisconnected) => {
        if (socketDisconnected === connectedAgentId) {
          dispatch(setDisconnected(true))
          socket.removeAllListeners()
        }
      })
    } else {
      QRCode.toDataURL(`${window.location.href}link?id=${guid}`)
        .then((urlSrc) => dispatch(setQrcodeSrc(urlSrc)))
        .catch((err) => console.error(err))
    }
  }, [guid, connectedToWs(guid)])

  useEffect(() => utils.EmitToSocket(parsed, socket, cookies.guid), [parsed])

  useEffect(() => {
    if (scanState.state === State.SUCCESS) {
      dispatch(setScanned(true))
    }
  }, [scanState])

  useEffect(() => {
    window.gtag('set', 'user_data', { email: user.email })
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
        <PostScan user={user} />
      </LandingZone>
      <QrCodeModal />
      <ImportExcelModal />
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
