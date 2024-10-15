'use client'

import { Input } from '@/app/admin/super/add/input'
import { HttpActions } from '@/app/api/httpActions'
import utils from '@/app/utils'
import { useEffect, useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import EmailInput from './email-input'
import PhoneInput from './phone-input'

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
    demo: 'true',
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
        demo: company.demo,
        company: company.name,
        companyAddress: company.address,
        companyNumber: company.number,
      }))

      newAcctList.forEach(async (data) => {
        const { res, email } = await HttpActions.AddNewUser({ data })
        if (res.result) {
          const newEmailList = [...emailList]
          const savedEmail = newEmailList.find((li) => li.address === email)
          if (savedEmail) {
            savedEmail.state = 'saved'
          }
          setEmailList(newEmailList)
          checkAllDone()
        }
      })
    }
  }, [saving])

  return (
    <form className="max-w-sm mx-auto">
      <div className="my-5">
        <label
          htmlFor="email"
          className="block mb-2 text-xs font-medium text-gray-900 uppercase"
        >
          Email(s)
        </label>
        {emailList.map((e: { state: string; address: string }, i: number) => (
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
            className="text-slate-300 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-md text-sm px-3 py-1.5 mt-4 text-center"
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
            className="text-slate-200 bg-slate-400 font-medium rounded-md text-sm px-3 py-1.5 mt-4 text-center"
            disabled
          >
            Add another email
          </button>
        )}
      </div>

      <Input
        id="company"
        label="Company Name"
        placeholder="Company Co Pte Ltd"
        required
        value={company.name}
        onChange={(e: any) => {
          let newCompany = { ...company }
          newCompany.name = e.target.value
          setCompany(newCompany)
        }}
      />

      <Input
        id="companyAddress"
        label="Company Address"
        placeholder="123 Maryland Ave, Singapore"
        required
        value={company.address}
        onChange={(e: any) => {
          let newCompany = { ...company }
          newCompany.address = e.target.value
          setCompany(newCompany)
        }}
      />

      <PhoneInput company={company} setCompany={setCompany} />

      <Input
        type="select"
        option={['Demo', 'Full']}
        id="accountType"
        label="Account Type"
        placeholder=""
        onChange={(e: any) => {
          let newCompany = { ...company }
          newCompany.demo = e.target.value
          setCompany(newCompany)
        }}
      />

      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1.5 text-center"
        onClick={() => {
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
