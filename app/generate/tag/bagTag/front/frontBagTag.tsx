import { BaseBagTag } from '@/app/generate/tag'
import { useAppSelector } from '@/app/store'

const FrontBagTag = () => {
  const {
    scannedData,
    showBagTagModal: {
      rowKey = 0,
      elementsPos: {
        name: { front, display },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  const getFontSize = () => {
    return 'text-base'
  }

  return (
    <BaseBagTag face="front">
      <>
        {display.includes('front') ? (
          <p
            className={`front-name-element absolute py-2 px-5 w-full ${getFontSize()}`}
            style={{
              top: front.y,
              left: front.x,
            }}
          >
            {scannedData[rowKey].firstName} {scannedData[rowKey].lastName}
          </p>
        ) : (
          <></>
        )}
      </>
    </BaseBagTag>
  )
}

export default FrontBagTag
