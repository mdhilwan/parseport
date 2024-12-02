import { GenerateCsvButton } from '@/app/generate/csv'
import HighlightExpiredPassports from '@/app/highlightExpiredPassports'
import MaskDetails from '@/app/maskDetails'
import ScanNotification from '@/app/scanNotification'
import StatePhoneConnection from '@/app/statePhoneConnection'

const Toolbar = () => {
  return (
    <div className="flex items-center py-4 fixed bottom-0">
      <MaskDetails />
      <StatePhoneConnection />
      <GenerateCsvButton />
      <HighlightExpiredPassports />
      <ScanNotification />
    </div>
  )
}

export default Toolbar
