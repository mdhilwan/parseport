import utils from "@/app/utils"
import Input from "../shared/input"

const Row = ({ userIndex, userObject }) => {
    return (
        <tr key={userIndex} className="bg-white border-b border-gray-200">
            <td>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-light rounded-lg text-sm px-2.5 py-1 me-1">Edit</button>
                <button type="button" className="text-slate-700 bg-slate-100 hover:bg-red-800 hover:text-slate-50 focus:ring-4 focus:ring-slate-300 font-light rounded-lg text-sm px-2.5 py-1 me-1">Del</button>
                <button type="button" className="text-slate-700 bg-slate-100 hover:bg-red-800 hover:text-slate-50 focus:ring-4 focus:ring-slate-300 font-light rounded-lg text-sm px-2.5 py-1">Deactivate</button>
            </td>
            {Object.entries(userObject).map(([colKey, value], colIndex) => {
                const thisKey = utils.Rand8digit()
                if (colIndex === 0) {
                    return <th key={thisKey} scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                        <Input value={value} colKey={colKey} />
                    </th>
                }
                return <td key={thisKey} className="px-6 py-4">
                    <Input value={value} colKey={colKey} />
                </td>
            })}
        </tr>
    )
}

export default Row;