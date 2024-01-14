"use client"

import utils from "@/app/utils"
import { useState } from "react"

const AddUserForm = () => {

    const [emailList, setEmailList] = useState([''])

    return (
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Email(s)</label>
                {
                    emailList.map(e =>
                        <input key={utils.Rand8digit()} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 mb-4 last-of-type:mb-0" placeholder="name@flowbite.com" required />
                    )
                }
                <button type="button" className="text-slate-300 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-3 py-1.5 mt-4 text-center"
                    onClick={() => {
                        let newEmailList = [...emailList]
                        newEmailList.push("")
                        setEmailList(newEmailList)
                    }}>
                    Add another email
                </button>
            </div>
            <div className="mb-5">
                <label htmlFor="company" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Company Name</label>
                <input type="text" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required />
            </div>
            <div className="mb-5">
                <label htmlFor="companyAddress" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Company Address</label>
                <input type="text" id="companyAddress" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required />
            </div>
            <div className="mb-5">
                <label htmlFor="companyNumber" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Number</label>
                <input type="tel" id="companyNumber" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center">Register new account(s)</button>
        </form>
    )
}

export default AddUserForm