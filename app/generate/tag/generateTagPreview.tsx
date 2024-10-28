import BackBagTag from '@/app/generate/tag/bagTag/back'
import FrontBagTag from '@/app/generate/tag/bagTag/front'

const TagButtons = () => (
  <div className="absolute top-4 left-4">
    <TagButton label="Bag Tags" />
    <TagButton label="Lanyards" />
  </div>
)

const TagButton = ({ label }: { label: string }) => {
  return (
    <button
      type="button"
      className="mt-3 mr-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      onClick={() => {}}
    >
      {label}
    </button>
  )
}
export const GenerateTagPreview = () => {
  return (
    <div className="col-span-2">
      <div className="bg-gray-500 rounded flex justify-center items-center h-[calc(100vh-16rem)] space-x-8 shadow-inner border border-gray-600 relative overflow-hidden">
        <TagButtons />
        <FrontBagTag />
        <BackBagTag />
      </div>
    </div>
  )
}
