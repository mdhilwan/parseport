import MrzInit from "./MrzInit"

const MrzInputHandler = ({setParsed, setScanState, $event}) => {
    let mrzWorker
    const beginScanning = (inputFiles) => {
        
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e && e.target && e.target.result) {
                if (!mrzWorker) mrzWorker = MrzInit({setParsed, setScanState})
                mrzWorker.postMessage({
                    cmd: 'process',
                    image: e.target.result
                })
            }
        }
        if (inputFiles?.length) {
            reader.readAsDataURL(inputFiles[0])
        }
    }
    beginScanning($event?.target?.files || $event)
}

export default MrzInputHandler