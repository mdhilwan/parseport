const StatePhoneConnection = ({ disconnected, setShowQrCodeModal }) => {
  return (
    <div className="mt-3 w-80">
      {disconnected ? (
        <div
          className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-gray-50 rounded-lg shadow"
          role="alert"
        >
          <div className="text-sm font-normal">Phone not connected.</div>
          <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
            <a
              className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-200"
              href="#"
              onClick={() => setShowQrCodeModal(true)}
            >
              Connect
            </a>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center w-full max-w-xs p-4 text-lime-800 bg-lime-50 rounded-lg shadow"
          role="alert"
        >
          <div className="text-sm font-normal">Phone connected.</div>
        </div>
      )}
    </div>
  )
}

export default StatePhoneConnection
