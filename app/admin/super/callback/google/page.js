'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const GoogleCallback = () => {
    
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        router.push(`/api/auth/callback/google?${searchParams}`)
    }, [])
    

    return (
        <></>
    )
}

export default GoogleCallback