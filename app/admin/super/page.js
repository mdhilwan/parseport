import utils from '@/app/utils'
import '../../../styles/global.css'
import Row from './row'

const Super = () => {

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

    return (
        <div className='p-4'>
            <div className="relative overflow-x-auto">
                <div className='py-5'>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 hover:border-green-900 font-light rounded-s text-xs px-1.5 py-0.5 border border-green-700">Add Account</button>
                    <button type="button" className="text-slate-700 bg-slate-300 hover:bg-slate-400 hover:border-slate-500 font-light rounded-e text-xs px-1.5 py-0.5 border border-slate-400">Logout</button>
                </div>
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
    )
}

export default Super