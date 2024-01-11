const Input = ({ colKey, value }) => {
    console.log(colKey, value)
    if (typeof value === 'boolean') {
        const color = value ? 'blue' : 'red'
        const text = value ? 'Active' : 'Inactive'
        return (
            <span className={`bg-${color}-100 text-${color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full`}>{text}</span>
        )
    } if (value.type === 'password') {
        return (
            <input
                type="password"
                aria-label="input"
                disabled
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1 text-xs" value={value} />
        )
    } else {
        return (
            <input
                type="text"
                aria-label="input"
                disabled
                className="bg-gray-100 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1 text-xs" value={value} />
        )
    }

}

export default Input;