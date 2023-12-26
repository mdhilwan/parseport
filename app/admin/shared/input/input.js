const Input = ({colKey, value}) => {
    if (typeof value === 'boolean' && value) {
        return (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{colKey}</span>
        )
    } if (value.type === 'password') {
        return (
            <input 
                type="password" 
                aria-label="input" 
                disabled
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={value} />
        )
    } else {
        return (
            <input
                type="text"
                aria-label="input"
                disabled
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={value} />
        )
    }
    
}

export default Input;