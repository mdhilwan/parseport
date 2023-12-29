import utils from "@/app/utils"
import Input from "@/app/admin/shared/input"

const Row = ({ userIndex, userObject }) => {
    return (
        <tr key={userIndex} className="bg-white border-b border-gray-200">
            <td className="whitespace-nowrap">
                <button type="button" className="text-slate-700 bg-slate-300 hover:bg-slate-400 hover:border-slate-500 font-light rounded-s text-xs px-1.5 py-0.5 border border-slate-400">Edit</button>
                <button type="button" className="text-slate-700 bg-slate-100 hover:bg-red-800 hover:text-slate-50 hover:border-red-900 font-light text-xs px-1.5 py-0.5 border border-slate-200">Del</button>
                <button type="button" className="text-slate-700 bg-slate-100 hover:bg-red-800 hover:text-slate-50 hover:border-red-900 font-light rounded-e text-xs px-1.5 py-0.5 border border-slate-200">Deactivate</button>
            </td>
            {Object.entries(userObject).map(([colKey, value], colIndex) => {
                const thisKey = utils.Rand8digit()
                if (colIndex === 0) {
                    return <th key={thisKey} scope='row' className='font-medium text-gray-900 whitespace-nowrap'>
                        <Input value={value} colKey={colKey} />
                    </th>
                } else
                return <td key={thisKey} className="text-center">
                    <Input value={value} colKey={colKey} />
                </td>
            })}
        </tr>
    )
}

export default Row;