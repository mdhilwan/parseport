import Controls from '@/app/admin/shared/controls';
import '@/styles/global.css'
import AuthGuard from '../authGuard';
import { getServerAuthSession } from '@/app/server/auth';

const Admin = async () => {
    const authSession = await getServerAuthSession();
    const { name, email, id } = authSession.user;

    return (
        <AuthGuard>
            <div className="relative overflow-x-auto">
                <Controls session={authSession} />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <tbody>
                        <tr>
                            <th className="px-4 py-2 border">Email</th>
                            <td className="px-4 py-2 border">{name} - {email}</td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border">Company Name</th>
                            <td className="px-4 py-2 border"></td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border">Auth</th>
                            <td className="px-4 py-2 border"></td>
                        </tr>
                        <tr>
                            <th className="px-4 py-2 border">Address</th>
                            <td className="px-4 py-2 border"></td>
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