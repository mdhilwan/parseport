import { setTourPackageDetails } from '@/app/slice/slice'
import get from 'lodash/get'
import set from 'lodash/set'
import { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { useDispatch } from 'react-redux'

export type BaseInputType = {
  id: string
  placeholder: string
  disabled?: boolean
  readonly?: boolean
  classNameOverwrite?: string
  min?: string
  type?: HTMLInputTypeAttribute
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface IInputTypeValue extends BaseInputType {
  value: string
  itemKey?: string
  formObj?: any
}

export interface IInputTypeKey extends BaseInputType {
  value?: string
  itemKey: string
  formObj: any
}

export const Input = (props: IInputTypeValue | IInputTypeKey) => {
  const {
    value,
    id,
    itemKey,
    formObj,
    placeholder,
    min,
    disabled = false,
    readonly = false,
    classNameOverwrite = '',
    type = 'text',
    onChange = () => {},
  } = props

  const dispatch = useDispatch()

  let isValue = value
  let doChange = onChange

  if (itemKey && formObj) {
    isValue = get(formObj, itemKey)

    doChange = (e) => {
      set(formObj, itemKey, e.target.value)
      dispatch(setTourPackageDetails(formObj))
    }
  }

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
