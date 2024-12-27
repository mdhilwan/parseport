import { UserType } from '@/app/admin/shared/controls/controls'
import { StateMrzInputWrap } from '@/app/stateMrzInput/stateMrzInputWrap'
import { useAppSelector } from '@/app/store'

export const NoScannedData = ({ user }: { user: UserType }) => {
  const { disconnected } = useAppSelector((state) => state.mrzStore)
  return (
    <div className="text-slate-500">
      {disconnected ? (
        <div className="my-5">
          <StateMrzInputWrap user={user} />
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
