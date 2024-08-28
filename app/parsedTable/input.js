import { useDispatch, useSelector } from 'react-redux'
import { setNewValue } from '../slice/slice'

const Input = ({ colIndex, rowIndex }) => {
  const { scannedData, highlightExpiredPassports } = useSelector(
    (state) => state.mrzStore
  )
  const dispatch = useDispatch()

  const data = scannedData[rowIndex][colIndex]
  const baseClassName =
    'border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 py-1 w-full h-8'
  const isDateType = !isNaN(new Date(data))
  const defaultType = isDateType ? 'date' : 'text'

  let isDateExpired =
    isDateType && highlightExpiredPassports && colIndex !== 'birthDate'
      ? new Date() > new Date(data)
      : false

  return (
    <input
      className={`${baseClassName} ${isDateExpired ? 'bg-amber-100 text-amber-800 border-amber-400' : ''}`}
      onChange={(evt) => {
        dispatch(
          setNewValue({
            colKey: colIndex,
            rowKey: rowIndex,
            newValue: evt.target.value,
          })
        )
      }}
      type={defaultType}
      value={data}
    />
  )
}

export default Input
