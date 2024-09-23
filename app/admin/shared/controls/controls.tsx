'use client'

import { WhichAdmin } from '@/app/enums/whichAdmin'
import { GetType } from '@/app/server/allowed'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import ControlLink from './controlLink'

export type UserType = {
  email: string
  name?: string
  image?: string
  res?: {
    result?: {
      company: string
    }
  }
}

export type ControlSessionType = {
  sessionId: any
  user: UserType
}

export type ControlsType = {
  whichAdmin?: WhichAdmin
  session: ControlSessionType
}

const Controls = (props: ControlsType) => {
  const {
    whichAdmin = WhichAdmin.ADMIN,
    session: {
      user: { name, email, image },
    },
  } = props

  const cbUrl =
    whichAdmin === WhichAdmin.SUPER
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/super/login`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`

  return (
    <div
      data-testid="Controls"
      className="sticky top-0 bg-slate-300 py-2 flex ps-4"
    >
      <Image
        src={image as string}
        width="24"
        height="24"
        alt={name as string}
        className="rounded-full overflow-hidden flex-none me-4"
      />

      <ControlLink text={'Home'} url={'/'} />
      <ControlLink text={'Settings'} url={'/admin'} />
      {whichAdmin === WhichAdmin.SUPER ||
      GetType(email) === WhichAdmin.SUPER ? (
        <ControlLink
          text={'Super'}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/super`}
        />
      ) : (
        <></>
      )}
      <ControlLink
        text={'Logout'}
        clickEvent={async () => await signOut({ callbackUrl: cbUrl })}
        extraClass={'rounded-e border-e'}
      />

      <span className="flex">
        {whichAdmin === WhichAdmin.SUPER ||
        GetType(email) === WhichAdmin.SUPER ? (
          <ControlLink
            text={'Add Account'}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/super/add`}
            color="yellow"
            extraClass="ms-4 border-s rounded-s"
          />
        ) : (
          <></>
        )}
      </span>
    </div>
  )
}

export default Controls
