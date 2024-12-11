'use client'

import { WhichAdmin } from '@/app/enums/whichAdmin'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type LoginType = {
  whichAdmin: WhichAdmin
  session?: any
}

const Login = (props: LoginType) => {
  const { whichAdmin, session } = props
  const router = useRouter()

  if (session) {
    router.push('./')
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const cbUrl =
      whichAdmin === WhichAdmin.SUPER
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/super`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`
    await signIn('google', {
      callbackUrl: cbUrl,
    })
  }

  return (
    <form
      data-testid="Login"
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="text-base-color border border-black w-full bg-transparent focus:outline-none rounded-md text-lg px-5 py-2.5 pl-14 pr-14 text-center inline-flex items-center justify-between"
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          className="mr-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.06 12.25C23.06 11.47 22.99 10.72 22.86 10H12.5V14.26H18.42C18.16 15.63 17.38 16.79 16.21 17.57V20.34H19.78C21.86 18.42 23.06 15.6 23.06 12.25Z"
            fill="#4285F4"
          />
          <path
            d="M12.5002 23C15.4702 23 17.9602 22.02 19.7802 20.34L16.2102 17.57C15.2302 18.23 13.9802 18.63 12.5002 18.63C9.64018 18.63 7.21018 16.7 6.34018 14.1H2.68018V16.94C4.49018 20.53 8.20018 23 12.5002 23Z"
            fill="#34A853"
          />
          <path
            d="M6.34 14.0899C6.12 13.4299 5.99 12.7299 5.99 11.9999C5.99 11.2699 6.12 10.5699 6.34 9.90995V7.06995H2.68C1.93 8.54995 1.5 10.2199 1.5 11.9999C1.5 13.7799 1.93 15.4499 2.68 16.9299L5.53 14.7099L6.34 14.0899Z"
            fill="#FBBC05"
          />
          <path
            d="M12.5002 5.38C14.1202 5.38 15.5602 5.94 16.7102 7.02L19.8602 3.87C17.9502 2.09 15.4702 1 12.5002 1C8.20018 1 4.49018 3.47 2.68018 7.07L6.34018 9.91C7.21018 7.31 9.64018 5.38 12.5002 5.38Z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>
    </form>
  )
}

export default Login
