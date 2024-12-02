import { Input, Label } from '@/app/generate/tag'
import { CardFace, setBagTagNamePos } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

const CardFaceDisplayCheckbox = ({ face }: { face: CardFace }) => {
  const {
    showBagTagModal: {
      elementsPos: {
        name: { front, back, display },
      },
    },
  } = useAppSelector((state) => state.mrzStore)
  let cloneDisplay = [...display]

  const dispatch = useDispatch()
  return (
    <div className="flex items-center mb-4">
      <input
        checked={cloneDisplay.includes(face)}
        id={`${face}-card`}
        type="checkbox"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (!e.currentTarget.checked) {
            cloneDisplay = cloneDisplay.filter((d) => d !== face)
          } else {
            cloneDisplay.push(face)
          }
          dispatch(
            setBagTagNamePos({
              front: front,
              back: back,
              display: cloneDisplay,
            })
          )
        }}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={`${face}-card`}
        className="ms-2 text-sm font-medium text-gray-900 uppercase"
      >
        {face} card
      </label>
    </div>
  )
}

const PositionInputCoordinate = ({
  face,
  coord,
}: {
  face: CardFace
  coord: 'x' | 'y'
}) => {
  const {
    showBagTagModal: {
      elementsPos: {
        name: { front, back, display },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  const cardFaceX = face === 'front' ? front.x : back.x
  const cardFaceY = face === 'front' ? front.y : back.y
  const dispatch = useDispatch()

  return (
    <>
      <label className={'appearance-none py-2 px-3 text-gray-700'}>
        {coord.toUpperCase()}:
      </label>
      <Input
        value={coord === 'x' ? cardFaceX : cardFaceY}
        placeholder={'100px'}
        id={'lastName'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const isFront = face === 'front'
          const isXCoord = coord === 'x'

          const updatedPosition = {
            front: isFront
              ? {
                  x: isXCoord ? e.currentTarget.value : cardFaceX,
                  y: isXCoord ? cardFaceY : e.currentTarget.value,
                }
              : front,
            back: isFront
              ? back
              : {
                  x: isXCoord ? e.currentTarget.value : cardFaceX,
                  y: isXCoord ? cardFaceY : e.currentTarget.value,
                },
            display: display,
          }

          dispatch(setBagTagNamePos(updatedPosition))
        }}
      />
    </>
  )
}

const PositionInput = ({ face }: { face: CardFace }) => {
  return (
    <div className="pb-3">
      <h3 className="pb-3 text-sm text-gray-400 uppercase">Position {face}</h3>
      <div className="flex">
        <PositionInputCoordinate coord={'x'} face={face} />
        <PositionInputCoordinate coord={'y'} face={face} />
      </div>
    </div>
  )
}

export const GenerateTagForm = () => {
  const {
    scannedData,
    showBagTagModal: {
      rowKey = 0,
      elementsPos: {
        name: { display },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  return (
    <div className="col-span-1 max-h-[calc(1000px-16rem)] min-h-[calc(820px-10rem)] overflow-y-scroll overflow-x-hidden relative">
      <h3 className="pb-3 text-sm text-gray-400 uppercase">Personal Details</h3>
      <div className="border border-gray-100 shadow-sm rounded p-4 mb-4">
        <div className="mb-4">
          <Label label={'First Name'} htmlFor={'firstName'} />
          <Input
            value={scannedData[rowKey].firstName}
            placeholder={'John'}
            id={'firstName'}
            disabled={true}
          />
        </div>
        <div>
          <Label label={'Last Name'} htmlFor={'lastName'} />
          <Input
            value={scannedData[rowKey].lastName}
            placeholder={'Doe'}
            id={'lastName'}
            disabled={true}
          />
        </div>
      </div>
      {display.map((d, index) => (
        <PositionInput key={index} face={d} />
      ))}

      <div className="mt-4">
        <CardFaceDisplayCheckbox face={'front'} />
        <CardFaceDisplayCheckbox face={'back'} />
      </div>
    </div>
  )
}
