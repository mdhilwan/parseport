import '@/styles/global.css'
import { HttpActions } from './api/httpActions'
import AppLanding from './appLanding/appLanding'
import AuthGuard from './authGuard'
import { getServerAuthSession } from './server/auth'

export default async function Home() {
  const authSession = await getServerAuthSession()
  const userDetail = await HttpActions.GetUserByEmail(authSession.user.email)

  return (
    <AuthGuard whichAdmin="">
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
