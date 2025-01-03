import { UserType } from '@/app/admin/shared/controls/controls'
import { HttpActions } from '@/app/api/httpActions'
import {
  setExcelFile,
  setParsed,
  setScanState,
  setShowAddPassport,
  setShowImportExcelModal,
} from '@/app/slice/slice'
import { Cancel } from '@/app/stateMrzInput/cancelButton'
import { ImportExcelCta } from '@/app/stateMrzInput/importExcelCta'
import { LinkCta } from '@/app/stateMrzInput/linkCta'
import { ScanCta } from '@/app/stateMrzInput/scanCta'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { DragEvent } from 'react'
import MrzInputHandler from '../mrz/MrzInutHandler'

type StateMrzInputType = {
  user: UserType
}

const StateMrzInput = (props: StateMrzInputType) => {
  const { user } = props
  const { scannedData, showAddPassport } = useAppSelector(
    (state) => state.mrzStore
  )
  const dispatch = useAppDispatch()

  const dpSetParsed = async (obj: any) => {
    await HttpActions.DoScan({
      userEmail: user.email,
      company: user.res?.result?.company,
    })
    dispatch(setShowAddPassport(false))
    dispatch(setParsed(obj))
  }
  const dpSetScanState = (obj: any) => dispatch(setScanState(obj))

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
    <div className="w-full h-[calc(100vh-12.5rem)] flex justify-center items-center">
      {scannedData.length === 0 || showAddPassport ? (
        <div
          className="grid grid-cols-12 gap-4"
          onDragOver={(evt) => dragOverHandler(evt)}
          onDrop={(evt) => dropHandler(evt)}
        >
          <Cancel />
          <ScanCta dpSetScanState={dpSetScanState} dpSetParsed={dpSetParsed} />
          <LinkCta />
          <ImportExcelCta />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default StateMrzInput
