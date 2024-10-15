'use client'

import {
  ControlSessionType,
  UserType,
} from '@/app/admin/shared/controls/controls'
import ImportExcelModal from '@/app/importExcelModal'
import QrCodeModal from '@/app/qrCodeModal'
import QRCode from 'qrcode'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Provider } from 'react-redux'
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
  setUserIsDemo,
} from '../slice/slice'
import store, { useAppDispatch, useAppSelector } from '../store'
import utils from '../utils'
import LandingZone from './landingZone'
import PostScan from './postScan'

const socketPort = '4001'
const socket = io(`:${socketPort}`)

type AppLandingType = {
  uuid: string
  session: ControlSessionType
  user: UserType
}

const AppLanding = (props: AppLandingType) => {
  const { uuid, session, user } = props
  const { parsed, guid, scanState, userIsDemo } = useAppSelector(
    (state) => state.mrzStore
  )
  const dispatch = useAppDispatch()

  if (!userIsDemo && user?.res?.result?.demo) {
    console.log('dispatch!')
    dispatch(setUserIsDemo())
  }

  if (guid === '') {
    dispatch(setGuid(uuid))
  }

  const [cookies, setCookie] = useCookies(['guid'])
  const connectedToWs = (guid: string) => (guid ? guid.includes('@') : false)

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
        }
      })
    } else {
      const linkGuidUrl = `${window.location.href}link?id=${guid}`
      QRCode.toDataURL(linkGuidUrl)
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

  const alertUser = (e: {
    preventDefault: () => void
    returnValue: string
  }) => {
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

const AppLandingStore = (props: AppLandingType) => {
  const { uuid, session, user } = props
  return (
    <Provider store={store}>
      <AppLanding uuid={uuid} session={session} user={user} />
    </Provider>
  )
}

export default AppLandingStore
