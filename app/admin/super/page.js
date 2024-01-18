import utils from '@/app/utils'
import '@/styles/global.css'
import Row from './row'
import Controls from '../shared/controls';
import AuthGuard from '@/app/authGuard';
import { getServerAuthSession } from '@/app/server/auth';
import { HttpActions } from '@/app/api/httpActions';

const keyToLabelMap = {
    "company": "Company Name",
    "companyAddress": "Company Address",
    "companyNumber": "Number",
    "emailAddress": "Email Address",
    "scanCount": "Total Scans",
    "pdfCount": "Total PDFs",
    "billed": "Billed",
    "active": "Active"
}

const Super = async () => {

    const authSession = await getServerAuthSession()
    const { res: { result } } = await HttpActions.GetAllUsers()

    return (
        <AuthGuard whichAdmin='super'>
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
                        {result.map((userObject, userIndex) =>
                            <Row key={utils.Rand8digit()}
                                session={authSession}
                                userIndex={userIndex}
                                userObject={userObject} />
                        )}
                    </tbody>
                </table>
            </div>
        </AuthGuard>
    )
}

export default Super