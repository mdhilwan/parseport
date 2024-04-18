import { useEffect, useState } from 'react'

const Input = ({ value, colKey, userObject, setUserObject }) => {
  const [val, setVal] = useState(value)

  const baseClassVar =
    'border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1 text-xs'
  const classNameVar = baseClassVar + ' bg-gray-100'

  useEffect(() => {
    userObject[colKey] = val
    setUserObject(userObject)
  }, [val])

  if (typeof value === 'boolean') {
    const color = value ? 'blue' : 'red'
    const text = value ? 'Active' : 'Inactive'
    return (
      <span
        className={`bg-${color}-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full`}
      >
        {text}
      </span>
    )
  } else {
    return (
      <input
        type="text"
        aria-label="input"
        disabled
        readOnly
        className={classNameVar}
        value={val ? val : ''}
      />
    )
  }
}

export default Input
