'use client';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import QRCode from 'qrcode'
import ParsedTable from '../parsedTable/parsedTable';

const QrCode = ({uuid}) => {

    const socketPort = '4001';
    const socket = io(`:${socketPort}`);

    const connectedToWs = () => guid.includes('@')
    const [guid, setGuid] = useState(uuid)
    const [scanned, setScanned] = useState(false)
    const [qrcodeSrc, setQrcodeSrc] = useState('loading.svg')
    const [scannedData, setScannedData] = useState([])
    let connectedAgentId = '';

    useEffect(() => {
        console.log('use effect again')

        socket.on('connect', () => {
            setGuid(`${guid}@@${socket.id}`);
        })

        socket.on('scanned:phone:qr', (agentId) => {
            connectedAgentId = agentId
            setScanned(true)
        })

        socket.on('scanned:phone:agent', (agentid) => {
            console.log('scanned:phone:agent:::', agentid)
        })

        socket.on('parsed', (data) => {
            setScannedData([...scannedData, data])
        })

        socket.on('disconnected', (socketDisconnected) => {
            if (socketDisconnected === connectedAgentId) {
                setScanned(false)
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
    
    return (
        <>
            <div>
                {
                    connectedToWs() ? 
                        scanned ? 
                            <>
                                <h2 className="text-3xl font-bold tracking-tight mb-3">Phone Linked</h2>
                                <ParsedTable parsed={scannedData}/>
                            </> :
                            <div className='w-80'>
                                <h2 className="text-3xl font-bold tracking-tight text-justify">Scan this QR code <span className='text-slate-400 text-2xl'>with the phone you want to use to scan your document</span></h2>
                                <Image src={qrcodeSrc} alt="" width={400} height={400}/>
                            </div> : 
                        ''
                }
            </div>
        </>
    )
}

export default QrCode;