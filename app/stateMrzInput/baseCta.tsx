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

  switch (type) {
    case CtaType.Button:
      return (
        <button
          onClick={onClick}
          className={`${colStart ? `col-start-${colStart}` : ''} col-span-${colSpan} p-4 border border-gray-400 rounded-xl text-center transition-all hover:border-gray-600 hover:shadow-md hover:cursor-pointer ${modifierClass}`}
        >
          {children}
        </button>
      )
    case CtaType.Div:
      return (
        <div
          onClick={onClick}
          className={`${colStart ? `col-start-${colStart}` : ''} col-span-${colSpan} p-4 border border-gray-400 rounded-xl text-center transition-all hover:border-gray-600 hover:shadow-md ${modifierClass}`}
        >
          {children}
        </div>
      )
  }
}
