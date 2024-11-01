import BackBagTag from '@/app/generate/tag/bagTag/back'
import FrontBagTag from '@/app/generate/tag/bagTag/front'

const TagButtons = () => (
  <div className="absolute bottom-4 center">
    <TagButton active={true} label="Luggage Tags" />
    <TagButton disabled={true} label="Lanyards (coming soon)" />
  </div>
)

const PackageButtons = () => (
  <div className="absolute top-4 center">
    <TagButton active={true} label="Umrah / Hajj Tags" />
    <TagButton disabled={true} label="Generic Tour Tags (coming soon)" />
  </div>
)

type TagButtonType = { label: string; disabled?: boolean; active?: boolean }

const TagButton = (tagButtonProp: TagButtonType) => {
  const { label, disabled = false, active = false } = tagButtonProp
  const baseClassName = `mt-3 mr-3 inline-flex w-full justify-center rounded-md ${active ? 'ring-gray-100 text-gray-200' : 'bg-gray-500 ring-gray-400 text-gray-400'} px-3 py-2 text-xs shadow-sm ring-1 ring-inset ${disabled || active ? '' : 'hover:bg-gray-50'} sm:mt-0 sm:w-auto`
  return (
    <button
      type="button"
      disabled={disabled}
      className={baseClassName}
      onClick={() => {}}
    >
      {label}
    </button>
  )
}
export const GenerateTagPreview = () => {
  return (
    <div className="col-span-2">
      <div className="bg-gray-500 rounded flex justify-center items-center h-[calc(100vh-16rem)] min-h-[calc(820px-10rem)] shadow-inner border border-gray-600 relative overflow-hidden">
        <TagButtons />
        <FrontBagTag />
        <BackBagTag />
        <PackageButtons />
      </div>
    </div>
  )
}
