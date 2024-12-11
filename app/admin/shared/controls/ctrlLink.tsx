import { MouseEventHandler } from 'react'

export type ControlLinkType = {
  text: string
  url?: string
  clickEvent?: MouseEventHandler
}

const CtrlLink = (props: ControlLinkType) => {
  const { text, url = '', clickEvent } = props

  const baseProps = {
    'data-testid': 'ControlLink',
    type: 'button',
    className:
      'text-base-color py-6 hover:cursor-pointer font-light text-sm mx-4 first-of-type:ms-0 last-of-type:me-0 py-0.5',
  }

  return (
    <a {...baseProps} href={url} onClick={clickEvent}>
      {text}
    </a>
  )
}

export default CtrlLink
