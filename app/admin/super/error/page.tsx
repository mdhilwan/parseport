import Logo from '@/app/logo'
import '@/styles/global.css'

const SuperError = () => {
  return (
    <section id="background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full bg-[#FFD25A33] border border-[#FFD25A] rounded-md shadow mt-4 sm:max-w-md xl:p-0 ">
          <div className="p-6 sm:p-8">
            <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 mb-4">
              There seems to be a problem.
            </h1>
            <p className="text-gray-900">
              You are trying to use this application with an account that does
              not have access.
            </p>
            <p className="text-gray-900">
              Try again or reach out to your administrator.
            </p>
            <a
              href="/"
              className={
                'me-4 mt-4 border focus:outline-none font-medium rounded-full text-xs px-2 py-1.5 text-center inline-flex items-center focus:border-yellow-600 border-yellow-700 bg-yellow-500 hover:bg-yellow-400 text-yellow-800'
              }
            >
              Try again?
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuperError
