import { ReactElement } from 'react'

type BaseBagTagType = {
  children: ReactElement
  type: 'Front' | 'Back'
}
const BaseBagTag = (baseBagTagProp: BaseBagTagType) => {
  const { children, type } = baseBagTagProp
  return (
    <div className="w-64 mx-5">
      <span className="text-xs text-gray-400 uppercase">{type}</span>
      <div className="rounded-xl border border-gray-600 bg-white h-96 shadow-md hover:shadow-2xl transition-all shadow-gray-600 hover:shadow-gray-800 hover:-mt-10 hover:xl:scale-125 hover:lg:scale-110 hover:z-10 relative transform-gpu">
        {children}
      </div>
    </div>
  )
}

export default BaseBagTag
