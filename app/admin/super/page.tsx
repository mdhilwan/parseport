import Controls, {
  ControlSessionType,
} from '@/app/admin/shared/controls/controls'
import { HttpActions } from '@/app/api/httpActions'
import AuthGuard from '@/app/authGuard'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import { getServerAuthSession } from '@/app/server/auth'
import utils from '@/app/utils'
import '@/styles/global.css'
import Row from './row'

const keyToLabelMap = {
  company: 'Company Name',
  companyAddress: 'Company Address',
  companyNumber: 'Number',
  emailAddress: 'Email Address',
  scanCount: 'Total Scans',
  pdfCount: 'Total PDFs',
  billed: 'Billed',
  active: 'Active',
}

const Super = async () => {
  const authSession =
    (await getServerAuthSession()) as unknown as ControlSessionType
  const {
    res: { result },
  } = await HttpActions.GetAllUsers()

  return (
    <AuthGuard whichAdmin={WhichAdmin.SUPER}>
      <div className="relative overflow-x-auto">
        <Controls whichAdmin={WhichAdmin.SUPER} session={authSession} />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th></th>
              <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                Email Address
              </th>
              <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                Company Name
              </th>
              <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                Company Number
              </th>
              <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                Company Address
              </th>
              <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                Total Scans
              </th>
              <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                Total Excel Downloads
              </th>
              <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((userObject: any, userIndex: any) => (
              <Row
                key={utils.Rand8digit()}
                session={authSession}
                userIndex={userIndex}
                userObject={userObject}
              />
            ))}
          </tbody>
        </table>
      </div>
    </AuthGuard>
  )
}

export default Super
