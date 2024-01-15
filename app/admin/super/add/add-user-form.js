"use client"

import { useState } from "react"
import EmailInput from "./email-input"
import utils from "@/app/utils"
import PhoneInput from "./phone-input";

const AddUserForm = () => {

    const [emailList, setEmailList] = useState([''])
    const [company, setCompany] = useState({
        name: "",
        address: "",
        number: ""
    })

    return (
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Email(s)</label>
                {
                    emailList.map((e, i) => (
                        <EmailInput key={utils.Rand8digit()}
                            index={i}
                            company={company}
                            email={e}
                            emailList={emailList}
                            setEmailList={setEmailList}
                            setValidForm={setValidForm} />
                    ))
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
                <input type="text" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required
                    value={company.name}
                    onChange={(e) => {
                        let newCompany = { ...company }
                        newCompany.name = e.target.value
                        setCompany(newCompany)
                    }} />
            </div>
            <div className="mb-5">
                <label htmlFor="companyAddress" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Company Address</label>
                <input type="text" id="companyAddress" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required
                    value={company.address}
                    onChange={(e) => {
                        let newCompany = { ...company }
                        newCompany.address = e.target.value
                        setCompany(newCompany)
                    }} />
            </div>

            <PhoneInput company={company} setCompany={setCompany}/>

            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                onClick={() => {
                    console.log(emailList)
                    console.table({
                        company: company
                    })
                }}>
                Register new account(s)
            </button>
        </form>
    )
}

export default AddUserForm