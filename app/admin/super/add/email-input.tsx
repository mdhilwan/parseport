import { useEffect, useState } from 'react'
import isEmail from 'validator/lib/isEmail'

type EmailType = {
  state: string
  address: string
}

type EmailInputType = {
  index: number
  email: EmailType
  emailList: EmailType[]
  setEmailList: Function
}

const EmailInput = (props: EmailInputType) => {
  const {
    index,
    email: { state, address },
    emailList,
    setEmailList,
  } = props
  const defaultClassStyle =
    'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm border-e-0 focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2'
  const [thisEmail, setThisEmail] = useState(address)
  const [valid, setValid] = useState<boolean>()
  const [classStyle, setClassStyle] = useState(defaultClassStyle)

  useEffect(() => {
    if (valid) {
      setClassStyle(defaultClassStyle)
    } else {
      setClassStyle(
        'shadow-sm bg-red-50 border border-red-300 text-gray-900 text-sm border-e-0 focus:ring-red-500 focus:border-red-500 block w-full py-1 px-2'
      )
    }
  }, [valid])

  useEffect(() => {
    validateEmail(address)
  }, [])

  const validateEmail = (value: string) => {
    if (value) {
      if (!isEmail(value)) {
        setValid(false)
      } else {
        setValid(true)
      }
    } else {
      setValid(true)
    }
  }

  return (
    <>
      <div className="flex rounded-md shadow-sm mb-4 last-of-type:mb-0">
        <span className="shadow-sm px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-300 bg-gray-50 text-sm text-gray-500">
          {state === 'saving' ? (
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 text-gray-200 animate-spin fill-green-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            ''
          )}
          {state === 'saved' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 stroke-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          ) : (
            ''
          )}
        </span>
        <input
          type="email"
          id="email"
          className={classStyle}
          placeholder="name@flowbite.com"
          required
          value={thisEmail}
          disabled={(() => state === 'saving')()}
          onFocus={(e) => validateEmail(e.target.value)}
          onChange={(e) => {
            validateEmail(e.target.value)
            setThisEmail(e.target.value)
          }}
          onBlur={(e) => {
            const newEmailList = [...emailList]
            newEmailList[index] = {
              state: state,
              address: thisEmail,
            }
            setEmailList(newEmailList)
            validateEmail(e.target.value)
          }}
        />
        <button
          type="button"
          className="inline-flex border border-gray-300 px-1.5 shadow-sm rounded-e text-sm items-center hover:bg-slate-100 hover:text-slate-500"
          onClick={() => {
            if (index !== 0 && state !== 'saving') {
              const newEmailList = [...emailList]
              newEmailList.splice(index, 1)
              setEmailList(newEmailList)
            }
          }}
        >
          {index !== 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}

export default EmailInput
