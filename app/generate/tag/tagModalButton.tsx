import { ReactElement } from 'react'

type TagModalButtonType = {
  children: ReactElement | string
  disabled?: boolean
  classNameOverwrite?: string
  onClick?: () => void
}

export const TagModalButton = (tagModalButtonProps: TagModalButtonType) => {
  const {
    children,
    classNameOverwrite = '',
    disabled = false,
    onClick = () => console.log('click TagModalButton'),
  } = tagModalButtonProps
  const baseClassName = `className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto ms-3 last:ms-0 ${classNameOverwrite}`
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={baseClassName}
    >
      {children}
    </button>
  )
}
