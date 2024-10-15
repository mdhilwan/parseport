type InputType = {
  label: string
  id: string
  type?: string
  required?: boolean
  value?: string
  placeholder?: string
  option?: string[]
  onChange?: (e: any) => void
  onFocus?: (e: any) => void
  className?: string
}

export const Input = (props: InputType) => {
  const { label, id, type, option } = props
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-xs font-medium text-gray-900 uppercase"
      >
        {label}
      </label>
      {type && type === 'select' && option && option.length > 0 ? (
        <select
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2"
          {...props}
        >
          {option.map((opt: any, i: number) => (
            <option key={i} value={opt === 'Demo' ? 'true' : 'false'}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2"
          type="text"
          {...props}
        />
      )}
    </div>
  )
}
