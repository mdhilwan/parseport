import { useEffect, useState } from "react"

const Input = ({val, onChange}) => {
    const [currentValue, setValue] = useState(val)
    const baseClassName = "border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 w-full" 
    const isDateType = !isNaN(new Date(val));
    const defaultType = isDateType ? "date" : "text"

    return <input 
        className={baseClassName}
        onChange={evt => {
            setValue(evt.target.value)
            onChange(evt)
        }}
        type={defaultType}
        value={currentValue}/>
}

export default Input