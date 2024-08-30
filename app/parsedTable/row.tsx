import GenerateVisa from '@/app/generate/visa'
import Input from '@/app/parsedTable/input'
import { setScannedData } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'

type RowType = {
  row: { [p: string]: any }
  rowKey: number
  visaFeature: boolean
}

const Row = (props: RowType) => {
  const { row, visaFeature, rowKey } = props
  const { scannedData } = useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()

  const removeRow = () => {
    const dupScannedData = [...scannedData]
    dupScannedData.splice(rowKey, 1)
    dispatch(setScannedData(dupScannedData))
  }

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
        <button
          role="button"
          className="button text-xs px-2 py-1.5 text-gray-400 hover:text-red-200 hover:bg-red-600 bg-slate-50 rounded-md border border-white hover:border-red-700"
          onClick={() => {
            removeRow()
          }}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
            <line x1="18" y1="9" x2="12" y2="15" />
            <line x1="12" y1="9" x2="18" y2="15" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export { Row }
