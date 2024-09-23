import LoginAdmin from '@/app/admin/login/page'
import Login from '@/app/admin/shared/login'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import { getServerAuthSession } from '@/app/server/auth'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Mock the getServerAuthSession function
jest.mock('@/app/server/auth', () => ({
  getServerAuthSession: jest.fn(),
}))

// Mock the Login component
jest.mock('@/app/admin/shared/login', () =>
  jest.fn(() => <div data-testid="mockLogin" />)
)

describe('LoginAdmin', () => {
  it('renders the Login component with correct props when session is fetched', async () => {
    // Mock the server-side session response
    const mockSession = { user: { name: 'Admin' }, expires: 'some-date' }
    ;(getServerAuthSession as jest.Mock).mockResolvedValueOnce(mockSession)

    // Render the component
    render(await LoginAdmin())

    // Check if the section with data-testid is rendered
    const section = screen.getByTestId('LoginAdmin')
    expect(section).toBeInTheDocument()

    // Check if the "Passport to Visa" text is displayed
    expect(screen.getByText('Passport to Visa')).toBeInTheDocument()

    // Check if the Login component is rendered with correct props
    expect(Login).toHaveBeenCalledWith(
      {
        whichAdmin: WhichAdmin.ADMIN,
        session: mockSession,
      },
      {}
    )

    // Check if the mock login component is rendered
    expect(screen.getByTestId('mockLogin')).toBeInTheDocument()
  })
})
