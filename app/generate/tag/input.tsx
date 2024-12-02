import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

export type BaseInputType = {
  id: string
  placeholder: string
  disabled?: boolean
  readonly?: boolean
  classNameOverwrite?: string
  min?: string
  type?: HTMLInputTypeAttribute
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const Input = (props: BaseInputType) => {
  const {
    value,
    id,
    placeholder,
    min,
    disabled = false,
    readonly = false,
    classNameOverwrite = '',
    type = 'text',
    onChange = () => {},
  } = props

  let isValue = value
  let doChange = onChange

  const baseClassName =
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'

  return (
    <input
      className={`${baseClassName} ${classNameOverwrite}`}
      id={id}
      min={min}
      type={type}
      disabled={disabled}
      readOnly={readonly}
      placeholder={placeholder}
      value={isValue}
      onChange={(e) => doChange(e)}
    />
  )
}
