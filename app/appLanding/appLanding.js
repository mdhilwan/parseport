'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import QRCode from 'qrcode'
import ParsedTable from '../parsedTable/parsedTable';
import MrzInput from '../mrz/MrzInput';
import MrzInputHandler from '../mrz/MrzInutHandler';
import { State } from '../enums/state';
import { useCookies } from 'react-cookie';

const AppLanding = ({ uuid }) => {

    const socketPort = '4001';
    const socket = io(`:${socketPort}`);

    const connectedToWs = () => guid.includes('@')
    const [guid, setGuid] = useState(uuid)
    const [scanned, setScanned] = useState(false)
    const [disconnected, setDisconnected] = useState(true)
    const [qrcodeSrc, setQrcodeSrc] = useState('loading.svg')
    const [scannedData, setScannedData] = useState([])
    const [showQrCodeModal, setShowQrCodeModal] = useState(false)
    const [scanState, setScanState] = useState();
    const [parsed, setParsed] = useState({})
    const [cookies, setCookie] = useCookies(['guid']);

    let connectedAgentId = '';
    let scannedDataCol = [];

    const dragOverHandler = (ev) => ev.preventDefault()
    const dropHandler = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        MrzInputHandler({
            setParsed,
            setScanState,
            $event: [...evt.dataTransfer.files]
        })
    }

    useEffect(() => {
        console.log('use effect again', scannedData)

        socket.on('connect', () => {
            setGuid(`${guid}@@${socket.id}`);
            setCookie('guid', `${guid}@@${socket.id}`)
        })

        socket.on('scanned:phone:qr', (agentId) => {
            console.log('scanned:phone:qr:::', connectedAgentId, agentId)
            connectedAgentId = agentId
            setScanned(true)
            setDisconnected(false)
            setShowQrCodeModal(false)
        })

        socket.on('parsed', (data) => {
            scannedDataCol = [...scannedDataCol, data]
            console.log('parsed!!!!', scannedDataCol)
            setScannedData(scannedDataCol)
        })

        socket.on('disconnected', (socketDisconnected) => {
            if (socketDisconnected === connectedAgentId) {
                setDisconnected(true)
            }
        })
    }, [])

    useEffect(() => {
        if (connectedToWs()) {
            console.log('Agent URL', `${window.location.href}link?id=${guid}`)
            QRCode.toDataURL(`${window.location.href}link?id=${guid}`)
                .then(urlSrc => setQrcodeSrc(urlSrc))
                .catch(err => console.error(err))
        }
    }, [guid])

    useEffect(() => {
        if (scanState === State.SUCCESS) {
            setScanned(true)
            socket.emit('scanned:parsed', {
                agent: cookies.guid.split('@@')[1],
                data: parsed
            })
        }
    }, [parsed, scanState])

    return (
        <>
            <div className='w-full'>
                {
                    connectedToWs() ?
                        scanned ?
                            <>
                                <h2 className='text-3xl font-bold tracking-tight'>Scans</h2>
                                <ParsedTable parsed={scannedData} />
                                <div className="mt-3 w-80">
                                    {
                                        disconnected ?
                                            <div class="bg-red-50 border border-red-100 text-red-900 px-4 py-3 rounded relative text-sm opacity-50 hover:opacity-100" role="alert">
                                                <strong class="font-bold">Phone not connected.</strong> <span className='text-red-400'>To connect your phone please click <a onClick={() => setShowQrCodeModal(true)} className='text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer'>here</a></span>
                                            </div> :
                                            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm opacity-50 hover:opacity-100" role="alert">
                                                <strong class="font-bold">Phone Linked</strong>
                                            </div>
                                    }
                                </div>
                            </> :
                            <div className='grid grid-cols-2 gap-24'>
                                <div>
                                    <div className='w-96 mx-auto'>
                                        <h2 className="text-3xl font-bold tracking-tight text-justify">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            Scan this QR code <span className='text-slate-400 text-2xl'>with the phone you want to use to scan your document</span>
                                        </h2>
                                        <Image src={qrcodeSrc} alt="" width={300} height={300} className='mx-auto' />
                                    </div>
                                </div>
                                <div>
                                    <div className='w-96 mx-auto'>
                                        <h2 className="text-3xl font-bold tracking-tight text-justify">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                            Or drag & drop the file here <span className='text-slate-400 text-2xl'>you can still link your phone later on</span>
                                        </h2>
                                        <div
                                            className="max-w-xl p-8 px-14 my-auto"
                                            onDragOver={evt => dragOverHandler(evt)}
                                            onDrop={evt => dropHandler(evt)}
                                        >
                                            <label
                                                className="flex justify-center w-full h-60 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                                <span className="flex items-center space-x-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                                    </svg>
                                                    <span className="font-medium text-gray-600">
                                                        Drop files (.png, .jpeg, .jpg) to scan, or
                                                        <span className="text-blue-600 underline"> browse</span>
                                                    </span>
                                                </span>
                                                <MrzInput setParsed={setParsed} setScanState={setScanState}/>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                        ''
                }
            </div>
            {
                showQrCodeModal ?
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="mt-3 text-center">
                                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Reconnect your phone</h3>
                                            <Image src={qrcodeSrc} alt="" width={300} height={300} className='mt-2 mx-auto' />
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setShowQrCodeModal(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ''
            }

        </>
    )
}

export default AppLanding;