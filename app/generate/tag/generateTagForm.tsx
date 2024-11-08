import { Input } from '@/app/generate/tag/input'
import { Label } from '@/app/generate/tag/label'
import { useAppSelector } from '@/app/store'

export const GenerateTagForm = () => {
  const {
    scannedData,
    tourPackageDetails,
    showBagTagModal: { rowKey = 0 },
  } = useAppSelector((state) => state.mrzStore)

  const cloneTourPackageDetails = structuredClone(tourPackageDetails)
  const formattedMinDate = () => {
    if (cloneTourPackageDetails.dates.start) {
      return cloneTourPackageDetails.dates.start
    }
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="col-span-1 max-h-[calc(1000px-16rem)] min-h-[calc(820px-10rem)] overflow-y-scroll overflow-x-hidden relative">
      <pre>{JSON.stringify(cloneTourPackageDetails, undefined, 2)}</pre>
      <h3 className="pb-3 text-sm text-gray-400 uppercase">Personal Details</h3>
      <form className="border border-gray-100 shadow-sm rounded p-4 mb-4">
        <div className="mb-4">
          <Label label={'First Name'} htmlFor={'firstName'} />
          <Input
            value={scannedData[rowKey].firstName}
            placeholder={'John'}
            id={'firstName'}
            disabled={true}
          />
        </div>
        <div>
          <Label label={'Last Name'} htmlFor={'lastName'} />
          <Input
            value={scannedData[rowKey].lastName}
            placeholder={'Doe'}
            id={'lastName'}
            disabled={true}
          />
        </div>
      </form>
      <h3 className="py-3 text-sm text-gray-400 uppercase">Package Details</h3>
      <form className="border border-gray-100 shadow-sm rounded p-4 pb-4">
        <div className="mb-4">
          <Label label={'Tour ID'} htmlFor={'tourId'} />
          <Input
            formObj={cloneTourPackageDetails}
            itemKey={'id'}
            id={'tourId'}
            placeholder={'HQB123XYZ'}
          />
        </div>
        <div className="mb-4">
          <Label label={'Tour Package Name'} htmlFor={'packageName'} />
          <Input
            formObj={cloneTourPackageDetails}
            itemKey={'tourPackageName'}
            id={'packageName'}
            placeholder={'Umrah 2025'}
          />
        </div>
        <div className="mb-4">
          <Label label={'Dates Start and End'} htmlFor={'startDate'} />
          <div className="flex">
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'dates.start'}
              id={'startDate'}
              placeholder={'01/01/2025'}
              type={'date'}
              classNameOverwrite={'border-e-0 rounded-e-none'}
            />
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'dates.end'}
              id={'endDate'}
              min={formattedMinDate()}
              placeholder={'02/02/2025'}
              type={'date'}
              classNameOverwrite={'border-s-0 rounded-s-none'}
            />
          </div>
        </div>
        <div className="mb-4">
          <Label label={'Makkah Hotels'} htmlFor={'makkahHotels1'} />
          <div className="flex">
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.makkah[0].hotelName'}
              id={'makkahHotels1'}
              placeholder={'Hotel & Towers'}
              classNameOverwrite={'border-e-0 rounded-e-none'}
            />
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.makkah[0].hotelContact'}
              id={'makkahHotels1number'}
              placeholder={'+1 123 123 2345'}
              type={'tel'}
              classNameOverwrite={'border-s-0 rounded-s-none'}
            />
          </div>
          <div className="flex mt-4">
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.makkah[1].hotelName'}
              id={'makkahHotels2'}
              placeholder={'Hilton'}
              classNameOverwrite={'border-e-0 rounded-e-none'}
            />
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.makkah[1].hotelContact'}
              id={'makkahHotels2number'}
              placeholder={'+1 123 123 2345'}
              type={'tel'}
              classNameOverwrite={'border-s-0 rounded-s-none'}
            />
          </div>
        </div>
        <div className="mb-4">
          <Label label={'Madinah Hotels'} htmlFor={'madinahHotels1'} />
          <div className="flex">
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.madinah[0].hotelName'}
              id={'madinahHotels1'}
              placeholder={'Oberoi'}
              classNameOverwrite={'border-e-0 rounded-e-none'}
            />
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.madinah[0].hotelContact'}
              id={'madinahHotels1number'}
              placeholder={'+1 123 123 2345'}
              type={'tel'}
              classNameOverwrite={'border-s-0 rounded-s-none'}
            />
          </div>
          <div className="flex mt-4">
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.madinah[1].hotelName'}
              id={'madinahHotels2'}
              placeholder={'Frontel'}
              classNameOverwrite={'border-e-0 rounded-e-none'}
            />
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'hotels.madinah[1].hotelContact'}
              id={'madinahHotels2number'}
              placeholder={'+1 123 123 2345'}
              type={'tel'}
              classNameOverwrite={'border-s-0 rounded-s-none'}
            />
          </div>
        </div>
        <div className="mb-4">
          <Label label={'Mutawif Contact'} htmlFor={'mutawifName'} />
          <div className="flex">
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'mutawif.name'}
              id={'mutawifName'}
              placeholder={'Ustaz Al-Fulan'}
              classNameOverwrite={'border-e-0 rounded-e-none'}
            />
            <Input
              formObj={cloneTourPackageDetails}
              itemKey={'mutawif.contact'}
              id={'mutawifContact'}
              placeholder={'+1 123 123 2345'}
              type={'tel'}
              classNameOverwrite={'border-s-0 rounded-s-none'}
            />
          </div>
        </div>
        <div className="mb-4">
          <Label label={'Flag'} htmlFor={'flag'} />
          <Input
            formObj={cloneTourPackageDetails}
            itemKey={'flag'}
            id={'flag'}
            placeholder={'Singapore'}
          />
        </div>
        <div className="flex sticky bottom-0">
          <button
            className="border border-blue-500 bg-white hover:bg-blue-400 hover:text-white text-blue-500 text-xs font-semibold px-3 py-2 me-2 rounded"
            type="button"
          >
            Save package for future
          </button>
          <button
            className="border border-gray-500 bg-white hover:bg-gray-400 hover:text-white text-gray-500 text-xs font-semibold px-3 py-2 rounded"
            type="button"
          >
            Load past package
          </button>
        </div>
      </form>
    </div>
  )
}
