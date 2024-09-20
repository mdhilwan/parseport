import { UserType } from '@/app/admin/shared/controls/controls'
import GenerateCsv from '@/app/generate/csv'
import HighlightExpiredPassports from '@/app/highlightExpiredPassports'
import MaskDetails from '@/app/maskDetails'
import StatePhoneConnection from '@/app/statePhoneConnection'

const Toolbar = ({ user }: { user: UserType }) => {
  return (
    <div className="flex items-center py-4 fixed bottom-0">
      <MaskDetails />
      <StatePhoneConnection />
      <GenerateCsv user={user} />
      <HighlightExpiredPassports />
    </div>
  )
}

export default Toolbar
