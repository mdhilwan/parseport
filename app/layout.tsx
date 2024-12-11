import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'
import './global.scss'
const inter = Inter({
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
