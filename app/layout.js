import { Open_Sans } from 'next/font/google'

const googleFont = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800']
})

export const metadata = {
  title: 'ParsePort',
  description: 'Connect your phone to your computer, use your phone and parse a passport MRZ and send it to the linked computer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={googleFont.className}>{children}</body>
    </html>
  )
}
