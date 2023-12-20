'use client'
 
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { isMobile } from 'is-mobile'

const Link = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const idParams = searchParams.get('id')
    const [mainUuid, mainSocketId] = idParams?.split('@@') || ['', '']

    const [linked, setLinked] = useState(false)
    const [linkedErr, setLinkedErr] = useState(false)
    const [itsMobile, setItsMobile] = useState()
    const [cookies, setCookie] = useCookies(['guid']);

    const doLink = async () => {
        const linkRes = await fetch(`${window.location.protocol}//${window.location.hostname}:4001/api/link/verify/${mainUuid}/${mainSocketId}`, { method: 'POST' });
        const linkData = await linkRes.json();
        setLinked(linkData.status === 'ok')
        setLinkedErr(linkData.status === 'socket error')
    }

    useEffect(() => {
        setItsMobile(isMobile())

        if (isMobile()) {
            doLink();
        }
    }, [])

    useEffect(() => {
        if (linked) {
            setTimeout(() => {
                setCookie('guid', `${mainUuid}@@${mainSocketId}`)
                router.push('scan')
            }, 1000)
        }
    }, [linked])
   
    return <>
    {itsMobile ? 
        linked ? 
            <h1>Connecting...</h1> : 
            linkedErr ?
                <h1>QR Code Error. Try scanning the QR code again</h1> :
                <div>Connecting...</div> :
        <h1>Please use your mobile phone</h1>  
    }
    </>
}

export default Link;