import { State } from '../enums/state'
import MrzInit from './MrzInit'

const MrzInputHandler = ({ dpSetParsed, dpSetScanState, $event }) => {
  let workerIdCol = []
  const updateIdCol = ({ id, state }) => {
    const idToUpdate = workerIdCol.find((i) => i.id === id)
    if (state === State.SUCCESS) {
      idToUpdate.state = state
    }
    const states = workerIdCol.map((id) => id.state)
    const progress = {
      success: states.filter(s => s === State.SUCCESS).length,
      error: states.filter(s => s === State.ERROR).length,
      scanning: states.filter(s => s === State.SCANNING).length,
      length: states.length
    }

    if (states.filter(s => s === State.SUCCESS).length === states.length) {
      dpSetScanState({ ...progress, state: State.SUCCESS })
    } else if (states.includes(State.SCANNING)) {
      dpSetScanState({ ...progress, state: State.SCANNING })
    } else if (states.includes(State.ERROR)) {
      dpSetScanState({ ...progress, state: State.ERROR })
    }
  }
  const beginScanning = (inputFiles) => {
    if (inputFiles?.length) {
      [...inputFiles].map((file, fileIndex) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e && e.target && e.target.result) {
            let mrzWorker = MrzInit({ dpSetParsed, updateIdCol })
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
