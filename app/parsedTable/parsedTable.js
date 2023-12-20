import download from "downloadjs";

const tableLabelMap = {
    "issuingState": "Issuing State",
    "firstName": "First Name",
    "lastName": "Last Name",
    "documentNumber": "Passport Number",
    "nationality": "Nationality",
    "birthDate": "Date of Birth",
    "sex": "Sex",
    "expirationDate": "Date of Expiry",
    "personalNumber": "IC Number"
}

const tableLabelKeys = Object.keys(tableLabelMap);

const ParsedTable = ({parsed}) => {
    const filtered = parsed.map(row => 
        Object.fromEntries(Object.entries(row).filter(r => 
            tableLabelKeys.includes(r[0]))))

    const tableLabel = filtered[0] ? Object.keys(filtered[0]).map(k => tableLabelMap[k]) : []

    const generateVisa = async (visaData) => {
        const doGenerate = await fetch(`http://192.168.1.166:4001/api/generate/${visaData.documentNumber}`, {
            body: JSON.stringify({data: visaData}),
            headers: new Headers({'content-type': 'application/json'}),
            method: "POST"
        })
        const generateRes = await doGenerate.blob()
        download(generateRes, visaData.documentNumber);
    }

    return <>
        {
            parsed.length > 0 ? 
                <table className="table table-auto border">
                    <thead>
                        <tr>
                            {tableLabel.map(label => <td className="px-3 font-bold">{label}</td>)}
                            <td className="px-3 font-bold">
                                Visa
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(row => <tr>
                            {Object.entries(row).map(col => <td className="px-3">{col[1]}</td>)}
                            <td>
                                <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 ps-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                    onClick={() => generateVisa(row)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                                    </svg>
                                    Generate
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                : 
                <div>
                    <div className='text-slate-400 text-2xl'>Awaiting scans...</div>
                    <div className="text-slate-500">Use your phone that you have linked this computer with to scan your document</div>
                </div>
        }
    </>
}

export default ParsedTable