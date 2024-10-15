import { UserType } from '@/app/admin/shared/controls/controls'
import { HttpActions } from '@/app/api/httpActions'
import { maskData } from '@/app/parsedTable/input'
import { useAppSelector } from '@/app/store'
import { saveAs } from 'file-saver'
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
  user: UserType,
  userIsDemo: boolean
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

  window.gtag('event', 'generate_excel', { email: user.email })

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
  saveAs(blob, 'exported-data.xlsx')
}

const GenerateCsv = ({ user }: { user: UserType }) => {
  const { scannedData, userIsDemo } = useAppSelector((state) => state.mrzStore)

  return scannedData.length > 0 ? (
    <button
      type="button"
      className="border focus:outline-none font-medium rounded-md text-xs px-2 py-1 text-center inline-flex items-center focus:ring-gray-600 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
      onClick={() => doGenerateCsv(scannedData, user, userIsDemo)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
        />
      </svg>
      Download Excel
    </button>
  ) : (
    <></>
  )
}

export default GenerateCsv
