import '@/styles/global.css'

const SuperError = () => {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          Passport to Visa
        </h1>
        <div className="w-full bg-white rounded-md shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 sm:p-8">
            <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 mb-4">
              There seems to be a problem
            </h1>
            <p className="text-gray-500">
              You are trying to use this application with an account that does
              not have access to this application.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuperError
