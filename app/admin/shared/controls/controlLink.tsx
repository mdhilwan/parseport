import { MouseEventHandler } from 'react'

export type ControlLinkType = {
  text: string
  url?: string
  clickEvent?: MouseEventHandler
  color?: string
  extraClass?: string
}

const ControlLink = (props: ControlLinkType) => {
  const { text, url, clickEvent, color = 'slate', extraClass } = props

  const baseProps = {
    'data-testid': 'ControlLink',
    type: 'button',
    className: `text-${color}-800 bg-${color}-50 hover:bg-${color}-400 hover:cursor-pointer hover:border-${color}-500 font-light rounded-none first-of-type:rounded-s last-of-type:rounded-e border-e-0 last-of-type:border-e text-xs px-1.5 py-0.5 border border-${color}-400 ${extraClass}`,
  }

  if (url) {
    return (
      <a {...baseProps} href={url}>
        {text}
      </a>
    )
  } else if (clickEvent) {
    return (
      <a {...baseProps} onClick={clickEvent}>
        Logout
      </a>
    )
  }
}

export default ControlLink
