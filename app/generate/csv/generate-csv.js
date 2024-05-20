import { HttpActions } from '@/app/api/httpActions'
import { saveAs } from 'file-saver'
import { useSelector } from 'react-redux'
import * as XLXS from 'xlsx'

const GenerateCsv = ({ user }) => {
  const { scannedData } = useSelector((state) => state.mrzStore)

  const doGenerateCsv = async () => {
    const formatDate = (dat) => {
      dat.birthDate = dat.birthDate.split('-').reverse().join('-')
      dat.expirationDate = dat.expirationDate.split('-').reverse().join('-')
      return dat
    }
    const renameKey = (dat) => {
      dat['Date of Birth'] = dat.birthDate
      dat['Date of Expiry'] = dat.expirationDate
      dat['Passport Number'] = dat.documentNumber
      dat['First Name'] = dat.firstName
      dat['Last Name'] = dat.lastName
      dat['Issuing State'] = dat.issuingState
      dat['Nationality'] = dat.nationality

      delete dat.documentNumber
      delete dat.birthDate
      delete dat.expirationDate
      delete dat.lastName
      delete dat.firstName
      delete dat.issuingState

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
    const cleanedData = JSON.parse(JSON.stringify(scannedData)).map((dat) =>
      renameKey(formatDate(dat))
    )

    await HttpActions.DoExcel({
      userEmail: user.email,
      company: user.res.result.company,
    })

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
    saveAs(blob, 'exported-data.xlsx')
  }

  return (
    <button
      type="button"
      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      onClick={() => doGenerateCsv()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        dataslot="icon"
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
  )
}

export default GenerateCsv
