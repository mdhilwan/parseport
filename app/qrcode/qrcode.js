'use client';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import QRCode from 'qrcode'

const QrCode = ({uuid}) => {

    const socketPort = '4001';
    const socket = io(`:${socketPort}`);

    const connectedToWs = () => guid.includes('@')
    const [guid, setGuid] = useState(uuid)
    const [scanned, setScanned] = useState(false)
    const [qrcodeSrc, setQrcodeSrc] = useState('loading.svg')

    useEffect(() => {
        socket.on('connect', () => {
            setGuid(`${guid}@@${socket.id}`);
        })

        socket.on('scanned:phone:qr', () => {
            setScanned(true)
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
                            <h1>Phone Scanned</h1> :
                            <Image src={qrcodeSrc} alt="" width={300} height={300}/> : 
                        ''
                }
            </div>
        </>
    )
}

export default QrCode;