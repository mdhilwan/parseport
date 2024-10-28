import { useAppSelector } from '@/app/store'

export const GenerateBagTagForm = () => {
  const {
    scannedData,
    showBagTagModal: { rowKey = 0 },
  } = useAppSelector((state) => state.mrzStore)

  return (
    <div className="col-span-1">
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
            value={scannedData[rowKey].firstName}
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
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              type="date"
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
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
            />
          </div>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              placeholder="Hilton"
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
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
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
            />
          </div>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border border-e-0 rounded-s w-full py-2 px-3 text-gray-700"
              placeholder="Frontel"
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
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
            />
            <input
              className="shadow appearance-none border border-s-0 rounded-e w-full py-2 px-3 text-gray-700"
              placeholder="+1 123 123 2345"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="border border-blue-500 hover:bg-blue-400 hover:text-white text-blue-500 text-sm font-semibold px-3 py-2 rounded"
            type="button"
          >
            Save package
          </button>
        </div>
      </form>
    </div>
  )
}
