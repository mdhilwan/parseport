import { setTourPackageDetails } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

export const GenerateTagForm = () => {
  const {
    scannedData,
    tourPackageDetails,
    showBagTagModal: { rowKey = 0 },
  } = useAppSelector((state) => state.mrzStore)

  const cloneTourPackageDetails = structuredClone(tourPackageDetails)

  const dispatch = useDispatch()

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
    <div className="col-span-1 max-h-[calc(100vh-16rem)] min-h-[calc(820px-10rem)] overflow-y-scroll overflow-x-hidden relative">
      {/*<pre>{JSON.stringify(cloneTourPackageDetails, undefined, 2)}</pre>*/}
      <h3 className="pb-3 text-sm text-gray-400 uppercase">Personal Details</h3>
      <form className="border border-gray-100 shadow-sm rounded p-4 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="firstName"
            type="text"
            placeholder="John"
            value={scannedData[rowKey].firstName}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            id="lastName"
            placeholder="Doe"
            value={scannedData[rowKey].lastName}
          />
        </div>
      </form>
      <h3 className="py-3 text-sm text-gray-400 uppercase">Package Details</h3>
      <form className="border border-gray-100 shadow-sm rounded p-4 pb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="packageName"
          >
            Tour Package Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            id="packageName"
            placeholder="Umrah 2025"
            value={cloneTourPackageDetails.tourPackageName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              cloneTourPackageDetails.tourPackageName = e.target.value
              dispatch(setTourPackageDetails(cloneTourPackageDetails))
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="packageName"
          >
            Tour ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            id="packageName"
            placeholder="HQB123XYZ"
            value={cloneTourPackageDetails.id}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              cloneTourPackageDetails.id = e.target.value
              dispatch(setTourPackageDetails(cloneTourPackageDetails))
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dates Start and End
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              type="date"
              min={formattedMinDate()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.dates.start = e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              type="date"
              min={formattedMinDate()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.dates.end = e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Makkah Hotels
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              placeholder="Hotel & Towers"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.makkah[0].hotelName =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
              type={'tel'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.makkah[0].hotelContact =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
          </div>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              placeholder="Hilton"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.makkah[1].hotelName =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
              type={'tel'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.makkah[1].hotelContact =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Madinah Hotels
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              placeholder="Oberoi"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.madinah[0].hotelName =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
              type={'tel'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.madinah[0].hotelContact =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
          </div>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              placeholder="Frontel"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.madinah[1].hotelName =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
              type={'tel'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.hotels.madinah[1].hotelContact =
                  e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mutawif Contact
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              placeholder="Ustaz Al-Fulan"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.mutawif.name = e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                cloneTourPackageDetails.mutawif.contact = e.target.value
                dispatch(setTourPackageDetails(cloneTourPackageDetails))
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Flag
          </label>
          <input
            className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
            placeholder="Singapore"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              cloneTourPackageDetails.mutawif.name = e.target.value
              dispatch(setTourPackageDetails(cloneTourPackageDetails))
            }}
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
