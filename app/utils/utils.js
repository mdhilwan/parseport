import { v4 } from 'uuid'
import { encrypt } from '../mrz/crypt'

const parsedIsValid = (parsed) => {
  return (
    parsed && parsed.data && parsed.iv && Object.keys(parsed.data).length > 0
  )
}

const utils = {
  Rand8digit() {
    return v4().slice(0, 8)
  },
  EmitToSocket(parsed, socket, guid) {
    if (guid) {
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
