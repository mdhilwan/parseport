import AppLanding from "./appLanding/appLanding";
import { v4 } from "uuid";
import '@/styles/global.css'
import AuthGuard from "./authGuard";
import { getServerAuthSession } from "./server/auth";


export default async function Home() {
  const authSession = await getServerAuthSession();

  return (
    <AuthGuard whichAdmin="">
      {<main>
        <AppLanding uuid={v4().replace(/-/g, '')} session={authSession}/>
      </main>}
    </AuthGuard>
  )
}
