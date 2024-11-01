import BaseModal from '@/app/baseModal'
import ImportExcelInput from '@/app/ImportExcelInput'
import {
  setExcelFile,
  setExcelImportData,
  setScannedData,
  setShowImportExcelModal,
} from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'

const ImportExcelModal = () => {
  const { showImportExcelModal, excelImportData, scannedData } = useAppSelector(
    (state) => state.mrzStore
  )
  const dispatch = useAppDispatch()

  return showImportExcelModal ? (
    <BaseModal
      header={<>Import Excel</>}
      content={
        <>
          <p>
            Excel file should
            <a
              className="text-blue-600 p-1 rounded-md hover:cursor-pointer hover:bg-blue-100"
              target="_blank"
              href="./sample-exported-data.xlsx"
            >
              match this sample format
            </a>{' '}
            else it will not be able to format them correctly.
          </p>
          <ImportExcelInput />
        </>
      }
      button={
        <>
          {excelImportData.table?.length > 0 ? (
            <button
              className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-600 sm:ms-3 sm:mt-0 sm:w-auto"
              type="button"
              onClick={() => {
                dispatch(
                  setScannedData([...scannedData, ...excelImportData.obj])
                )
                dispatch(setExcelImportData([]))
                dispatch(setShowImportExcelModal(false))
                dispatch(setExcelFile(''))
              }}
            >
              Load This File
            </button>
          ) : (
            <></>
          )}
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              dispatch(setExcelImportData([]))
              dispatch(setShowImportExcelModal(false))
              dispatch(setExcelFile(''))
            }}
          >
            Done
          </button>
        </>
      }
    />
  ) : (
    <></>
  )
}

export default ImportExcelModal
