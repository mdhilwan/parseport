import { State } from '@/app/enums/state'
import Mrz from '@/app/mrz'
import { ArrowIcon } from '@/app/stateMrzInput/arrowIcon'
import { BaseCta, CtaType } from '@/app/stateMrzInput/baseCta'
import { useAppSelector } from '@/app/store'

export const ScanCta = ({
  dpSetParsed,
  dpSetScanState,
}: {
  dpSetParsed: Function
  dpSetScanState: Function
}) => {
  const { scanState, mrzStateDropZoneClass } = useAppSelector(
    (state) => state.mrzStore
  )

  return (
    <BaseCta
      type={CtaType.Div}
      colSpan={6}
      colStart={4}
      modifierClass={mrzStateDropZoneClass}
    >
      <>
        <div className={'w-full flex justify-center pb-4'}>
          <ArrowIcon />
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
      </>
    </BaseCta>
  )
}
