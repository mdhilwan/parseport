'use client'

import { UserType } from '@/app/admin/shared/controls/controls'
import { HttpActions } from '@/app/api/httpActions'
import { Row } from '@/app/parsedTable/row'
import { setParsed, setScanState } from '@/app/slice/slice'
import StateMrzInput from '@/app/stateMrzInput'
import { useAppDispatch, useAppSelector } from '@/app/store'

export const TableLabelMap = {
  issuingState: 'Issuing State',
  firstName: 'First Name',
  lastName: 'Last Name',
  documentNumber: 'Passport Number',
  nationality: 'Nationality',
  birthDate: 'Date of Birth',
  sex: 'Sex',
  expirationDate: 'Date of Expiry',
  personalNumber: 'NRIC Number',
}

export const TableLabelKeys = Object.keys(TableLabelMap)
export const TableLabelValues = Object.values(TableLabelMap)

type ParsedTableType = {
  user: UserType
}

const ParsedTable = (props: ParsedTableType) => {
  const { user } = props
  const { scannedData, disconnected } = useAppSelector(
    (state) => state.mrzStore
  )
  const visaFeature = false
  const dispatch = useAppDispatch()
  const filtered: { [p: string]: any }[] = scannedData.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter((r) => TableLabelKeys.includes(r[0]))
    )
  )

  const baseLabelClassName = 'pe-3 font-bold whitespace-nowrap'

  const dpSetParsed = async (obj: any) => {
    await HttpActions.DoScan({
      userEmail: user.email,
      company: user.res?.result?.company,
    })
    dispatch(setParsed(obj))
  }
  const dpSetScanState = (obj: any) => dispatch(setScanState(obj))

  return (
    <>
      {scannedData.length > 0 ? (
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <td className={baseLabelClassName}>Issuing State</td>
              <td className={`${baseLabelClassName} w-72`}>First Name</td>
              <td className={`${baseLabelClassName} w-72`}>Last Name</td>
              <td className={baseLabelClassName}>Passport Number</td>
              <td className={baseLabelClassName}>Nationality</td>
              <td className={baseLabelClassName}>Date of Birth</td>
              <td className={baseLabelClassName}>Sex</td>
              <td className={baseLabelClassName}>Date of Expiry</td>
              <td className={baseLabelClassName}>NRIC Number</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={9}>
                <div>
                  <StateMrzInput
                    dpSetParsed={dpSetParsed}
                    dpSetScanState={dpSetScanState}
                  />
                </div>
              </td>
            </tr>
            {filtered.map((row, rowIndex) => (
              <Row
                key={rowIndex}
                rowKey={rowIndex}
                row={row}
                visaFeature={visaFeature}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-slate-500">
          {disconnected ? (
            <div className="my-5">
              <div className="w-full">
                <div className="border border-gray-300 rounded-md">
                  <StateMrzInput
                    dpSetParsed={dpSetParsed}
                    dpSetScanState={dpSetScanState}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              Use your phone that you have linked this computer with to scan
              your document
            </>
          )}
        </div>
      )}
    </>
  )
}

export default ParsedTable
