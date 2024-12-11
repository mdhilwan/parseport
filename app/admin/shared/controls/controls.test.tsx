import Controls from '@/app/admin/shared/controls'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import { GetType } from '@/app/server/allowed'
import { setShowQrCodeModal } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { signOut } from 'next-auth/react'

jest.mock('@/app/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}))

// Mock the signOut function
jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}))

// Mock the GetType function
jest.mock('@/app/server/allowed', () => ({
  GetType: jest.fn(),
}))

// Mock the statePhoneConnection
jest.mock('@/app/statePhoneConnection', () =>
  jest.fn(() => <div data-testid="statePhoneConnection" />)
)

describe('Controls', () => {
  const mockDispatch = jest.fn()
  const mockAppSelector = jest.fn()
  const mockSetShowQrCodeModal = jest.fn()

  const baseSession = {
    user: {
      email: 'admin@example.com',
      name: 'Admin User',
      image: '/avatar.png',
      res: {
        result: {
          company: '',
          demo: false,
        },
      },
    },
    sessionId: '12345',
  }

  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    jest.resetAllMocks()
    process.env = { ...originalEnv } // Reset process.env before each test
    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'
    ;(useAppDispatch as unknown as jest.Mock)
      .mockReturnValue(mockDispatch)(setShowQrCodeModal as unknown as jest.Mock)
      .mockImplementation(mockSetShowQrCodeModal)
    ;(useAppSelector as unknown as jest.Mock).mockReturnValue(mockAppSelector)
  })

  afterEach(() => {
    process.env = originalEnv // Restore original process.env
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it('renders with basic admin controls', () => {
    render(<Controls whichAdmin={WhichAdmin.ADMIN} session={baseSession} />)

    // Check that ControlLinks are rendered correctly
    expect(screen.getByText('Passports')).toHaveAttribute('href', '/')
    expect(screen.getByText('Settings')).toHaveAttribute('href', '/admin')
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('renders with super admin controls', () => {
    ;(GetType as jest.Mock).mockReturnValueOnce(WhichAdmin.SUPER)

    render(<Controls whichAdmin={WhichAdmin.SUPER} session={baseSession} />)

    // Check for super admin specific links
    expect(screen.getByText('Super')).toHaveAttribute(
      'href',
      'http://localhost:3000/admin/super'
    )
    expect(screen.getByText('Add Account')).toHaveAttribute(
      'href',
      'http://localhost:3000/admin/super/add'
    )
  })

  it('calls signOut with the correct callback URL', async () => {
    render(<Controls whichAdmin={WhichAdmin.ADMIN} session={baseSession} />)

    const logoutLink = screen.getByText('Logout')

    // Simulate a click event
    fireEvent.click(logoutLink)

    // Assert that signOut was called with the correct callbackUrl
    expect(signOut).toHaveBeenCalledWith({
      callbackUrl: 'http://localhost:3000/admin/login',
    })
  })

  it('renders super admin control links based on email type', () => {
    ;(GetType as jest.Mock).mockReturnValue(WhichAdmin.SUPER)

    render(<Controls whichAdmin={WhichAdmin.SUPER} session={baseSession} />)

    // Ensure the "Super" and "Add Account" links are rendered based on email type
    expect(screen.getByText('Super')).toBeInTheDocument()
    expect(screen.getByText('Add Account')).toBeInTheDocument()
  })

  it('does not render super admin links for regular admins', () => {
    ;(GetType as jest.Mock).mockReturnValue(WhichAdmin.ADMIN)

    render(<Controls whichAdmin={WhichAdmin.ADMIN} session={baseSession} />)

    // Ensure "Super" and "Add Account" links are not rendered for regular admins
    expect(screen.queryByText('Super')).not.toBeInTheDocument()
    expect(screen.queryByText('Add Account')).not.toBeInTheDocument()
  })
})
