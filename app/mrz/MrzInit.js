import { State } from "../enums/state";
import MrzWorker from "./MrzWorker";
import * as CryptoJS from "crypto-js";

const MrzInit = ({ setParsed, updateIdCol }) => {
    return MrzWorker({
        async onCallback({ event, id }) {
            const data = event.data

            switch (data.type) {
                case 'progress':
                    updateIdCol({ id: id, state: State.SCANNING })
                    break;
                case 'error':
                    updateIdCol({ id: id, state: State.ERROR })
                    break;
                case 'result':
                    if (data.result?.parsed?.fields) {
                        setParsed({ 
                            data: data.result.parsed.fields,
                            iv: JSON.stringify(CryptoJS.lib.WordArray.random(16))
                        })
                        updateIdCol({ id: id, state: State.SUCCESS })
                    } else {
                        setParsed({ message: "Please reposition the biometric page and try again." })
                        updateIdCol({ id: id, state: State.ERROR })
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