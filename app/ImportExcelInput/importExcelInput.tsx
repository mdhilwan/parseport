import { ImportExcelError } from '@/app/ImportExcelInput/importExcelError'
import { ImportExcelPreview } from '@/app/ImportExcelInput/importExcelPreview'
import { State } from '@/app/enums/state'
import { TableLabelKeys, TableLabelValues } from '@/app/parsedTable/parsedTable'
import {
  revertMrzStateDropZoneClass,
  setExcelFile,
  setExcelImportData,
  setMrzStateDropZoneClass,
} from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import moment from 'moment'
import { ChangeEvent, DragEvent, useState } from 'react'
import * as XLSX from 'xlsx'

const reformatSheetJson = (jsonDataObj: any[]) => {
  return jsonDataObj.map((o) => {
    TableLabelKeys.forEach((key, keyIndex) => {
      delete Object.assign(o, {
        [key]: o[TableLabelValues[keyIndex]] || o[key],
      })[TableLabelValues[keyIndex] || o[key]]
    })
    o['birthDate'] = moment
      .utc(o['birthDate'], 'DD-MM-YYYY')
      .format('yyyy-MM-DD')
    o['expirationDate'] = moment
      .utc(o['expirationDate'], 'DD-MM-YYYY')
      .format('yyyy-MM-DD')
    return o
  })
}

const ImportExcelInput = () => {
  const { mrzStateDropZoneClass, excelFile } = useAppSelector(
    (state) => state.mrzStore
  )
  const [excelError, setExcelError] = useState<State | null>(null)
  const dispatch = useAppDispatch()

  const doHandleFileRead = (file: any) => {
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<any>) => {
      if (!event.target || !event.target.result) {
        return
      }
      if (Number(event.target.result?.byteLength) >= 10000000) {
        return alert('File size too big. Make sure file size is less than 10mb')
      }
      const data = new Uint8Array(event.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils
        .sheet_to_json(sheet, { header: 1 })
        .filter((row: any) => row.length > 0)

      const jsonDataObj = reformatSheetJson(XLSX.utils.sheet_to_json(sheet))
      const labelCol = jsonData[0]

      if (
        !TableLabelValues.every((key) =>
          (labelCol as any)
            .map((col: string) => col.toUpperCase())
            .includes(key.toUpperCase())
        )
      ) {
        return alert(
          'Excel file is not matching allowed format. Please reference the sample format provided.'
        )
      }

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

      dispatch(setExcelFile(''))
    }

    reader.readAsArrayBuffer(file)
  }

  const handleFileRead = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) {
      return
    }
    doHandleFileRead(e.target.files[0])
  }

  if (excelFile) {
    doHandleFileRead(excelFile)
  }

  const dragOverHandler = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(setMrzStateDropZoneClass('bg-red-100'))
  }

  const dropHandler = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(setExcelFile(evt.dataTransfer.files[0]))
  }

  const dragEndHandler = () => {
    setTimeout(() => {
      dispatch(revertMrzStateDropZoneClass())
    }, 1000)
  }

  return (
    <>
      <ImportExcelPreview />
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

      <ImportExcelError
        excelError={excelError as State}
        setExcelError={setExcelError}
      />
    </>
  )
}

export default ImportExcelInput
