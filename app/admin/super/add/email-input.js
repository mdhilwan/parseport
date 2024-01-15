import { useEffect, useState } from "react"
import isEmail from 'validator/lib/isEmail';

const EmailInput = ({ index, company, email, emailList, setEmailList }) => {
    const defaultClassStyle = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 mb-4 last-of-type:mb-0"
    const [thisEmail, setThisEmail] = useState(email)
    const [valid, setValid] = useState(true)
    const [classStyle, setClassStyle] = useState(defaultClassStyle)

    useEffect(() => {
        if (valid) {
            setClassStyle(defaultClassStyle)
        } else {
            setClassStyle("shadow-sm bg-red-50 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full py-1 px-2 mb-4 last-of-type:mb-0")
        }
    }, [valid])

    const validateEmail = (value) => {
        if (!isEmail(value)) {
            setValid(false)
        } else {
            setValid(true)
        }
    }

    return (
        <input type="email" id="email" className={classStyle} placeholder="name@flowbite.com" required
            value={thisEmail}
            onFocus={(e) => validateEmail(e.target.value)}
            onChange={(e) => {
                validateEmail(e.target.value)
                setThisEmail(e.target.value)
            }}
            onBlur={() => {
                const newEmailList = [...emailList]
                newEmailList[index] = thisEmail
                setEmailList(newEmailList)
            }} />
    )
}

export default EmailInput