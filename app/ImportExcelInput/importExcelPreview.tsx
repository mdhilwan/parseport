import { maskData } from '@/app/parsedTable/input'
import { useAppSelector } from '@/app/store'

const ImportExcelPreview = () => {
  const { excelImportData, maskPassportDetails } = useAppSelector(
    (state) => state.mrzStore
  )

  return (
    <>
      {excelImportData.table?.length > 0 && (
        <div className="border-t pt-4 mt-5">
          <h3 className="font-semibold leading-6">Sample Preview:</h3>
          <div className="overflow-scroll">
            <table className="table table-auto text-left whitespace-nowrap text-sm">
              <thead>
                <tr>
                  {excelImportData.table[0].map(
                    (label: string, labelKey: number) => (
                      <td
                        key={labelKey}
                        className="px-2 py-1 border border-slate-300 capitalize bg-gray-100 font-semibold"
                      >
                        {label}
                      </td>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[...excelImportData.table].slice(1, 6).map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex}>
                      {row.map((col: string, colIndex: number) => {
                        return (
                          <td
                            key={colIndex}
                            className="px-2 py-1 border border-slate-300"
                          >
                            {!maskPassportDetails ? col : maskData(col)}
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
