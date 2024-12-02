import { setBagTagDesign } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

type ImageInputType = {
  controls: boolean
  face: string
  shadow?: boolean
  frontOrBack: string
}

export const ImageInput = (imageInputProps: ImageInputType) => {
  const { controls, face, frontOrBack, shadow = true } = imageInputProps
  const {
    showBagTagModal: {
      design: { back, front },
    },
  } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target?.files ? e.target?.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const newImg = document.createElement('img')
        newImg.onload = function () {
          dispatch(
            setBagTagDesign({
              front: face === 'front' ? (reader.result as string) : front,
              back: face === 'back' ? (reader.result as string) : back,
              dimension: {
                h: newImg.height,
                w: newImg.width,
              },
            })
          )
        }
        newImg.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {controls ? (
        <div className="flex justify-between mb-4">
          <span className="text-xs text-gray-400 uppercase pt-3">{face}</span>
          <label
            className={`className="mt-3 inline-flex w-full justify-center rounded-md px-2 py-1.5 text-xs sm:mt-0 sm:w-auto ms-3 last:ms-0 bg-gray-600 font-semibold text-gray-400 ${shadow ? 'shadow-sm shadow-gray-700' : ''} ring-0 ring-gray-600 hover:bg-gray-700 cursor-pointer`}
          >
            {frontOrBack ? 'Replace' : 'Upload'}
            <input
              type={'file'}
              className={'hidden'}
              accept={'image/png, image/jpeg, image/jpg'}
              onChange={handleImageChange}
            />
          </label>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
