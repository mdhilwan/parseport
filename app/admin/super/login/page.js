import '@/styles/global.css'
import Login from "@/app/admin/shared/login";
import { getServerAuthSession } from '@/app/server/auth';

const LoginSuper = async () => {
    const authSession = await getServerAuthSession();

    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        ParsePort: Super Admin
                    </a>
                    <Login whichAdmin={"super"} session={authSession}/>
                </div>
            </section>
        </>
    )
}
export default LoginSuper