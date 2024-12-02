import { GenerateCsvButton } from '@/app/generate/csv'
import HighlightExpiredPassports from '@/app/highlightExpiredPassports'
import MaskDetails from '@/app/maskDetails'
import StatePhoneConnection from '@/app/statePhoneConnection'

const Toolbar = () => {
  return (
    <div className="flex items-center py-4 fixed bottom-0">
      <MaskDetails />
      <StatePhoneConnection />
      <GenerateCsvButton />
      <HighlightExpiredPassports />
    </div>
  )
}

export default Toolbar
