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
    const mockSession = { user: { name: 'Admin' }, expires: 'some-date' }
    ;(getServerAuthSession as jest.Mock).mockResolvedValueOnce(mockSession)

    render(LoginAdmin())

    const section = screen.getByTestId('unauth')
    expect(section).toBeInTheDocument()

    expect(screen.getByTestId('logo-medium')).toBeInTheDocument()

    expect(Login).toHaveBeenCalledWith(
      {
        whichAdmin: WhichAdmin.NONE,
      },
      {}
    )

    // Check if the mock login component is rendered
    expect(screen.getByTestId('mockLogin')).toBeInTheDocument()
  })
})
