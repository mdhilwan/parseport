import * as CryptoJS from 'crypto-js'
import { State } from '../enums/state'
import MrzWorker from './MrzWorker'

type MrzInitType = {
  dpSetParsed: Function
  updateIdCol: Function
}

const MrzInit = (props: MrzInitType) => {
  const { dpSetParsed, updateIdCol } = props
  return MrzWorker({
    async onCallback({ event, id }: { event: { data: any }; id: string }) {
      const data = event.data

      switch (data.type) {
        case 'progress':
          updateIdCol({ id: id, state: State.SCANNING })
          break
        case 'error':
          updateIdCol({ id: id, state: State.ERROR })
          break
        case 'result':
          if (data.result?.parsed?.fields) {
            dpSetParsed({
              data: data.result.parsed.fields,
              iv: JSON.stringify(CryptoJS.lib.WordArray.random(16)),
            })
            updateIdCol({ id: id, state: State.SUCCESS })
          } else {
            dpSetParsed({
              message: 'Please reposition the biometric page and try again.',
            })
            updateIdCol({ id: id, state: State.ERROR })
          }
          break
        default:
          break
      }
    },
    onError(evt: any) {
      console.error(evt)
      return undefined
    },
  })
}

export default MrzInit
