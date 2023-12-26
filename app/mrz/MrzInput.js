import Script from "next/script"
import MrzInputHandler from "./MrzInutHandler"

const MrzInput = ({setScanState, setParsed}) => {
    return (
        <>
            <Script type='text/javascript' src="./vendor/mrz-worker.bundle-min-wrapped.js" strategy='afterInteractive'/>
            <input id="mrz-input" name="mmrz-input" type="file" className="hidden" multiple onChange={$event => MrzInputHandler({setScanState, setParsed, $event})} />
        </>
    )
}

export default MrzInput