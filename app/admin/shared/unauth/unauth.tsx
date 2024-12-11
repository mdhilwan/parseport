import { WhichAdmin } from '@/app/enums/whichAdmin'
import Logo from '@/app/logo'
import Login from '../login'

type UnauthType = {
  whichAdmin?: WhichAdmin
}

const Unauth = (props: UnauthType) => {
  const { whichAdmin = WhichAdmin.NONE } = props

  return (
    <section
      id="background"
      data-testid={`unauth${whichAdmin ? '-' + whichAdmin : ''}`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo className={'mb-12'} />
        <Login whichAdmin={whichAdmin} />
      </div>
    </section>
  )
}

export default Unauth
