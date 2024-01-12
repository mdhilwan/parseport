import '@/styles/global.css'
import AuthGuard from "@/app/authGuard"
import Controls from "@/app/admin/shared/controls"
import { getServerAuthSession } from '@/app/server/auth';

const AddAccount = async () => {

    const authSession = await getServerAuthSession()

    return (
        <AuthGuard whichAdmin='super'>
            <div className="relative overflow-x-auto">
                <Controls whichAdmin={"super"} session={authSession} />
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="name@flowbite.com" required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="company" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Company Name</label>
                        <input type="text" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="companyAddress" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Company Address</label>
                        <input type="text" id="companyAddress" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="companyNumber" className="block mb-2 text-xs font-medium text-gray-900 uppercase">Number</label>
                        <input type="tel" id="companyNumber" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2" placeholder="Company Co Pte Ltd" required/>
                    </div>
                    
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                </form>

            </div>
        </AuthGuard>
    )
}

export default AddAccount