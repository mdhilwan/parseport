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
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center">
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Import Excel
                </h3>
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
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ImportExcelModal
