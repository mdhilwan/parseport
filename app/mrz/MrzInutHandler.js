import { State } from '../enums/state'
import MrzInit from './MrzInit'

const MrzInputHandler = ({ setParsedCb, setScanStateCb, $event }) => {
  let workerIdCol = []
  const updateIdCol = ({ id, state }) => {
    const idToUpdate = workerIdCol.find((i) => i.id === id)
    if (state === State.SUCCESS) {
      idToUpdate.state = state
    }
    const states = workerIdCol.map((id) => id.state)
    if (states.includes(State.SCANNING)) {
      setScanStateCb(State.SCANNING)
    } else if (states.includes(State.ERROR)) {
      setScanStateCb(State.ERROR)
    } else if ([...new Set(states)].includes(State.SUCCESS)) {
      setScanStateCb(State.SUCCESS)
    }
  }
  const beginScanning = (inputFiles) => {
    if (inputFiles?.length) {
      ;[...inputFiles].map((file, fileIndex) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e && e.target && e.target.result) {
            let mrzWorker = MrzInit({ setParsedCb, updateIdCol })
            workerIdCol.push({ id: mrzWorker.id, state: State.SCANNING })
            mrzWorker.postMessage({
              cmd: 'process',
              image: e.target.result,
            })
          }
        }
        setTimeout(() => {
          reader.readAsDataURL(file)
        }, 100 * fileIndex)
      })
    }
  }
  beginScanning($event?.target?.files || $event)
}

export default MrzInputHandler
