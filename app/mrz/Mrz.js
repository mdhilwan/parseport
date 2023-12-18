'use client'

import io from 'socket.io-client';
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import helper from './helper';

const Mrz = () => {
    const socketPort = '4001';
    const socket = io(`:${socketPort}`);

    const [cookies, setCookies, removeCookie] = useCookies(['guid']);
    const [sockDisc, setSockDisc] = useState(false);
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
    }, [])

    const initMrz = () => {
        return helper({
            async onCallback(evt) {
                const data = evt.data

                switch (data.type) {
                    case 'progress':
                        console.log({state: 'progress'})
                        break;
                    case 'error':
                        console.log({state: 'error', data: data})
                        break;
                    case 'result':
                        console.log({state: 'result', data: data})
                        if (data.result.parsed.fields) {
                            setParsed(data.result.parsed.fields)
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

    return (
        <>
            {
                sockDisc ? 
                    <h1>Disconnected. Please rescan QR code</h1> :
                    <div>
                        <Script type='text/javascript' src="./vendor/mrz-worker.bundle-min-wrapped.js" strategy='afterInteractive'/>
                        <input type='file' onChange={$event => beginScanning($event)}></input>

                        <div>
                            {parsed ? 
                                <>{JSON.stringify(parsed)}</> : 
                                <></>
                            }
                        </div>
                    </div>
                    
            }
        </>
    )
}

export default Mrz;