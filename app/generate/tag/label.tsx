type LabelType = {
  label: string
  htmlFor: string
}

export const Label = (props: LabelType) => {
  const { label, htmlFor } = props
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={htmlFor}
      >
        {label}
      </label>
    </>
  )
}
