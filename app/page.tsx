import { ControlSessionType } from '@/app/admin/shared/controls/controls'
import { WhichAdmin } from '@/app/admin/shared/login/login'
import '@/styles/global.css'
import Unauth from './admin/shared/unauth'
import { HttpActions } from './api/httpActions'
import AppLanding from './appLanding/appLanding'
import AuthGuard from './authGuard'
import { getServerAuthSession } from './server/auth'

export default async function Home() {
  const authSession =
    (await getServerAuthSession()) as unknown as ControlSessionType

  if (!authSession) {
    return <Unauth />
  }
  const userDetail = await HttpActions.GetUserByEmail(authSession.user.email)

  return (
    <AuthGuard whichAdmin={WhichAdmin.NONE}>
      {
        <main>
          <AppLanding
            uuid={authSession?.sessionId}
            session={authSession}
            user={userDetail}
          />
        </main>
      }
    </AuthGuard>
  )
}
