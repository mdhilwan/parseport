import BaseModal from '@/app/baseModal'
import { GenerateTagForm } from '@/app/generate/tag/generateTagForm'
import { GenerateTagPreview } from '@/app/generate/tag/generateTagPreview'
import { setShowBagTagModal } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { ReactElement } from 'react'
import { useDispatch } from 'react-redux'

type TagModalButtonType = {
  children: ReactElement | string
  disabled?: boolean
  classNameOverwrite?: string
  onClick?: () => void
}

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

const TagModalButtons = () => {
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

const TagModalButton = (tagModalButtonProps: TagModalButtonType) => {
  const {
    children,
    classNameOverwrite = '',
    disabled = false,
    onClick = () => console.log('click TagModalButton'),
  } = tagModalButtonProps
  const baseClassName = `className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto ms-3 last:ms-0 ${classNameOverwrite}`
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={baseClassName}
    >
      {children}
    </button>
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
      button={<TagModalButtons />}
    />
  ) : (
    <></>
  )
}
