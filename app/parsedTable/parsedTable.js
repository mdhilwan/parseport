'use client'

import { useDispatch, useSelector } from 'react-redux'
import GenerateVisa from '../generate/visa'
import Input from './input'
import StateMrzInput from '@/app/stateMrzInput'
import { setParsed, setScanState } from '@/app/slice/slice'

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

const ParsedTable = ({ user }) => {
  const { scannedData, disconnected } = useSelector(
    (state) => state.mrzStore
  )
  const visaFeature = false
  const dispatch = useDispatch()
  const filtered = scannedData.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter((r) => tableLabelKeys.includes(r[0]))
    )
  )

  const tableLabel = filtered[0]
    ? Object.keys(filtered[0]).map((k) => tableLabelMap[k])
    : []

  const baseLabelClassName = 'pe-3 font-bold whitespace-nowrap'

  const dpSetParsed = async (obj) => {
    window.gtag('event', 'new_scan', { 'user_email': user.email })
    dispatch(setParsed(obj))
  }
  const dpSetScanState = (obj) => dispatch(setScanState(obj))

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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="9">
                <div className="py-1 border border-gray-300 rounded-md">
                  <StateMrzInput
                    dpSetParsed={dpSetParsed}
                    dpSetScanState={dpSetScanState}
                  />
                </div>
              </td>
            </tr>
            {filtered.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(row).map((col, colIndex) => {
                  return (
                    <td key={colIndex} className="p-0">
                      <Input colIndex={col[0]} rowIndex={rowIndex} />
                    </td>
                  )
                })}
                {visaFeature ? <td><GenerateVisa row={row} /></td> : <></>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div className="text-slate-500">
            {disconnected ? (
              <div className="my-5">
                <div className="w-full">
                  <div className="p-6 border border-gray-300 rounded-md">
                    <StateMrzInput
                      dpSetParsed={dpSetParsed}
                      dpSetScanState={dpSetScanState}
                    />
                  </div>
                </div>
              </div>
            ) : (
              'Use your phone that you have linked this computer with to scan your document'
            )}
          </div>
        </>
      )}
    </>
  )
}

export default ParsedTable
