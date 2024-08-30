import { GoogleAnalytics } from '@next/third-parties/google'
import { Open_Sans } from 'next/font/google'
import { ReactElement } from 'react'

const googleFont = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
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
      <body className={googleFont.className}>{children}</body>
    </html>
  )
}
