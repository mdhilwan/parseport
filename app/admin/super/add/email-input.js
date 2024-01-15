import { useState } from "react"

const EmailInput = ({index, company, email, emailList, setEmailList}) => {
    const [thisEmail, setThisEmail] = useState(email)

    return (
        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 mb-4 last-of-type:mb-0" placeholder="name@flowbite.com" required 
            value={thisEmail}
            onChange={(e) => {
                setThisEmail(e.target.value)
            }}
            onBlur={() => {
                const newEmailList = [...emailList]
                newEmailList[index] = thisEmail
                setEmailList(newEmailList)
            }}/>
    )
}

export default EmailInput