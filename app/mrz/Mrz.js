'use client'

import io from 'socket.io-client';
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import helper from './helper';

const State = {
    SCANNING: "Scanning",
    SUCCESS: "Success",
    ERROR: "Error"
}

const Mrz = () => {
    const socketPort = '4001';
    const socket = io(`:${socketPort}`);

    const [cookies, setCookies, removeCookie] = useCookies(['guid']);
    const [sockDisc, setSockDisc] = useState(false);
    const [scanState, setScanState] = useState();
    const [parsed, setParsed] = useState({})

    useEffect(() => {
        socket.on('disconnected', (socketDisconnected) => {
            if (cookies.guid) {
                const [uuid, thisSocketId] = cookies.guid.split('@@')
                if (socketDisconnected === thisSocketId) {
                    setSockDisc(true)
                }
            }
        })
        
        if (!cookies.guid) {
            setSockDisc(true)
        }
    }, [])

    const initMrz = () => {
        return helper({
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
                            socket.emit('scanned:parsed', {
                                agent: cookies.guid.split('@@')[1],
                                data: data.result.parsed.fields
                            })
                            setScanState(State.SUCCESS)
                        } else {
                            setParsed({
                                message: "Was unable to scan. Please position the biometric page and try again."
                            })

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

    const beginScanning = (evt) => {
        const mrzWorker = initMrz()
        const inputEl = evt.target
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e && e.target && e.target.result) {
                mrzWorker.postMessage({
                    cmd: 'process',
                    image: e.target.result
                })
            }
        }
        if (inputEl.files?.length) {
            reader.readAsDataURL(inputEl.files[0])
        }
    }

    const getPersonName = (data) => {
        if (data.firstName && data.lastName) {
            return `${data.firstName} ${data.lastName}`
        } else if (data.firstName && !data.lastName) {
            return `${data.firstName}`
        } else if (!data.firstName && data.lastName) {
            return `${data.lastName}`
        } else {
            return ''
        }
    }

    return (
        <>
            {
                sockDisc ? 
                    <h1>Disconnected. Please rescan QR code</h1> :
                    <div>
                        <Script type='text/javascript' src="./vendor/mrz-worker.bundle-min-wrapped.js" strategy='afterInteractive'/>
                        <input type='file' onChange={$event => beginScanning($event)}></input>
                        {   
                            scanState === State.SUCCESS ? 
                                <div>Sent {getPersonName(parsed)} to agent</div> : 
                                scanState === State.ERROR ? 
                                    <>{JSON.stringify(parsed)}</> : 
                                    <></>
                        }
                    </div>
                    
            }
        </>
    )
}

export default Mrz;