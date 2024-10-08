import { useEffect, useState } from 'react'
import isMobilePhone from 'validator/lib/isMobilePhone'

type PhoneInputType = {
  company: {
    number: string
  }
  setCompany: Function
}

const PhoneInput = (props: PhoneInputType) => {
  const { company, setCompany } = props
  const defaultClassStyle =
    'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2'
  const [valid, setValid] = useState(true)
  const [classStyle, setClassStyle] = useState(defaultClassStyle)

  const validatePhone = (value: string) => {
    if (isMobilePhone(value.replaceAll(/ /g, ''))) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  useEffect(() => {
    if (valid) {
      setClassStyle(defaultClassStyle)
    } else {
      setClassStyle(
        'shadow-sm bg-red-50 border border-red-300 text-red-900 text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full py-1 px-2'
      )
    }
  }, [valid])

  return (
    <>
      <div className="mb-5">
        <label
          htmlFor="companyNumber"
          className="block mb-2 text-xs font-medium text-gray-900 uppercase"
        >
          Number
        </label>
        <input
          type="tel"
          id="companyNumber"
          className={classStyle}
          placeholder="Company Co Pte Ltd"
          required
          value={company.number}
          onFocus={(e) => {
            validatePhone(e.target.value)
          }}
          onChange={(e) => {
            validatePhone(e.target.value)
            let newCompany = { ...company }
            newCompany.number = e.target.value
            setCompany(newCompany)
          }}
        />
      </div>
    </>
  )
}

export default PhoneInput
