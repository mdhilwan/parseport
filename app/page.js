import QrCode from "./qrcode/qrcode";
import { v4 } from "uuid";
import '../styles/global.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QrCode uuid={v4().replace(/-/g, '')}/>
    </main>
  )
}
