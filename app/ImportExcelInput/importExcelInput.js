import { State } from '@/app/enums/state'
import { setExcelImportData, setMrzStateDropZoneClass } from '@/app/slice/slice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as XLSX from 'xlsx'
import { ImportExcelError } from '@/app/ImportExcelInput/importExcelError'
import { ImportExcelPreview } from '@/app/ImportExcelInput/importExcelPreview'
import { TableLabelKeys, TableLabelValues } from '@/app/parsedTable/parsedTable'
import moment from 'moment'

const reformatSheetJson = (jsonDataObj) => {
  return jsonDataObj.map((o) => {
    TableLabelKeys.forEach((key, keyIndex) => {
      delete Object.assign(o, {
        [key]: o[TableLabelValues[keyIndex]] || o[key],
      })[TableLabelValues[keyIndex] || o[key]]
    })
    o["birthDate"] = moment.utc(o["birthDate"], "DD-MM-YYYY").format("yyyy-MM-DD")
    o["expirationDate"] = moment.utc(o["expirationDate"], "DD-MM-YYYY").format("yyyy-MM-DD")
    return o
  })
}

const ImportExcelInput = () => {
  const { mrzStateDropZoneClass, scannedData } = useSelector((state) => state.mrzStore)
  const [excelError, setExcelError] = useState(null)
  const dispatch = useDispatch()

  const handleFileRead = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils
        .sheet_to_json(sheet, { header: 1 })
        .filter((row) => row.length > 0)

      const jsonDataObj = reformatSheetJson(XLSX.utils.sheet_to_json(sheet))

      if (jsonData.length > 1) {
        dispatch(
          setExcelImportData({
            table: jsonData,
            obj: jsonDataObj,
          })
        )
      } else {
        setExcelError(State.ERROR)
      }
    }

    reader.readAsArrayBuffer(file)
  }

  const dragOverHandler = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(setMrzStateDropZoneClass('bg-blue-100'))
  }

  const dropHandler = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    handleFileRead({
      target: {
        files: evt.dataTransfer.files,
      },
    })
  }

  const dragEndHandler = () => {
    setTimeout(() => {
      dispatch(setMrzStateDropZoneClass('bg-white'))
    }, 1000)
  }

  return (
    <>
      <div
        className={`w-full border p-12 mt-5 rounded-md hover:bg-blue-100 hover:cursor-pointer ${mrzStateDropZoneClass}`}
        onDragOver={(evt) => dragOverHandler(evt)}
        onDragLeave={() => dragEndHandler()}
        onDrop={(evt) => dropHandler(evt)}
      >
        <label className="hover:cursor-pointer">
          Drag and Drop an excel file here or browse for the file
          <input
            type="file"
            multiple={false}
            id="import-excel"
            name="import-excel"
            className="hidden"
            accept="csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(e) => handleFileRead(e)}
          />
        </label>
      </div>

      <ImportExcelError excelError={excelError} setExcelError={setExcelError} />
      <ImportExcelPreview />
    </>
  )
}

export default ImportExcelInput
