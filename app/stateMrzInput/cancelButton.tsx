import { setShowAddPassport } from '@/app/slice/slice'
import { CancelIcon } from '@/app/stateMrzInput/cancelIcon'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

export const Cancel = () => {
  const { scannedData } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  if (scannedData.length === 0) {
    return <></>
  }

  return (
    <div className={'col-start-4 col-span-6 justify-self-end'}>
      <button
        className={'rounded-full border border-gray-400 px-3 py-2'}
        onClick={() => dispatch(setShowAddPassport(false))}
      >
        <CancelIcon />
      </button>
    </div>
  )
}
