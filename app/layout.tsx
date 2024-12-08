import { GoogleAnalytics } from '@next/third-parties/google'
import { Cabin } from 'next/font/google'
import { ReactElement } from 'react'
import './global.scss'
const cabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Passport to Visa',
  description:
    'Connect your phone to your computer, use your phone and parse a passport MRZ and send it to the linked computer.',
}

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-T3JNMDMTCV" />
      <body className={cabin.className}>{children}</body>
    </html>
  )
}
