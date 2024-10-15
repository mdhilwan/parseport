import { useEffect, useState } from 'react'

type InputType = {
  value: string | boolean
  colKey: string
  userObject: any
  setUserObject: Function
}

const Input = (props: InputType) => {
  const { value, colKey, userObject, setUserObject } = props
  const [val] = useState<string | boolean>(value)

  const baseClassVar =
    'border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1 text-xs'
  const classNameVar = baseClassVar + ' bg-gray-100'

  useEffect(() => {
    userObject[colKey] = val
    setUserObject(userObject)
  }, [val, colKey, userObject, setUserObject])

  if (typeof value === 'boolean') {
    return value ? '✅' : ''
  } else {
    return (
      <input
        type="text"
        aria-label="input"
        disabled
        readOnly
        className={classNameVar}
        value={val ? (val as string) : ''}
      />
    )
  }
}

export default Input
