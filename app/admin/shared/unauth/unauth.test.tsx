import Unauth from '@/app/admin/shared/unauth'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Mock the Login component
// eslint-disable-next-line react/display-name
jest.mock('../login', () => ({ whichAdmin }: { whichAdmin: WhichAdmin }) => (
  <div data-testid="LoginMock">Login Component - {whichAdmin}</div>
))

describe('Unauth component', () => {
  it('renders the Unauth component', () => {
    render(<Unauth />)

    // Check that the Unauth component renders correctly
    const sectionElement = screen.getByTestId('Unauth')
    expect(sectionElement).toBeInTheDocument()

    // Check default heading text (without whichAdmin prop)
    const headingElement = screen.getByText('Passport to Visa')
    expect(headingElement).toBeInTheDocument()

    // Check "You are not logged in" text
    const notLoggedInText = screen.getByText('You are not logged in')
    expect(notLoggedInText).toBeInTheDocument()
  })

  it('renders the correct heading for super admin', () => {
    render(<Unauth whichAdmin={WhichAdmin.SUPER} />)

    // Check that the heading includes ": Super Admin"
    const headingElement = screen.getByText('Passport to Visa')
    expect(headingElement).toBeInTheDocument()
  })

  it('renders the correct heading for regular admin', () => {
    render(<Unauth whichAdmin={WhichAdmin.ADMIN} />)

    // Check that the heading includes ": Admin"
    const headingElement = screen.getByText('Passport to Visa')
    expect(headingElement).toBeInTheDocument()
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
