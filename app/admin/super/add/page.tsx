import Controls from '@/app/admin/shared/controls'
import { ControlSessionType } from '@/app/admin/shared/controls/controls'
import { WhichAdmin } from '@/app/admin/shared/login/login'
import AuthGuard from '@/app/authGuard'
import { getServerAuthSession } from '@/app/server/auth'
import '@/styles/global.css'
import AddUserForm from './add-user-form'

const AddAccount = async () => {
  const authSession =
    (await getServerAuthSession()) as unknown as ControlSessionType

  return (
    <AuthGuard whichAdmin={WhichAdmin.SUPER}>
      <div className="relative overflow-x-auto">
        <Controls whichAdmin={WhichAdmin.SUPER} session={authSession} />
        <AddUserForm />
      </div>
    </AuthGuard>
  )
}

export default AddAccount
