import { BaseBagTag } from '@/app/generate/tag'
import { useAppSelector } from '@/app/store'

const BackBagTag = () => {
  const {
    scannedData,
    showBagTagModal: {
      rowKey = 0,
      elementsPos: {
        name: { back, display },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  const getFontSize = () => {
    return 'text-base'
  }

  return (
    <BaseBagTag face="back">
      <>
        {display.includes('back') ? (
          <p
            className={`back-name-element absolute py-2 px-5 w-full ${getFontSize()}`}
            style={{
              top: back.y,
              left: back.x,
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

export default BackBagTag
