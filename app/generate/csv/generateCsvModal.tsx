import { UserType } from '@/app/admin/shared/controls/controls'
import { HttpActions } from '@/app/api/httpActions'
import BaseModal from '@/app/baseModal'
import DocumentTitle from '@/app/documentTitle'
import { maskData } from '@/app/parsedTable/input'
import { setShowNameFileModal } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { saveAs } from 'file-saver'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as XLXS from 'xlsx'

type RenameKeyType = {
  [x: string]: any
  birthDate: any
  expirationDate: any
  documentNumber?: any
  firstName?: any
  lastName?: any
  sex?: any
  issuingState?: any
  nationality?: any
  documentCode?: any
  birthDateCheckDigit?: any
  compositeCheckDigit?: any
  documentNumberCheckDigit?: any
  expirationDateCheckDigit?: any
  personalNumberCheckDigit?: any
  personalNumber?: any
}

const doGenerateCsv = async (
  scannedData: any,
  userIsDemo: boolean,
  user: UserType,
  excelFileName: string
) => {
  const formatDate = (dat: { birthDate: string; expirationDate: string }) => {
    dat.birthDate = dat.birthDate.split('-').reverse().join('-')
    dat.expirationDate = dat.expirationDate.split('-').reverse().join('-')
    return dat
  }
  const maskDataIfDemo = (dat: any) => {
    if (userIsDemo) {
      dat.birthDate = maskData(dat.birthDate)
      dat.expirationDate = maskData(dat.expirationDate)
      dat.documentNumber = maskData(dat.documentNumber)
      dat.firstName = maskData(dat.firstName)
      dat.lastName = maskData(dat.lastName)
      dat.issuingState = maskData(dat.issuingState)
      dat.personalNumber = maskData(dat.personalNumber)
      dat.nationality = maskData(dat.nationality)
      dat.sex = maskData(dat.sex)
    }
    return dat
  }
  const renameKey = (dat: RenameKeyType) => {
    dat['Date of Birth'] = dat.birthDate
    dat['Date of Expiry'] = dat.expirationDate
    dat['Passport Number'] = dat.documentNumber
    dat['First Name'] = dat.firstName
    dat['Last Name'] = dat.lastName
    dat['Issuing State'] = dat.issuingState
    dat['Nationality'] = dat.nationality
    dat['Sex'] = dat.sex

    delete dat.documentNumber
    delete dat.birthDate
    delete dat.expirationDate
    delete dat.lastName
    delete dat.firstName
    delete dat.issuingState
    delete dat.nationality
    delete dat.sex

    if (dat.documentCode) {
      delete dat.documentCode
    }
    if (dat.birthDateCheckDigit) {
      delete dat.birthDateCheckDigit
    }
    if (dat.compositeCheckDigit) {
      delete dat.compositeCheckDigit
    }
    if (dat.documentNumberCheckDigit) {
      delete dat.documentNumberCheckDigit
    }
    if (dat.expirationDateCheckDigit) {
      delete dat.expirationDateCheckDigit
    }
    if (dat.personalNumberCheckDigit) {
      delete dat.personalNumberCheckDigit
    }
    if (dat.personalNumber) {
      dat['NRIC Number'] = dat.personalNumber
      delete dat.personalNumber
    }
    return dat
  }
  const cleanedData = JSON.parse(JSON.stringify(scannedData)).map(
    (dat: { birthDate: string; expirationDate: string }) =>
      renameKey(formatDate(maskDataIfDemo(dat)))
  )

  const worksheet = XLXS.utils.json_to_sheet(cleanedData)
  const workbook = XLXS.utils.book_new()
  XLXS.utils.book_append_sheet(workbook, worksheet, 'Passport Data')
  const excelBuffer = XLXS.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  })
  await HttpActions.DoExcel({
    userEmail: user.email,
    company: user.res?.result?.company,
  })
  saveAs(blob, excelFileName + '.xlsx')
}

export const GenerateCsvModal = ({ user }: { user: UserType }) => {
  const { showNameFileModal, scannedData, userIsDemo, excelFileName } =
    useAppSelector((state) => state.mrzStore)
  const [generating, setGenerating] = useState<boolean>(false)
  const dispatch = useDispatch()

  return showNameFileModal ? (
    <BaseModal
      header={<>Download Excel</>}
      button={
        <>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-600 sm:ms-3 sm:mt-0 sm:w-auto"
            onClick={async () => {
              setGenerating(true)
              await doGenerateCsv(scannedData, userIsDemo, user, excelFileName)
              setGenerating(false)
            }}
          >
            {generating ? 'Generating.. Please wait..' : 'Download Excel'}
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              dispatch(setShowNameFileModal(false))
            }}
          >
            Done
          </button>
        </>
      }
      content={
        <DocumentTitle
          focus={true}
          extraClassName={'border-gray-300 border rounded text-gray-600'}
        />
      }
    />
  ) : (
    <></>
  )
}
