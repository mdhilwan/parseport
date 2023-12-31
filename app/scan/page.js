'use client'

import MrzPhone from "../mrz/MrzPhone";
import io from 'socket.io-client';
import '@/styles/global.css'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { State } from "../enums/state";
import Status from "../status";
import { isMobile } from 'is-mobile'

const Scan = () => {
    const socketPort = '4001';
    const socket = io(`:${socketPort}`);

    const [cookies] = useCookies(['guid']);
    const [linkedState, setLinkedState] = useState(State.LINKED)
    const [itsMobile, setItsMobile] = useState()

    useEffect(() => {
        socket.on('disconnected', (socketDisconnected) => {
            if (cookies.guid) {
                const [uuid, mainSocketId, agentSocketId] = cookies.guid.split('@@');
                if ([mainSocketId, agentSocketId].includes(socketDisconnected)) {
                    setLinkedState(State.DISCONNECTED)
                }
            } else {
                setLinkedState(State.DISCONNECTED)
            }
        })

        setItsMobile(isMobile());
    }, [])

    return (
        <div>
            {
                itsMobile ? 
                    linkedState === State.LINKED ? 
                        <MrzPhone socket={socket}/> :
                        <Status head={"Disconnected from host machine."} body={"Try scanning the QR code again"}/> :
                    <Status head={"Not a mobile phone."} body={"Please use a mobile phone and scan the QR code again"} />

            }
        </div>
    )
}

export default Scan;