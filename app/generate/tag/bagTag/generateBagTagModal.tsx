import BaseModal from '@/app/baseModal'
import { GenerateBagTagForm } from '@/app/generate/tag/bagTag/generateBagTagForm'
import { GenerateBagTagPreview } from '@/app/generate/tag/bagTag/generateBagTagPreview'
import { setShowBagTagModal } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

const GenerateBagTagModal = () => {
  const {
    showBagTagModal: { show, rowKey },
  } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()
  return show && rowKey !== undefined ? (
    <BaseModal
      content={
        <div className="grid grid-cols-3 gap-4 mt-4">
          <GenerateBagTagPreview />
          <GenerateBagTagForm />
        </div>
      }
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
