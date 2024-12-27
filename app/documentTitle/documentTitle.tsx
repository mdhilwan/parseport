import { setExcelFileName } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

type DocumentTitleType = {
  focus?: boolean
  extraClassName?: string
}

const DocumentTitle = (opt: DocumentTitleType) => {
  const { focus = false, extraClassName = '' } = opt
  const { scannedData, excelFileName, showAddPassport } = useAppSelector(
    (state) => state.mrzStore
  )

  const dispatch = useDispatch()

  if (scannedData.length === 0 || showAddPassport) {
    return <></>
  }

  return (
    <div className="pl-10 flex flex-grow items-center">
      <input
        type="text"
        autoFocus={focus}
        value={excelFileName}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          dispatch(setExcelFileName(evt.target.value))
        }}
        className={`w-full px-2 py-1 text-xs text-gray-400 hover:border-gray-700 focus:border-gray-700 focus:text-gray-700 hover:cursor-pointer ${extraClassName}`}
      />
    </div>
  )
}

export default DocumentTitle
