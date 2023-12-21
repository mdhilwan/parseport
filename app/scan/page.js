'use client'

import Mrz from "../mrz";
import io from 'socket.io-client';
import '../../styles/global.css'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { State } from "../state";
import Status from "../status";

const Scan = () => {
    const socketPort = '4001';
    const socket = io(`:${socketPort}`);

    const [cookies] = useCookies(['guid']);
    const [linkedState, setLinkedState] = useState(State.LINKED)

    useEffect(() => {
        socket.on('disconnected', (socketDisconnected) => {
            const [uuid, mainSocketId, agentSocketId] = cookies.guid.split('@@');
            if ([mainSocketId, agentSocketId].includes(socketDisconnected)) {
                setLinkedState(State.DISCONNECTED)
            }
        })
    }, [])

    return (
        <div>
            {
                linkedState === State.LINKED ? 
                    <Mrz/> :
                    <Status head={"Disconnected from host machine."} body={"Try scanning the QR code again"}/>
            }
        </div>
    )
}

export default Scan;