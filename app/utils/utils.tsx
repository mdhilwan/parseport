import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import { v4 } from 'uuid'
import { encrypt } from '../mrz/crypt'

const parsedIsValid = (parsed: any) => {
  return (
    parsed && parsed.data && parsed.iv && Object.keys(parsed.data).length > 0
  )
}

const utils = {
  Rand8digit() {
    return v4().slice(0, 8)
  },
  EmitToSocket(
    parsed: any,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    guid: { split: (arg0: string) => [any, any] }
  ) {
    if (guid && Object.keys(parsed).length > 0) {
      const [uuid, agent] = guid.split('@@')
      if (parsedIsValid(parsed)) {
        socket.emit(
          'scanned:parsed',
          btoa(
            JSON.stringify({
              agent: agent,
              data: encrypt(parsed.data, uuid, parsed.iv),
              uuid: uuid,
              iv: parsed.iv,
            })
          )
        )
      }
    }
  },
}

export default utils
