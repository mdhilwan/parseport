'use client'

import { ControlSessionType } from '@/app/admin/shared/controls/controls'
import Input from '@/app/admin/shared/input'
import { HttpActions } from '@/app/api/httpActions'
import utils from '@/app/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type DeActivateButtonType = {
  user: any
  currUser: string
  setUser: Function
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
      className="text-slate-700 bg-slate-100 hover:bg-red-800 hover:text-slate-50 hover:border-red-900 font-light rounded-e text-xs px-1.5 py-0.5 border border-slate-200"
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
      className="text-slate-700 bg-slate-100 hover:bg-red-800 hover:text-slate-50 hover:border-red-900 font-light rounded-s text-xs px-1.5 py-0.5 border border-slate-200"
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
      {Object.entries(user).map(([colKey, value], colIndex) => {
        const thisKey = utils.Rand8digit()
        if (colIndex === 0) {
          return ''
        } else if (colIndex === 1) {
          return (
            <th
              key={thisKey}
              scope="row"
              className="font-medium text-gray-900 whitespace-nowrap"
            >
              <Input
                value={value as any}
                colKey={colKey}
                userObject={userObject}
                setUserObject={setUser}
              />
            </th>
          )
        } else {
          return (
            <td key={thisKey} className="text-center">
              <Input
                value={value as any}
                colKey={colKey}
                userObject={userObject}
                setUserObject={setUser}
              />
            </td>
          )
        }
      })}
    </tr>
  )
}

export default Row
