import { setShowAddPassport } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

const AddPassportButton = () => {
  const { scannedData, showAddPassport } = useAppSelector(
    (state) => state.mrzStore
  )
  const dispatch = useDispatch()

  if (scannedData.length === 0 || showAddPassport) {
    return <></>
  }

  return (
    <div className={'pr-10'}>
      <button
        className={
          'my-1.5 mx-3 py-2 px-4 rounded-full border border-red-800 bg-red-700 text-white items-center text-sm'
        }
        onClick={() => {
          dispatch(setShowAddPassport(true))
        }}
      >
        Add passport
      </button>
    </div>
  )
}

export default AddPassportButton
