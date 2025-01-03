import { setShowImportExcelModal } from '@/app/slice/slice'
import { BaseCta, CtaType } from '@/app/stateMrzInput/baseCta'
import { useDispatch } from 'react-redux'

export const ImportExcelCta = () => {
  const dispatch = useDispatch()
  return (
    <BaseCta
      type={CtaType.Button}
      colSpan={3}
      onClick={() => dispatch(setShowImportExcelModal(true))}
    >
      <span className={'text-base-brand'}>Import as excel sheet</span>
    </BaseCta>
  )
}
