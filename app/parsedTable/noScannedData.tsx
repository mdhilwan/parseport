import { UserType } from '@/app/admin/shared/controls/controls'
import StateMrzInput from '@/app/stateMrzInput'
import { useAppSelector } from '@/app/store'

export const NoScannedData = ({ user }: { user: UserType }) => {
  const { disconnected } = useAppSelector((state) => state.mrzStore)
  return (
    <div className="text-slate-500">
      {disconnected ? (
        <div className="my-5">
          <StateMrzInput user={user} />
        </div>
      ) : (
        <>
          Use your phone that you have linked this computer with to scan your
          document
        </>
      )}
    </div>
  )
}
