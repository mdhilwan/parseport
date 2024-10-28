import BaseModal from '@/app/baseModal'
import { setShowBagTagModal } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

const GenerateBagTagModal = () => {
  const {
    scannedData,
    showBagTagModal: { show, rowKey },
  } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()
  return show && rowKey ? (
    <BaseModal
      content={<pre>{JSON.stringify(scannedData[rowKey], undefined, 2)}</pre>}
      header={<>Tags</>}
      size={'large'}
      button={
        <>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              dispatch(setShowBagTagModal(false))
            }}
          >
            Cancel
          </button>
        </>
      }
    />
  ) : (
    <></>
  )
}

export default GenerateBagTagModal
