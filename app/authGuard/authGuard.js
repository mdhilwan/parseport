import { getServerAuthSession } from '@/app/server/auth';
import Unauth from '../admin/shared/unauth';

const AuthGuard = async ({children, whichAdmin="admin"}) => {
    const authSession = await getServerAuthSession();

    if (authSession) {
        return (<>{children}</>)
    }
    return (
        <Unauth whichAdmin={whichAdmin}/>
    )
}

export default AuthGuard