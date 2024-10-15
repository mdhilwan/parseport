import { useAppDispatch, useAppSelector } from '@/app/store'
import { setNewValue } from '../slice/slice'

type InputType = {
  colIndex: string
  rowIndex: number
}

export const maskData = (data: string) =>
  data ? data.replace(/\S(?=\S{2})/g, '*') : ''

const Input = (props: InputType) => {
  const { colIndex, rowIndex } = props
  const {
    scannedData,
    highlightExpiredPassports,
    maskPassportDetails,
    userIsDemo,
  } = useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()

  // @ts-ignore
  const data = scannedData[rowIndex][colIndex]

  const baseClassName =
    'border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 py-1 w-full h-8 whitespace-nowrap'
  const isDateType = !isNaN(new Date(data).getTime())
  const defaultType = isDateType ? 'date' : 'text'

  let isDateExpired =
    isDateType && highlightExpiredPassports && colIndex !== 'birthDate'
      ? new Date() > new Date(data)
      : false

  return maskPassportDetails || userIsDemo ? (
    <span className={baseClassName}>{maskData(data)}</span>
  ) : (
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
