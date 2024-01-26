"use client"

import download from "downloadjs";
import Input from "./input";

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

    const baseLabelClassName = "pe-3 font-bold whitespace-nowrap"

    const generateVisa = async (visaData) => {
        const doGenerate = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/generate-visa`, {
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
                <table className="table table-auto w-full">
                    <thead>
                        <tr>
                            {tableLabel.map((label, labelIndex) => {
                                const key = `${label}-${labelIndex}`.replaceAll(/ /g, '')
                                const labelClassName = ['First Name', 'Last Name'].includes(label) ? baseLabelClassName + " w-72" : baseLabelClassName + " w-28" 
                                return <td key={key} className={labelClassName}>
                                    {label}
                                </td>
                            })}
                            <td>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((row, rowIndex) => <tr key={rowIndex}>
                            {Object.entries(row).map((col, colIndex) => {
                                return <td key={colIndex} className="py-1">
                                    <Input 
                                        val={col[1]} 
                                        onChange={evt => row[col[0]] = evt.target.value}
                                    />
                                </td>
                            })}
                            <td>
                                <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                                    onClick={() => generateVisa(row)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataslot="icon" className="w-6 h-6">
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