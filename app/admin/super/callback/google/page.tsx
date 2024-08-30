'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const GoogleCallback = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    router.push(`/api/auth/callback/google?${searchParams}`)
  }, [])

  return <></>
}

export default GoogleCallback
