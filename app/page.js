import AppLanding from "./appLanding/appLanding";
import '@/styles/global.css'
import AuthGuard from "./authGuard";
import { getServerAuthSession } from "./server/auth";


export default async function Home() {
  const authSession = await getServerAuthSession();

  return (
    <AuthGuard whichAdmin="">
      {<main>
        <AppLanding uuid={authSession?.sessionId} session={authSession} />
      </main>}
    </AuthGuard>
  )
}
