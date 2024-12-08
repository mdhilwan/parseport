import { BaseBagTag } from '@/app/generate/tag'
import { maskData } from '@/app/parsedTable/input'
import { useAppSelector } from '@/app/store'

const FrontBagTag = () => {
  const {
    scannedData,
    maskPassportDetails,
    userIsDemo,
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

  const returnName = () =>
    maskPassportDetails || userIsDemo
      ? maskData(
          `${scannedData[rowKey].firstName} ${scannedData[rowKey].lastName}`
        )
      : `${scannedData[rowKey].firstName} ${scannedData[rowKey].lastName}`

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
            {returnName()}
          </p>
        ) : (
          <></>
        )}
      </>
    </BaseBagTag>
  )
}

export default FrontBagTag
