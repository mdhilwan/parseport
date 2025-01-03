import { setShowQrCodeModal } from '@/app/slice/slice'
import { BaseCta, CtaType } from '@/app/stateMrzInput/baseCta'
import { useDispatch } from 'react-redux'

export const LinkCta = () => {
  const dispatch = useDispatch()
  return (
    <BaseCta
      type={CtaType.Button}
      colSpan={3}
      colStart={4}
      onClick={() => dispatch(setShowQrCodeModal(true))}
    >
      <span className={'text-base-brand'}>Link your phone with a QR code</span>
    </BaseCta>
  )
}
