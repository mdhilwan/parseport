import utils from '../utils'

const MrzWorker = ({ onCallback, onError }) => {
  let mrzWorker
  const id = utils.Rand8digit()
  try {
    const fn = window.mrz_worker.toString()
    const fnBody = fn.substring(fn.indexOf('{') + 1, fn.lastIndexOf('}'))

    const workerAddress = URL.createObjectURL(
      new Blob([fnBody], { type: 'text/javascript' })
    )

    mrzWorker = new Worker(workerAddress)

    mrzWorker.addEventListener('error', (evt) => {
      onError({ event: evt, id: id }), false
    })
    mrzWorker.addEventListener('message', (evt) => {
      onCallback({ event: evt, id: id }), false
    })

    const pathName = document.location.pathname.split('/')
    pathName.pop()

    mrzWorker.postMessage({
      cmd: 'config',
      config: {
        fsRootUrl: document.location.origin + pathName.join('/'),
      },
    })
    mrzWorker.id = id
  } catch (error) {
    console.error(error)
  }

  return mrzWorker
}

export default MrzWorker
