import { setShowQrCodeModal } from '@/app/slice/slice'
import { BaseCta, CtaType } from '@/app/stateMrzInput/baseCta'
import { useAppSelector } from '@/app/store'
import { useDispatch } from 'react-redux'

export const LinkCta = () => {
  const dispatch = useDispatch()
  const { disconnected } = useAppSelector((state) => state.mrzStore)
  return (
    <>
      {disconnected ? (
        <BaseCta
          type={CtaType.Button}
          colSpan={3}
          colStart={4}
          onClick={() => dispatch(setShowQrCodeModal(true))}
        >
          <span className={'text-base-brand'}>
            Link your phone with a QR code
          </span>
        </BaseCta>
      ) : (
        <BaseCta type={CtaType.Div} colSpan={3} colStart={4}>
          <span className={'text-base-brand'}>
            Scan the document with your phone
          </span>
        </BaseCta>
      )}
    </>
  )
}
