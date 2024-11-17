import { setBagTagDesign } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { ChangeEvent, ReactElement } from 'react'
import { useDispatch } from 'react-redux'

type BaseBagTagType = {
  type: 'Front' | 'Back'
  children?: ReactElement
  bgImg?: string
}

const BaseBagTag = (baseBagTagProp: BaseBagTagType) => {
  const { children, type } = baseBagTagProp
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
        if (type === 'Front') {
          dispatch(
            setBagTagDesign({ front: reader.result as string, back: back })
          )
        } else if (type === 'Back') {
          dispatch(
            setBagTagDesign({ front: front, back: reader.result as string })
          )
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-64 mx-5">
      <div className="flex justify-between mb-4">
        <span className="text-xs text-gray-400 uppercase pt-3">{type}</span>
        <label
          className={
            'className="mt-3 inline-flex w-full justify-center rounded-md px-2 py-1.5 text-xs sm:mt-0 sm:w-auto ms-3 last:ms-0 bg-gray-600 font-semibold text-gray-400 shadow-sm shadow-gray-700 ring-0 ring-gray-600 hover:bg-gray-700 cursor-pointer'
          }
        >
          Upload
          <input
            type={'file'}
            className={'hidden'}
            accept={'image/png, image/jpeg, image/jpg'}
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div
        style={{
          backgroundImage: `url(${type === 'Front' ? front : back})`,
        }}
        className={`rounded-xl overflow-hidden border border-gray-600 bg-white h-[404px] shadow-md hover:shadow-2xl transition-all shadow-gray-600 hover:shadow-gray-800 hover:-mt-10 hover:xl:scale-125 hover:lg:scale-110 hover:z-10 relative transform-gpu bg-cover`}
      >
        {children}
      </div>
    </div>
  )
}

export default BaseBagTag
