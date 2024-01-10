import Controls from '@/app/admin/shared/controls';
import '@/styles/global.css'
import AuthGuard from '../authGuard';
import { getServerAuthSession } from '@/app/server/auth';
import { HttpActions } from '../api/httpActions';

const Admin = async () => {
    const authSession = await getServerAuthSession();
    const { name, email, id } = authSession.user;

    const {result: {company, companyaddress, companynumber, useremail, sessionid, issuedatetime, invaliddatetime}} = await HttpActions.GetUserByEmail(email)

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
                            <td className="px-4 py-2 border">{issuedatetime} - {invaliddatetime}</td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border">Total Scans</th>
                            <td className="px-4 py-2 border"></td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border">Total PDFs</th>
                            <td className="px-4 py-2 border"></td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border">Billed</th>
                            <td className="px-4 py-2 border"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AuthGuard>
    )
}

export default Admin