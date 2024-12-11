'use client'

import { WhichAdmin } from '@/app/enums/whichAdmin'
import Logo from '@/app/logo'
import { LogoSize } from '@/app/logo/logo'
import { GetType } from '@/app/server/allowed'
import StatePhoneConnection from '@/app/statePhoneConnection'
import { signOut } from 'next-auth/react'
import CtrlLink from './ctrlLink'

export type UserType = {
  email: string
  name?: string
  image?: string
  res: {
    result: {
      company: string
      demo: boolean
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

type SuperLinkType = {
  whichAdmin: WhichAdmin
  email: string
}

const CtrlLinkSuper = ({ whichAdmin, email }: SuperLinkType) => {
  return (
    <>
      {whichAdmin === WhichAdmin.SUPER ||
      GetType(email) === WhichAdmin.SUPER ? (
        <CtrlLink
          text={'Super'}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/super`}
        />
      ) : (
        <></>
      )}
    </>
  )
}

const CtrlLinkAddAcc = ({ whichAdmin, email }: SuperLinkType) => {
  return (
    <>
      {whichAdmin === WhichAdmin.SUPER ||
      GetType(email) === WhichAdmin.SUPER ? (
        <CtrlLink
          text={'Add Account'}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/super/add`}
        />
      ) : (
        <></>
      )}
    </>
  )
}

const Controls = (props: ControlsType) => {
  const {
    whichAdmin = WhichAdmin.ADMIN,
    session: {
      user: { email },
    },
  } = props

  const cbUrl =
    whichAdmin === WhichAdmin.SUPER
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/super/login`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`

  return (
    <div
      data-testid="Controls"
      className="sticky top-0 bg-white flex align-middle px-6 border-b border-b-gray-300"
    >
      <div className="flex flex-grow items-center">
        <Logo size={LogoSize.small} className={'me-12'} />
        <CtrlLink text={'Passports'} url={'/'} />
        <CtrlLink text={'Settings'} url={'/admin'} />
        <CtrlLinkSuper email={email} whichAdmin={whichAdmin} />
        <CtrlLinkAddAcc whichAdmin={whichAdmin} email={email} />
      </div>
      <div className="shrink">
        <StatePhoneConnection />
        <CtrlLink
          text={'Logout'}
          clickEvent={async () => await signOut({ callbackUrl: cbUrl })}
        />
      </div>
    </div>
  )
}

export default Controls
