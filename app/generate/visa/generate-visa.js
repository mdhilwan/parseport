import download from 'downloadjs'
import { useSelector } from 'react-redux'

const GenerateVisa = ({ row }) => {
  const state = useSelector((state) => state.mrzStore)

  const generateVisa = async (visaData) => {
    const doGenerate = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/generate-visa`,
      {
        body: JSON.stringify({ data: visaData }),
        headers: new Headers({ 'content-type': 'application/json' }),
        method: 'POST',
      }
    )
    const generateRes = await doGenerate.blob()
    download(generateRes, visaData.documentNumber)
  }

  return (
    <button
      type="button"
      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md text-xs px-2 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      onClick={() => generateVisa(row)}
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
      Visa
    </button>
  )
}

export default GenerateVisa
