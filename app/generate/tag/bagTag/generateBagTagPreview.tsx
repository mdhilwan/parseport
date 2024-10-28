export const GenerateBagTagPreview = () => {
  return (
    <div className="col-span-2">
      <div className="bg-gray-500 rounded flex justify-center items-center h-[calc(100vh-8rem)] space-x-4">
        <div>
          <span className="text-xs text-gray-400 uppercase">Front</span>
          <div className="rounded-xl border border-gray-600 bg-white h-96 w-64 shadow hover:shadow-2xl transition-all shadow-gray-600 hover:shadow-gray-800 hover:-mt-1">
            Hello World
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-400 uppercase">Back</span>
          <div className="rounded-xl border border-gray-600 bg-white h-96 w-64 shadow hover:shadow-2xl transition-all shadow-gray-600 hover:shadow-gray-800 hover:-mt-1">
            Hello World
          </div>
        </div>
      </div>
    </div>
  )
}
