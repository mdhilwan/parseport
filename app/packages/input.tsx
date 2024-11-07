'use client'

import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react'

type InputType = {
  type?: HTMLInputTypeAttribute
  classOverwrite?: string
}

const Input = (props: InputType) => {
  const { type = 'text', classOverwrite } = props

  const [value, setValue] = useState('')

  const baseClassName =
    'border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 py-1 w-full h-8 whitespace-nowrap'

  return (
    <input
      className={`${baseClassName} ${classOverwrite ? classOverwrite : ''}`}
      type={type}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.currentTarget.value)
      }
    />
  )
}

export default Input
