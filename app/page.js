import AppLanding from "./appLanding/appLanding";
import { v4 } from "uuid";
import '../styles/global.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppLanding uuid={v4().replace(/-/g, '')}/>
    </main>
  )
}
