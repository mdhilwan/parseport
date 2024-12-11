import { usePathname } from 'next/navigation'
import { MouseEventHandler } from 'react'

export type ControlLinkType = {
  text: string
  url?: string
  clickEvent?: MouseEventHandler
}

const textToUrlMap: { [key: string]: string } = {
  '/': 'Passports',
  '/admin': 'Settings',
  '/admin/super': 'Super',
  '/admin/super/add': 'Add Account',
}

const CtrlLink = (props: ControlLinkType) => {
  const { text, url = '', clickEvent } = props
  const pathname = usePathname()
  const isActive = textToUrlMap[pathname] === text

  const baseProps = {
    'data-testid': 'ControlLink',
    type: 'button',
  }

  return (
    <a
      className={`text-base-color py-6 hover:cursor-pointer font-light text-sm mx-4 first-of-type:ms-0 last-of-type:me-0 ${isActive ? 'border-b-2 border-b-black pb-[22px]' : ''}`}
      {...baseProps}
      href={url}
      onClick={clickEvent}
    >
      {text}
    </a>
  )
}

export default CtrlLink
