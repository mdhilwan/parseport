import utils from '@/app/utils'
import '@/styles/global.css'
import Row from './row'
import Controls from '../shared/controls';
import AuthGuard from '@/app/authGuard';
import { getServerAuthSession } from '@/app/server/auth';

const keyToLabelMap = {
    "companyName": "Company Name",
    "emailAdd": "Email",
    "auth": "Auth",
    "address": "address",
    "scanCount": "Total Scans",
    "pdfCount": "Total PDFs",
    "billed": "Billed",
    "active": "Active"
}

const Super = async () => {

    const authSession = await getServerAuthSession();

    const allUsers = [{
        "companyName": "Coy A",
        "emailAdd": "coya@gmail.com",
        "auth": "Google",
        "address": "some random address",
        "scanCount": "100",
        "pdfCount": "100",
        "billed": "$2.00",
        "active": true,
    }, {
        "companyName": "Coy B",
        "emailAdd": "coyb@gmail.com",
        "auth": "Google",
        "address": "some random address",
        "scanCount": "100",
        "pdfCount": "100",
        "billed": "$2.00",
        "active": true,
    }]

    return (
        <AuthGuard whichAdmin='super'>
            <div className='p-4'>
                <div className="relative overflow-x-auto">
                    <Controls whichAdmin={"super"} session={authSession} />
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th></th>
                                {Object.values(keyToLabelMap).map((label, labelIndex) =>
                                    <th scope="col" key={utils.Rand8digit()} className="px-2 py-1">{label}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((userObject, userIndex) =>
                                <Row key={utils.Rand8digit()}
                                    userIndex={userIndex}
                                    userObject={userObject} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthGuard>
    )
}

export default Super