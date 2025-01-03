import { ReactElement } from 'react'

export enum CtaType {
  Button = 'button',
  Div = 'div',
}

type BaseCta = {
  type: CtaType
  colSpan: number
  children: ReactElement | string
  onClick?: () => void
  modifierClass?: string
  colStart?: number
}

export const BaseCta = (prop: BaseCta) => {
  const {
    type,
    colSpan,
    children,
    onClick = undefined,
    colStart = undefined,
    modifierClass = undefined,
  } = prop

  const baseProp: { className: string; onClick?: () => void } = {
    className: `col-span-${colSpan} p-4 border border-gray-400 rounded-xl text-center transition-all hover:border-gray-600 hover:shadow-md`,
  }

  if (colStart) {
    baseProp.className = `col-start-${colStart} ${baseProp.className}`
  }

  if (modifierClass) {
    baseProp.className = `${baseProp.className} ${modifierClass}`
  }

  if (onClick) {
    baseProp.onClick = onClick
  }

  switch (type) {
    case CtaType.Button:
      baseProp.className += ' hover:cursor-pointer'
      return <button {...baseProp}>{children}</button>
    case CtaType.Div:
      return <div {...baseProp}>{children}</div>
  }
}
