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
                                message: "Please reposition the biometric page and try again."
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

    const truncateString = string => {
        if (string.length > 10) {
            return string.slice(0, 10) + '...'
        }
        return string
    }

    const getPersonName = data => {
        let name = '';
        if (data.firstName && data.lastName) {
            name = `${data.firstName} ${data.lastName}`
        } else if (data.firstName && !data.lastName) {
            name = `${data.firstName}`
        } else if (!data.firstName && data.lastName) {
            name = `${data.lastName}`
        } else {
            name = ''
        }
        return truncateString(name)
    }

    return (
        <>
            {
                sockDisc ? 
                    <h1>Disconnected. Please rescan QR code</h1> :
                    <div>
                        <Script type='text/javascript' src="./vendor/mrz-worker.bundle-min-wrapped.js" strategy='afterInteractive'/>
                        <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        {
                                            scanState === State.SUCCESS ?
                                                <>
                                                    <span>Sent {getPersonName(parsed)} to agent</span><br/>
                                                    <span className="font-semibold">Click and choose another file</span> or take another photo
                                                </> : scanState === State.ERROR ? 
                                                    <>
                                                        <span>There seems to be an error scanning. {parsed.message}</span>
                                                        <span className="font-semibold">Click and choose a file</span> or take a photo
                                                    </> : scanState === State.SCANNING ?
                                                        <>
                                                            Scanning....
                                                        </> :
                                                        <>
                                                            <span className="font-semibold">Click and choose a file</span> or take a photo
                                                        </>
                                        }
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={$event => beginScanning($event)}/>
                            </label>
                        </div> 
                    </div>
                    
            }
        </>
    )
}

export default Mrz;