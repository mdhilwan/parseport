const helper = ({onCallback, onError}) => {
    let mrzWorker
    if (typeof window !== 'undefined' && window.mrz_worker !== 'undefined') {
        const fn = window.mrz_worker.toString()
        const fnBody = fn.substring(fn.indexOf('{') + 1, fn.lastIndexOf('}'));

        const workerAddress = URL.createObjectURL(new Blob(
            [fnBody],
            { type: 'text/javascript' }
        ))

        mrzWorker = new Worker(workerAddress)

        mrzWorker.addEventListener('error', (evt) => onError(evt), false)
        mrzWorker.addEventListener('message', (evt) => onCallback(evt), false)

        const pathName = document.location.pathname.split('/')
        pathName.pop()

        mrzWorker.postMessage({
            cmd: 'config',
            config: {
                fsRootUrl: document.location.origin + pathName.join('/')
            }
        })
    }
    return mrzWorker
}

export default helper;