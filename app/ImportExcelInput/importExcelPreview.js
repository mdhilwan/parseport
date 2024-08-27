import { useSelector } from 'react-redux'

const ImportExcelPreview = () => {
  const { excelImportData } = useSelector(
    (state) => state.mrzStore
  )

  return (
    <>
      {excelImportData.table?.length > 0 && (
        <div className="border-t pt-4 mt-5">
          <h3 className="font-semibold leading-6">
            Sample Preview:
          </h3>
          <div className="overflow-scroll">
            <table className="table table-auto text-left whitespace-nowrap text-sm">
              <thead>
                <tr>
                  {excelImportData.table[0].map((label, labelKey) => (
                    <td key={labelKey} className="px-2 py-1 border border-slate-300 capitalize bg-gray-100 font-semibold">
                      {label}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...excelImportData.table].slice(1, 6).map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex}>
                      {row.map((col, colIndex) => {
                        return (
                          <td
                            key={colIndex}
                            className="px-2 py-1 border border-slate-300"
                          >
                            {col}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export { ImportExcelPreview }
