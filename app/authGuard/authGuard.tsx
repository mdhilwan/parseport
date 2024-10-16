import { ControlSessionType } from '@/app/admin/shared/controls/controls'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import { GetType } from '@/app/server/allowed'
import { getServerAuthSession } from '@/app/server/auth'
import { ReactElement } from 'react'
import Unauth from '../admin/shared/unauth'
import { HttpActions } from '../api/httpActions'

type AuthGuardType = {
  children: ReactElement
  whichAdmin?: WhichAdmin
}

const AuthGuard = async (props: AuthGuardType) => {
  const { children, whichAdmin = WhichAdmin.ADMIN } = props
  const authSession =
    (await getServerAuthSession()) as unknown as ControlSessionType
  if (!authSession) {
    return <Unauth whichAdmin={whichAdmin} />
  }
  const {
    user: { email },
  } = authSession
  const {
    res: { result },
  } = await HttpActions.GetUserByEmail(email)

  // Only SUPER are allowed
  if (whichAdmin === WhichAdmin.SUPER) {
    if (GetType(email) === WhichAdmin.SUPER) {
      return <>{children}</>
    } else {
      return (
        <div
          className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 w-1/2 mx-auto mt-8"
          role="alert"
        >
          <span className="font-bold">ERROR:</span> You do not have
          authorization to view this page
        </div>
      )
    }
  } else {
    // Only authenticated and active are allowed
    if (authSession && result.active) {
      return <>{children}</>
    } else if (authSession && !result.active) {
      return (
        <>
          <div
            className="bg-orange-100 w-96 mx-auto mt-8 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >
            <p className="font-bold">Account Disabled</p>
            <p>
              Your account is set to inactive. Please contact the admin to
              switch it back to active.
            </p>
          </div>
        </>
      )
    }
  }
  return <Unauth whichAdmin={whichAdmin} />
}

export default AuthGuard
