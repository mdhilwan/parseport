'use client'

import { ControlSessionType } from '@/app/admin/shared/controls/controls'
import Input from '@/app/admin/shared/input'
import { HttpActions } from '@/app/api/httpActions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ClearButtonType = {
  user: any
}

type DeActivateButtonType = {
  user: any
  currUser: string
  setUser: Function
}

const baseButtonClass =
  'text-slate-700 bg-slate-100 hover:bg-red-800 hover:text-slate-50 hover:border-red-900 font-light text-xs px-1.5 py-0.5 border border-slate-200'

const ClearButton = (props: ClearButtonType) => {
  const { user } = props

  return (
    <button
      type="button"
      className={`${baseButtonClass} rounded`}
      onClick={() => {
        HttpActions.ClearScanCount(user.useremail).then(() => location.reload())
      }}
    >
      Clear
    </button>
  )
}

const DeActivateButton = (props: DeActivateButtonType) => {
  const { user, currUser, setUser } = props
  const [usr, setUsr] = useState(user)

  if (currUser === user.useremail) {
    return <></>
  }

  return (
    <button
      type="button"
      className={`${baseButtonClass} rounded-e`}
      onClick={async () => {
        const res = usr.active
          ? await HttpActions.DeactivateUser(usr.useremail)
          : await HttpActions.ActivateUser(usr.useremail)
        if (res) {
          const newUser = { ...usr, active: !usr.active }
          setUsr(newUser)
          setUser(newUser)
        }
      }}
    >
      {usr.active ? 'Deactivate' : 'Activate'}
    </button>
  )
}

type DeleteButtonType = {
  user: any
  currUser: string
}

const DeleteButton = (props: DeleteButtonType) => {
  const { user, currUser } = props
  const router = useRouter()

  if (currUser === user.useremail) {
    return <></>
  }

  return (
    <button
      type="button"
      className={`${baseButtonClass} rounded-s`}
      onClick={async () => {
        const res = await HttpActions.DeleteUser(user.useremail)
        if (res) {
          router.refresh()
        }
      }}
    >
      Del
    </button>
  )
}

type RowType = {
  userIndex: number
  userObject: any
  session: ControlSessionType
}

const Row = (props: RowType) => {
  const { userIndex, userObject, session } = props
  const [user, setUser] = useState(userObject)
  const {
    user: { email },
  } = session

  return (
    <tr key={userIndex} className="bg-white border-b border-gray-200">
      <td className="whitespace-nowrap">
        <DeleteButton user={userObject} currUser={email} />
        <DeActivateButton
          user={userObject}
          currUser={email}
          setUser={setUser}
        />
      </td>
      <td className="text-center">
        <Input
          value={user.useremail}
          colKey={'useremail'}
          userObject={userObject}
          setUserObject={setUser}
        />
      </td>
      <td className="text-center">
        <Input
          value={user.company}
          colKey={'company'}
          userObject={userObject}
          setUserObject={setUser}
        />
      </td>
      <td className="text-center">
        <Input
          value={user.companynumber}
          colKey={'companynumber'}
          userObject={userObject}
          setUserObject={setUser}
        />
      </td>
      <td className="text-center">
        <Input
          value={user.companyaddress}
          colKey={'companyaddress'}
          userObject={userObject}
          setUserObject={setUser}
        />
      </td>
      <td>
        <span className="px-3">{user.scancount}</span>
        {user.scancount > 0 ? <ClearButton user={user} /> : <></>}
      </td>
      <td>
        <Input
          value={user.active}
          colKey={'active'}
          userObject={userObject}
          setUserObject={setUser}
        />
      </td>
    </tr>
  )
}

export default Row
