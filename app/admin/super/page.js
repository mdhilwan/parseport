import utils from '@/app/utils'
import '../../../styles/global.css'
import Row from './row'

const Super = () => {

    const allUsers = [{
        "companyName": "Coy A",
        "emailAdd": "coy@coy.com",
        "password": { type: "password", value: "somepassword" },
        "address": "some random address",
        "scanCount": "100",
        "pdfCount": "100",
        "active": true,
    }]

    const keyToLabelMap = {
        "companyName": "Company Name",
        "emailAdd": "Email",
        "password": "Password",
        "address": "address",
        "scanCount": "Scan Count",
        "pdfCount": "PDF Generate Count",
        "active": "Active"
    }

    return (
        <div className='p-20'>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th></th>
                            {Object.values(keyToLabelMap).map((label, labelIndex) =>
                                <th scope="col" key={utils.Rand8digit()} className="px-6 py-3">{label}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((userObject, userIndex) =>
                            <Row key={utils.Rand8digit()}
                                userIndex={userIndex}
                                userObject={userObject}/>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Super