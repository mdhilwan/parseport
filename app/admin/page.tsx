import Controls from '@/app/admin/shared/controls'
import { ControlSessionType } from '@/app/admin/shared/controls/controls'
import { getServerAuthSession } from '@/app/server/auth'
import '@/styles/global.css'
import { HttpActions } from '../api/httpActions'
import AuthGuard from '../authGuard'

const Admin = async () => {
  const authSession =
    (await getServerAuthSession()) as unknown as ControlSessionType

  if (!authSession) {
    return <></>
  }

  const { email } = authSession.user

  if (!email) {
    return <></>
  }

  const {
    res: { result },
  } = await HttpActions.GetUserByEmail(email)

  if (!result) {
    return <></>
  }

  const {
    company,
    companyaddress,
    companynumber,
    useremail,
    sessionid,
    issuedatetime,
    invaliddatetime,
    scancount,
    downloadcount,
  } = result

  if (!company || !companyaddress || !companynumber || !useremail) {
    return <></>
  }

  return (
    <AuthGuard>
      <div className="relative overflow-x-auto">
        <Controls session={authSession} />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <tbody>
            <tr>
              <th className="px-4 py-2 border">Email</th>
              <td className="px-4 py-2 border">{useremail}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Company Name</th>
              <td className="px-4 py-2 border">{company}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Company Address</th>
              <td className="px-4 py-2 border">{companyaddress}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Company Number</th>
              <td className="px-4 py-2 border">{companynumber}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Session ID</th>
              <td className="px-4 py-2 border">{sessionid}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Session ID Valid</th>
              <td className="px-4 py-2 border">
                {issuedatetime} - {invaliddatetime}
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Total Scans</th>
              <td className="px-4 py-2 border">{scancount}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Total Downloads</th>
              <td className="px-4 py-2 border">{downloadcount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AuthGuard>
  )
}

export default Admin
