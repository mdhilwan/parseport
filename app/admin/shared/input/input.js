import { useEffect, useState } from "react"

const Input = ({ value, colKey, disabled, userObject, setUserObject }) => {

    const [val, setVal] = useState(value)

    const baseClassVar = "border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1 text-xs"
    const classNameVar = () => disabled ? baseClassVar + " bg-gray-100" : baseClassVar

    useEffect(() => {
        userObject[colKey] = val
        setUserObject(userObject)
    }, [val])

    if (typeof value === 'boolean') {
        const color = value ? 'blue' : 'red'
        const text = value ? 'Active' : 'Inactive'
        return (
            <span className={`bg-${color}-100 text-${color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full`}>{text}</span>
        )
    } else {
        if (disabled) {
            return (
                <input
                    type="text"
                    aria-label="input"
                    disabled
                    readOnly
                    className={classNameVar()} value={val ? val : ''} />
            )
        } 
        return (
            <input
                type="text"
                aria-label="input"
                onChange={el => setVal(el.target.value)}
                className={classNameVar()} value={val ? val : ''} />
        )
    }

}

export default Input;