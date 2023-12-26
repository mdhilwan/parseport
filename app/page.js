import AppLanding from "./appLanding/appLanding";
import { v4 } from "uuid";
import '../styles/global.css'

export default function Home() {
  return (
    <main>
      <AppLanding uuid={v4().replace(/-/g, '')}/>
    </main>
  )
}
