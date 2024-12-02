import { CardFace } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { RefObject } from 'react'

const h2cOptions = (h: number, w: number, face: CardFace) => {
  return {
    useCORS: true,
    allowTaint: true,
    letterRendering: true,
    height: h,
    width: w,
    backgroundColor: 'transparent',
    onclone: function (canvas: Document, divToClone: HTMLElement) {
      const txScale = h / divToClone.offsetHeight
      divToClone.style.height = h + 'px'
      divToClone.style.width = w + 'px'

      const nameElement = divToClone
        .getElementsByClassName(face + '-name-element')
        .item(0) as HTMLElement

      const oriPos: { x: number; y: number } = {
        x: Number(nameElement.style.left.replace(/px/g, '')),
        y: Number(nameElement.style.top.replace(/px/g, '')),
      }
      const newPos = { x: oriPos.x * txScale, y: oriPos.y * txScale }
      nameElement.style.fontSize = 16 * txScale + 'px'
      nameElement.style.lineHeight = 24 * txScale + 'px'
      nameElement.style.paddingTop = 8 * txScale + 'px'
      nameElement.style.paddingLeft = 20 * txScale + 'px'
      nameElement.style.paddingBottom = 8 * txScale + 'px'
      nameElement.style.paddingRight = 20 * txScale + 'px'
      nameElement.style.width = w + 'px'
      nameElement.style.top = newPos.y + 'px'
      nameElement.style.left = newPos.x + 'px'
    },
  }
}

export const DownloadBtn = ({
  face,
  cardRef,
}: {
  face: CardFace
  cardRef: RefObject<HTMLElement>
}) => {
  const {
    scannedData,
    excelFileName,
    showBagTagModal: {
      rowKey = 0,
      elementsPos: {
        name: { display },
      },
      design: {
        dimension: { h, w },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  const getName = () => {
    const data = scannedData[rowKey]
    if (data.firstName && data.lastName) {
      return (
        data.firstName.replace(/ /g, '-') +
        '-' +
        data.lastName.replace(/ /g, '-')
      )
    } else if (data.firstName) {
      return data.firstName.replace(/ /g, '-')
    }
    return data.lastName.replace(/ /g, '-')
  }

  return display.includes(face) ? (
    <div className={'absolute -bottom-8 -left-2'}>
      <button
        className={
          'className=&quot;mt-3 inline-flex w-full justify-center rounded-md px-2 py-1.5 text-xs scale-75 sm:mt-0 sm:w-auto ms-3 last:ms-0 bg-gray-600 font-semibold text-gray-400 shadow-sm shadow-gray-700 ring-0 ring-gray-600 hover:bg-gray-700 cursor-pointer'
        }
        onClick={async () => {
          const cardElement = cardRef.current

          if (!cardElement) return

          try {
            const html2canvas = await import('html2canvas-pro')

            const result = await html2canvas.default(
              cardElement,
              h2cOptions(h, w, face)
            )

            const asURL = result.toDataURL('image/jpeg')
            const anchor = document.createElement('a')
            anchor.href = asURL
            anchor.download = `${excelFileName === 'untitled' ? '' : excelFileName + '-'}bag-tag-${face}-${getName()}.jpeg`
            anchor.click()
            anchor.remove()
          } catch (reason) {
            console.log(reason)
          }
        }}
      >
        Download
      </button>
    </div>
  ) : (
    <></>
  )
}
