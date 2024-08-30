import { State } from '@/app/enums/state'

type ImportExcelErrorType = {
  excelError: State
  setExcelError: Function
}

const ImportExcelError = (props: ImportExcelErrorType) => {
  const { excelError, setExcelError } = props
  return (
    <>
      {excelError ? (
        <div className="rounded-md border border-red-300 text-sm p-4 mt-4 bg-red-100 text-red-800 flex items-center">
          <p className="me-4 text-left">
            There seems to be an error loading that excel file. Please check
            that it
            <a
              className="underline text-red-400 p-1 rounded-md hover:cursor-pointer hover:text-red-700"
              target="_blank"
              href="./sample-exported-data.xlsx"
            >
              meets required format.
            </a>
          </p>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#alert-2"
            aria-label="Close"
            onClick={() => setExcelError(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export { ImportExcelError }
