'use client'

import download from 'downloadjs'
import Input from './input'
import { useSelector } from 'react-redux'
import GenerateVisa from '../generate/visa'

const tableLabelMap = {
  issuingState: 'Issuing State',
  firstName: 'First Name',
  lastName: 'Last Name',
  documentNumber: 'Passport Number',
  nationality: 'Nationality',
  birthDate: 'Date of Birth',
  sex: 'Sex',
  expirationDate: 'Date of Expiry',
  personalNumber: 'IC Number',
}

const tableLabelKeys = Object.keys(tableLabelMap)

const ParsedTable = () => {
  const { scannedData } = useSelector((state) => state.mrzStore)

  const filtered = scannedData.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter((r) => tableLabelKeys.includes(r[0]))
    )
  )

  const tableLabel = filtered[0]
    ? Object.keys(filtered[0]).map((k) => tableLabelMap[k])
    : []

  const baseLabelClassName = 'pe-3 font-bold whitespace-nowrap'

  return (
    <>
      {scannedData.length > 0 ? (
        <table className="table table-auto w-full">
          <thead>
            <tr>
              {tableLabel.map((label, labelIndex) => {
                const key = `${label}-${labelIndex}`.replaceAll(/ /g, '')
                const labelClassName = ['First Name', 'Last Name'].includes(
                  label
                )
                  ? baseLabelClassName + ' w-72'
                  : baseLabelClassName + ' w-28'
                return (
                  <td key={key} className={labelClassName}>
                    {label}
                  </td>
                )
              })}
              <td></td>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(row).map((col, colIndex) => {
                  return (
                    <td key={colIndex} className="py-1">
                      <Input
                        val={col[1]}
                        onChange={(evt) => (row[col[0]] = evt.target.value)}
                      />
                    </td>
                  )
                })}
                <td>
                  <GenerateVisa row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <div className="text-slate-400 text-2xl">Awaiting scans...</div>
          <div className="text-slate-500">
            Use your phone that you have linked this computer with to scan your
            document
          </div>
        </div>
      )}
    </>
  )
}

export default ParsedTable
