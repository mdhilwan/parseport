import BaseBagTag from '@/app/generate/tag/bagTag/base'
import { useAppSelector } from '@/app/store'

const FrontBagTag = () => {
  const {
    scannedData,
    showBagTagModal: {
      rowKey = 0,
      elementsPos: {
        name: { x, y },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  return (
    <BaseBagTag type="Front">
      <>
        <p
          className={'absolute py-2 px-5'}
          style={{
            top: y,
            left: x,
          }}
        >
          {scannedData[rowKey].firstName} {scannedData[rowKey].lastName}
        </p>
      </>
    </BaseBagTag>
  )
}

export default FrontBagTag
