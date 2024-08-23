'use client'

import { GetType } from '@/app/server/allowed'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ControlLink from './controlLink'

const Controls = ({ whichAdmin, session }) => {
  const pathName = usePathname()
  const {
    user: { name, email, image },
  } = session

  const cbUrl =
    whichAdmin === 'super'
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/super/login`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`
  return (
    <div className="sticky top-0 bg-slate-300 py-2 flex ps-4">
      <Image
        src={image}
        width="24"
        height="24"
        alt={name}
        className="rounded-full overflow-hidden flex-none me-4"
      />

      <ControlLink text={'Home'} url={'/'} />
      <ControlLink text={'Settings'} url={'/admin'} />
      {whichAdmin === 'super' || GetType(email) === 'super' ? (
        <ControlLink
          text={'Super'}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/super`}
        />
      ) : (
        ''
      )}
      <ControlLink
        text={'Logout'}
        clickEvent={async () => await signOut({ callbackUrl: cbUrl })}
        extraClass={'rounded-e border-e'}
      />

      <span className="flex">
        {whichAdmin === 'super' || GetType(email) === 'super' ? (
          <ControlLink
            text={'Add Account'}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/super/add`}
            color="yellow"
            extraClass="ms-4 border-s rounded-s"
          />
        ) : (
          ''
        )}
      </span>
    </div>
  )
}

export default Controls
