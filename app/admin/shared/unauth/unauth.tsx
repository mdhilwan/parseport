import { WhichAdmin } from '@/app/enums/whichAdmin'
import Login from '../login'

type UnauthType = {
  whichAdmin?: WhichAdmin
}

const Unauth = (props: UnauthType) => {
  const { whichAdmin = WhichAdmin.NONE } = props
  const headText = () => {
    if (whichAdmin === WhichAdmin.SUPER) {
      return ': Super Admin'
    } else if (whichAdmin === WhichAdmin.ADMIN) {
      return ': Admin'
    } else {
      return ''
    }
  }

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          Passport to Visa{headText()}
        </h1>
        <div className="w-full bg-white rounded-md shadow md:mt-0 sm:max-w-md xl:p-0 ">
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
