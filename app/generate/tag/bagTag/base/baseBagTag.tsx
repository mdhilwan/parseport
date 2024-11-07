import { ReactElement } from 'react'

type BaseBagTagType = {
  children: ReactElement
  type: 'Front' | 'Back'
  bgImg?: string
}

const BaseBagTag = (baseBagTagProp: BaseBagTagType) => {
  const { children, type, bgImg = '' } = baseBagTagProp

  return (
    <div className="w-64 mx-5">
      <span className="text-xs text-gray-400 uppercase">{type}</span>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
        className={`rounded-xl overflow-hidden border border-gray-600 bg-white h-[404px] shadow-md hover:shadow-2xl transition-all shadow-gray-600 hover:shadow-gray-800 hover:-mt-10 hover:xl:scale-125 hover:lg:scale-110 hover:z-10 relative transform-gpu bg-cover`}
      >
        {children}
      </div>
    </div>
  )
}

export default BaseBagTag
