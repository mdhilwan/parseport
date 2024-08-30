'use client'

import '@/styles/global.css'
import { isMobile } from 'is-mobile'
import { useRouter, useSearchParams } from 'next/navigation'
import { SetStateAction, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import io from 'socket.io-client'
import { State } from '../enums/state'
import Status from '../status'

const socketPort = '4001'
const socket = io(`:${socketPort}`)

const Link = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const idParams = searchParams.get('id')
  const [mainUuid, mainSocketId] = idParams?.split('@@') || ['', '']
  const [socketId, setSocketId] = useState('')
  const [linkedState, setLinkedState] = useState(State.IDLE)
  const [itsMobile, setItsMobile] = useState<boolean>()
  const [cookies, setCookie] = useCookies(['guid'])

  const doLink = async (socketId: SetStateAction<string>) => {
    setLinkedState(State.LINKING)
    setSocketId(socketId)
    const linkRes = await fetch(
      `${window.location.protocol}//${window.location.hostname}:4001/api/link/verify/${mainUuid}/${mainSocketId}/${socketId}`,
      { method: 'POST' }
    )
    const linkData = await linkRes.json()

    if (linkData.status === 'ok') {
      setLinkedState(State.LINKED)
    } else {
      setLinkedState(State.ERROR)
    }
  }

  useEffect(() => {
    setItsMobile(isMobile())

    socket.on('connect', () => {
      if (isMobile()) {
        doLink(socket.id)
      }
    })

    socket.on('disconnected', (socketDisconnected) => {
      if (socketDisconnected === mainSocketId) {
        setLinkedState(State.DISCONNECTED)
        socket.removeAllListeners()
      }
    })
  }, [])

  useEffect(() => {
    if (linkedState === State.LINKED) {
      setCookie('guid', `${mainUuid}@@${mainSocketId}@@${socketId}`)
      setTimeout(() => {
        router.push('scan')
      }, 500)
    }
  }, [linkedState])

  return (
    <div>
      {itsMobile ? (
        linkedState === State.DISCONNECTED ? (
          <Status
            head={'Disconnected from host machine.'}
            body={'Try scanning the QR code again'}
          />
        ) : linkedState === State.IDLE ? (
          <Status head={'Loading...'} state={State.LINKING} />
        ) : linkedState === State.LINKING ? (
          <Status head={'Connecting...'} state={State.LINKING} />
        ) : linkedState === State.LINKED ? (
          <Status head={'Setting up scanner...'} state={State.LINKING} />
        ) : linkedState === State.ERROR ? (
          <Status
            head={'QR Code Error.'}
            body={'Try scanning the QR code again'}
          />
        ) : (
          <></>
        )
      ) : (
        <Status
          head={'Not a mobile phone.'}
          body={'Please use a mobile phone and scan the QR code again'}
        />
      )}
    </div>
  )
}

export default Link
