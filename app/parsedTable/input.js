import { useDispatch, useSelector } from 'react-redux'
import { setNewValue } from '../slice/slice'

const Input = ({ colIndex, rowIndex }) => {
  const { scannedData } = useSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  const baseClassName =
    'border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 w-full'
  const isDateType = !isNaN(new Date(scannedData[rowIndex][colIndex]))
  const defaultType = isDateType ? 'date' : 'text'

  return (
    <input
      className={baseClassName}
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
      value={scannedData[rowIndex][colIndex]}
    />
  )
}

export default Input
