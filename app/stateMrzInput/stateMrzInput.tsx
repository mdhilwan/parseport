import {
  setExcelFile,
  setShowAddPassport,
  setShowImportExcelModal,
  setShowQrCodeModal,
} from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { DragEvent } from 'react'
import { useDispatch } from 'react-redux'
import { State } from '../enums/state'
import Mrz from '../mrz'
import MrzInputHandler from '../mrz/MrzInutHandler'

type StateMrzInputType = {
  dpSetParsed: Function
  dpSetScanState: Function
}

const Cancel = () => {
  const { scannedData } = useAppSelector((state) => state.mrzStore)
  const dispatch = useDispatch()

  if (scannedData.length === 0) {
    return <></>
  }

  return (
    <div className={'col-start-4 col-span-6 justify-self-end'}>
      <button
        className={'rounded-full border border-gray-400 px-3 py-2'}
        onClick={() => dispatch(setShowAddPassport(false))}
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.80317 5.46967C6.09606 5.17678 6.57093 5.17678 6.86383 5.46967L12.3335 10.9393L17.8032 5.46967C18.0961 5.17678 18.5709 5.17678 18.8638 5.46967C19.1567 5.76256 19.1567 6.23744 18.8638 6.53033L13.3942 12L18.8638 17.4697C19.1567 17.7626 19.1567 18.2374 18.8638 18.5303C18.5709 18.8232 18.0961 18.8232 17.8032 18.5303L12.3335 13.0607L6.86383 18.5303C6.57093 18.8232 6.09606 18.8232 5.80317 18.5303C5.51027 18.2374 5.51027 17.7626 5.80317 17.4697L11.2728 12L5.80317 6.53033C5.51027 6.23744 5.51027 5.76256 5.80317 5.46967Z"
            fill="#b91c1c"
          />
        </svg>
      </button>
    </div>
  )
}

const StateMrzInput = (props: StateMrzInputType) => {
  const { dpSetParsed, dpSetScanState } = props
  const { scanState, scannedData, mrzStateDropZoneClass, showAddPassport } =
    useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()

  const dragOverHandler = (ev: DragEvent<HTMLDivElement>) => ev.preventDefault()
  const dropHandler = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault()
    evt.stopPropagation()

    if (
      Array.from(evt.dataTransfer.files)
        .map((f) => f.type)
        .every((f) => f.match(/sheet|excel|xls/g))
    ) {
      dispatch(setExcelFile(evt.dataTransfer.files[0]))
      dispatch(setShowImportExcelModal(true))
    } else {
      MrzInputHandler({
        dpSetParsed,
        dpSetScanState,
        $event: [...Array.from(evt.dataTransfer.files)],
      })
    }
  }

  return (
    <>
      {scannedData.length === 0 || showAddPassport ? (
        <div
          className="grid grid-cols-12 gap-4"
          onDragOver={(evt) => dragOverHandler(evt)}
          onDrop={(evt) => dropHandler(evt)}
        >
          <Cancel />
          <div
            className={`col-start-4 col-span-6 p-4 border border-gray-400 rounded-xl transition-all ${mrzStateDropZoneClass}`}
          >
            <div className={'w-full flex justify-center pb-4'}>
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 29.75L28 36.75M28 36.75L35 29.75M28 36.75L28 19.25M49 28C49 39.598 39.598 49 28 49C16.402 49 7 39.598 7 28C7 16.402 16.402 7 28 7C39.598 7 49 16.402 49 28Z"
                  stroke="#111111"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={'text-center'}>
              {scanState.state === State.SCANNING ? (
                <>Scanning...</>
              ) : (
                <>
                  <span>Drag & Drop</span>
                  <label className={'label-text-base-brand mx-1'}>
                    <span>or browse</span>
                    <Mrz
                      dpSetParsed={dpSetParsed}
                      dpSetScanState={dpSetScanState}
                    />
                  </label>
                  <span>for a passport (jpg, jpeg, png).</span>
                </>
              )}
            </div>
          </div>
          <a
            className="col-span-3 p-4 border border-gray-400 rounded-xl col-start-4 text-center text-base-brand hover:cursor-pointer"
            onClick={() => dispatch(setShowQrCodeModal(true))}
          >
            Link your phone with a QR code
          </a>
          <a
            className="col-span-3 p-4 border border-gray-400 rounded-xl text-center text-base-brand hover:cursor-pointer"
            onClick={() => dispatch(setShowImportExcelModal(true))}
          >
            Import as excel sheet
          </a>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default StateMrzInput
