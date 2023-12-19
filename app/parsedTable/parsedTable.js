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

    return <>
        {
            parsed.length > 0 ? 
                <table className="table table-auto border">
                    <thead>
                        <tr>
                            {tableLabel.map(label => <td className="px-3 font-bold">{label}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(row => <tr>
                            {Object.entries(row).map(col => <td className="px-3">{col[1]}</td>)}
                        </tr>)}
                    </tbody>
                </table>
                
                : ''
        }
    </>
}

export default ParsedTable