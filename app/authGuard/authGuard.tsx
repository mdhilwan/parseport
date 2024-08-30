import { ControlSessionType } from '@/app/admin/shared/controls/controls'
import { WhichAdmin } from '@/app/admin/shared/login/login'
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
            Your account is set to inactive. Please contact the admin to switch
            it back to active.
          </p>
        </div>
      </>
    )
  }
  return <Unauth whichAdmin={whichAdmin} />
}

export default AuthGuard
