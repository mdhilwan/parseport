import { GenerateTagButton } from '@/app/generate/tag'
import GenerateVisa from '@/app/generate/visa'
import Input from '@/app/parsedTable/input'
import { RemoveRow } from '@/app/parsedTable/removeRow'

type RowType = {
  row: { [p: string]: any }
  rowKey: number
  visaFeature: boolean
}

const Row = (props: RowType) => {
  const { row, visaFeature, rowKey } = props

  return (
    <tr key={rowKey}>
      <td className="p-0">
        <Input colIndex={'issuingState'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'lastName'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'firstName'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'documentNumber'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'nationality'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'birthDate'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'sex'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'expirationDate'} rowIndex={rowKey} />
      </td>
      <td className="p-0">
        <Input colIndex={'personalNumber'} rowIndex={rowKey} />
      </td>
      {visaFeature ? (
        <td>
          <GenerateVisa row={row} />
        </td>
      ) : (
        <></>
      )}
      <td>
        <GenerateTagButton rowKey={rowKey} />
      </td>
      <td>
        <RemoveRow rowKey={rowKey} />
      </td>
    </tr>
  )
}

export { Row }
