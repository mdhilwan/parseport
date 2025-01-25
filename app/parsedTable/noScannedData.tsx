import { UserType } from '@/app/admin/shared/controls/controls'
import StateMrzInput from '@/app/stateMrzInput'

export const NoScannedData = ({ user }: { user: UserType }) => {
  return (
    <div className="text-slate-500">
      <div className="my-5">
        <StateMrzInput user={user} />
      </div>
    </div>
  )
}
