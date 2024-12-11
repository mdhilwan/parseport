import Unauth from '@/app/admin/shared/unauth'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// eslint-disable-next-line react/display-name
jest.mock('../login', () => ({ whichAdmin }: { whichAdmin: WhichAdmin }) => (
  <div data-testid="LoginMock">Login Component - {whichAdmin}</div>
))

describe('Unauth component', () => {
  it('renders the Unauth component', () => {
    render(<Unauth />)

    const sectionElement = screen.getByTestId('unauth')
    expect(sectionElement).toBeInTheDocument()
  })

  it('renders the correct heading for super admin', () => {
    render(<Unauth whichAdmin={WhichAdmin.SUPER} />)
    expect(screen.getByTestId('unauth-super')).toBeInTheDocument()
  })

  it('renders the correct heading for regular admin', () => {
    render(<Unauth whichAdmin={WhichAdmin.ADMIN} />)
    expect(screen.getByTestId('unauth-admin')).toBeInTheDocument()
  })

  it('passes the correct whichAdmin prop to the Login component', () => {
    render(<Unauth whichAdmin={WhichAdmin.ADMIN} />)

    // Check that the Login component receives the correct whichAdmin prop
    const loginComponent = screen.getByTestId('LoginMock')
    expect(loginComponent).toHaveTextContent('Login Component - admin')
  })

  it('renders the Login component with default whichAdmin value', () => {
    render(<Unauth />)

    // Check that the Login component receives the default whichAdmin prop (NONE)
    const loginComponent = screen.getByTestId('LoginMock')
    expect(loginComponent).toHaveTextContent('Login Component -')
  })
})
