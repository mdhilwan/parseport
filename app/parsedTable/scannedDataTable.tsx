import { UserType } from '@/app/admin/shared/controls/controls'
import { TableLabelKeys } from '@/app/parsedTable/parsedTable'
import { Row } from '@/app/parsedTable/row'
import { StateMrzInputWrap } from '@/app/stateMrzInput/stateMrzInputWrap'
import { useAppSelector } from '@/app/store'

export const ScannedDataTable = ({ user }: { user: UserType }) => {
  const { scannedData, showAddPassport } = useAppSelector(
    (state) => state.mrzStore
  )
  const filtered: { [p: string]: any }[] = scannedData.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter((r) => TableLabelKeys.includes(r[0]))
    )
  )
  const baseLabelClassName =
    'pe-3 font-bold whitespace-nowrap text-gray-500 text-xs'

  return (
    <>
      {showAddPassport ? (
        <StateMrzInputWrap user={user} />
      ) : (
        <table className="table table-auto w-full mt-2">
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
            {filtered.map((row, rowIndex) => (
              <Row
                key={rowIndex}
                rowKey={rowIndex}
                row={row}
                visaFeature={false}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
