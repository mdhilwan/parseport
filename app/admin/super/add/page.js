import '@/styles/global.css'
import AuthGuard from '@/app/authGuard'
import Controls from '@/app/admin/shared/controls'
import { getServerAuthSession } from '@/app/server/auth'
import AddUserForm from './add-user-form'

const AddAccount = async () => {
  const authSession = await getServerAuthSession()

  return (
    <AuthGuard whichAdmin="super">
      <div className="relative overflow-x-auto">
        <Controls whichAdmin={'super'} session={authSession} />

        <AddUserForm />
      </div>
    </AuthGuard>
  )
}

export default AddAccount
