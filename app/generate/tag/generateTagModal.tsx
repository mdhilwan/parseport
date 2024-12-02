import { BaseModal } from '@/app/baseModal/baseModal.lazy'
import { GenerateTagForm, GenerateTagPreview } from '@/app/generate/tag'
import { TagModalButton } from '@/app/generate/tag/tagModalButton'
import { setShowBagTagModal } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

const Pagination = () => {
  const {
    scannedData,
    showBagTagModal: { show, rowKey },
  } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()
  return (
    <>
      <TagModalButton
        disabled={(rowKey as number) === scannedData.length - 1}
        classNameOverwrite={
          (rowKey as number) === scannedData.length - 1
            ? 'text-gray-300'
            : 'text-gray-900'
        }
        onClick={() => {
          if ((rowKey as number) + 1 < scannedData.length) {
            dispatch(
              setShowBagTagModal({
                show: show,
                rowKey: (rowKey as number) + 1,
              })
            )
          }
        }}
      >
        Next Person
      </TagModalButton>
      <TagModalButton
        disabled={(rowKey as number) === 0}
        classNameOverwrite={
          (rowKey as number) === 0 ? 'text-gray-300' : 'text-gray-900'
        }
        onClick={() => {
          if ((rowKey as number) > 0) {
            dispatch(
              setShowBagTagModal({
                show: show,
                rowKey: (rowKey as number) - 1,
              })
            )
          }
        }}
      >
        Prev Person
      </TagModalButton>
      <div className="text-sm py-2">
        {(rowKey as number) + 1}{' '}
        <span className="text-gray-500">of {scannedData.length} persons</span>
      </div>
    </>
  )
}

const TagModalButtonGroup = () => {
  const { scannedData } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()
  return (
    <>
      <TagModalButton
        classNameOverwrite={
          'bg-green-500 font-semibold text-white shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-600'
        }
        onClick={() => {
          dispatch(setShowBagTagModal({ show: false }))
        }}
      >
        Done
      </TagModalButton>
      {scannedData.length > 1 ? <Pagination /> : <></>}
    </>
  )
}

export const GenerateTagModal = () => {
  const {
    showBagTagModal: { show, rowKey },
  } = useAppSelector((state) => state.mrzStore)
  return show && rowKey !== undefined ? (
    <BaseModal
      content={
        <div className="grid grid-cols-3 gap-4 mt-4">
          <GenerateTagPreview />
          <GenerateTagForm />
        </div>
      }
      header={<>Tags</>}
      size={'large'}
      button={<TagModalButtonGroup />}
    />
  ) : (
    <></>
  )
}
