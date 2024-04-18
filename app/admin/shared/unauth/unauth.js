import Login from '../login'

const { default: Link } = require('next/link')

const Unauth = ({ whichAdmin }) => {
  const linkUrl = whichAdmin === 'super' ? './super/login' : './admin/login'
  const headText = () => {
    if (whichAdmin === 'super') {
      return ': Super Admin'
    } else if (whichAdmin === 'admin') {
      return ': Admin'
    } else {
      return ''
    }
  }
  const baseColor =
    'w-full block mt-5 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
  const linkClassName =
    whichAdmin === 'super'
      ? baseColor + ' bg-red-600 hover:bg-red-700 '
      : baseColor + ' bg-blue-600 hover:bg-blue-700 '

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          Passport to Visa{headText()}
        </h1>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 sm:p-8">
            <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 mb-4">
              You are not logged in
            </h1>
            <Login whichAdmin={whichAdmin} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Unauth
