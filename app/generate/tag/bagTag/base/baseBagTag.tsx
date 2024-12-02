import { DownloadBtn } from '@/app/generate/tag/bagTag/base/downloadBtn'
import { ImageInput } from '@/app/generate/tag/bagTag/base/imageInput'
import { CardFace } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import Image from 'next/image'
import { ReactElement, useRef } from 'react'

type BaseBagTagType = {
  face: CardFace
  children?: ReactElement
  controls?: boolean
  shadow?: boolean
  hover?: boolean
}

const BaseBagTag = (baseBagTagProp: BaseBagTagType) => {
  const {
    children,
    face,
    controls = true,
    shadow = true,
    hover = true,
  } = baseBagTagProp
  const {
    showBagTagModal: {
      design: {
        back,
        front,
        dimension: { h, w },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  const cardHeight = (): string => {
    if (h && w) {
      return Math.floor((h / w) * 256) + 'px'
    }
    return '384px' //'h-96'
  }

  const cardWidth = () => {
    return '256px' // w-64
  }

  const cardDimension = () => ({
    width: cardWidth(),
    height: cardHeight(),
  })

  const cardRef = useRef<HTMLDivElement>(null)
  const frontOrBack: string = face === 'front' ? front : back

  return (
    <div
      className="mx-5 transition-all"
      style={{
        width: cardWidth(),
      }}
    >
      <ImageInput controls={controls} face={face} frontOrBack={frontOrBack} />
      <div
        className={`${shadow ? 'shadow-md shadow-gray-800' : ''} ${hover && shadow ? 'hover:shadow-2xl hover:shadow-gray-800' : ''} ${hover ? 'hover:-mt-10 hover:xl:scale-125 hover:lg:scale-110 hover:z-10 transition-all' : ''} relative transform-gpu`}
        style={cardDimension()}
      >
        <div
          className={'overflow-hidden bg-cover w-full h-full bg-white'}
          id={`${face}-download`}
          ref={cardRef}
        >
          {children}
          {frontOrBack ? (
            <Image src={frontOrBack} alt={face} height={h} width={w} />
          ) : (
            <></>
          )}
        </div>
        <DownloadBtn face={face} cardRef={cardRef} />
      </div>
    </div>
  )
}

export default BaseBagTag
