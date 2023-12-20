import { useState } from "react"

const Input = ({val, onChange}) => {
    const [currentValue, setValue] = useState(val)
    return <input 
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 w-full" 
        onChange={evt => {
            setValue(evt.target.value)
            onChange(evt)
        }}
        type="text" 
        value={currentValue}/>
}

export default Input