import { getServerAuthSession } from '@/app/server/auth';
import Unauth from '../admin/shared/unauth';
import { HttpActions } from '../api/httpActions';

const AuthGuard = async ({ children, whichAdmin = "admin" }) => {
    const authSession = await getServerAuthSession();
    if (!authSession) {
        return <Unauth whichAdmin={whichAdmin} />
    }
    const { user: { name, email } } = authSession
    const { result } = await HttpActions.GetUserByEmail(email)

    if (authSession && result.active) {
        return (<>{children}</>)
    } else if (authSession && !result.active) {
        return (<>
            <div className="bg-orange-100 w-96 mx-auto mt-8 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">Account Disabled</p>
                <p>Your account is set to inactive. Please contact the admin to switch it back to active.</p>
            </div>
        </>)
    }
    return (
        <Unauth whichAdmin={whichAdmin} />
    )
}

export default AuthGuard