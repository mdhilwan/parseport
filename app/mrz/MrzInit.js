import { State } from "../enums/state";
import MrzWorker from "./MrzWorker";

const MrzInit = ({setScanState, setParsed}) => {
    return MrzWorker({
        async onCallback(evt) {
            const data = evt.data

            switch (data.type) {
                case 'progress':
                    setScanState(State.SCANNING)
                    break;
                case 'error':
                    setScanState(State.ERROR)
                    break;
                case 'result':
                    if (data.result?.parsed?.fields) {
                        setParsed(data.result.parsed.fields)
                        setScanState(State.SUCCESS)
                    } else {
                        setParsed({ message: "Please reposition the biometric page and try again." })
                        setScanState(State.ERROR)
                    }
                    break;
                default:
                    break;
            }
        },
        onError(evt) {
            console.error(evt);
            return undefined;
        }
    })
}

export default MrzInit