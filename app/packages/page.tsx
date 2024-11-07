import Controls, {
  ControlSessionType,
} from '@/app/admin/shared/controls/controls'
import Unauth from '@/app/admin/shared/unauth'
import AuthGuard from '@/app/authGuard'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import { getServerAuthSession } from '@/app/server/auth'
import utils from '@/app/utils'
import '@/styles/global.css'
import Row from './row'

const Packages = async () => {
  const authSession =
    (await getServerAuthSession()) as unknown as ControlSessionType

  if (!authSession) {
    return <Unauth />
  }

  return (
    <AuthGuard whichAdmin={WhichAdmin.NONE}>
      {
        <main>
          <Controls session={authSession} />
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th></th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Tour ID
                </th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Tour Package Name
                </th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Date Start and End
                </th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Makkah Hotel 1
                </th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Makkah Hotel 2
                </th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Madinah Hotel 1
                </th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Madinah Hotel 2
                </th>
                <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">
                  Mutawif
                </th>
              </tr>
            </thead>
            <tbody>
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
            </tbody>
          </table>
        </main>
      }
    </AuthGuard>
  )
}

export default Packages
