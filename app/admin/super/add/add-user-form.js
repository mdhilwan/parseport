'use client'

import { useEffect, useState } from 'react'
import EmailInput from './email-input'
import utils from '@/app/utils'
import PhoneInput from './phone-input'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { HttpActions } from '@/app/api/httpActions'

const AddUserForm = () => {
  const newEmail = {
    state: '',
    address: '',
  }
  const [saving, setSaving] = useState(false)
  const [emailList, setEmailList] = useState([newEmail])
  const [company, setCompany] = useState({
    name: '',
    address: '',
    number: '',
  })

  const allEmailValid = () =>
    !emailList.map((e) => isEmail(e.address)).includes(false)
  const companyDetailValid = () =>
    company.name &&
    company.address &&
    isMobilePhone(company.number.replace(/\+/g, '').replace(/ /g, ''))
  const isFormValid = () => allEmailValid() && companyDetailValid()

  const checkAllDone = () => {
    const stillSaving = emailList.map((e) => e.state).includes('saving')
    if (!stillSaving) {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (saving) {
      const emailAddressList = emailList.map((e) => e.address)
      const newAcctList = emailAddressList.map((e) => ({
        userEmail: e,
        company: company.name,
        companyAddress: company.address,
        companyNumber: company.number,
      }))

      newAcctList.forEach(async (data, ind) => {
        const { res, email } = await HttpActions.AddNewUser({ data })
        if (res.result) {
          const newEmailList = [...emailList]
          const savedEmail = newEmailList.find((li) => li.address === email)
          savedEmail.state = 'saved'
          setEmailList(newEmailList)
          checkAllDone()
        }
      })
    }
  }, [saving])

  return (
    <form className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-xs font-medium text-gray-900 uppercase"
        >
          Email(s)
        </label>
        {emailList.map((e, i) => (
          <EmailInput
            key={utils.Rand8digit()}
            index={i}
            email={e}
            emailList={emailList}
            setEmailList={setEmailList}
          />
        ))}
        {!saving ? (
          <button
            type="button"
            className="text-slate-300 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-3 py-1.5 mt-4 text-center"
            onClick={() => {
              let newEmailList = [...emailList]
              newEmailList.push(newEmail)
              setEmailList(newEmailList)
            }}
          >
            Add another email
          </button>
        ) : (
          <button
            type="button"
            className="text-slate-200 bg-slate-400 font-medium rounded-lg text-sm px-3 py-1.5 mt-4 text-center"
            disabled
          >
            Add another email
          </button>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="company"
          className="block mb-2 text-xs font-medium text-gray-900 uppercase"
        >
          Company Name
        </label>
        <input
          type="text"
          id="company"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2"
          placeholder="Company Co Pte Ltd"
          required
          value={company.name}
          onChange={(e) => {
            let newCompany = { ...company }
            newCompany.name = e.target.value
            setCompany(newCompany)
          }}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="companyAddress"
          className="block mb-2 text-xs font-medium text-gray-900 uppercase"
        >
          Company Address
        </label>
        <input
          type="text"
          id="companyAddress"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2"
          placeholder="Company Co Pte Ltd"
          required
          value={company.address}
          onChange={(e) => {
            let newCompany = { ...company }
            newCompany.address = e.target.value
            setCompany(newCompany)
          }}
        />
      </div>

      <PhoneInput company={company} setCompany={setCompany} />

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
        onClick={() => {
          console.log(
            isFormValid(),
            allEmailValid(),
            companyDetailValid(),
            !saving
          )
          if (isFormValid() && !saving) {
            const newEmailList = [...emailList]
            newEmailList.forEach((e) => (e.state = 'saving'))
            setEmailList(newEmailList)
            setSaving(true)
          } else {
            console.log('Form not valid')
          }
        }}
      >
        {saving ? 'Registering...' : 'Register new account(s)'}
      </button>
    </form>
  )
}

export default AddUserForm
