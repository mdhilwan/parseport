import Login from '@/app/admin/shared/login'
import { WhichAdmin } from '@/app/enums/whichAdmin'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Mock next-auth and next/navigation
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Login component', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    mockPush.mockClear()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  it('redirects to home if session exists', () => {
    render(
      <Login whichAdmin={WhichAdmin.ADMIN} session={{ user: 'testUser' }} />
    )

    // Expect router.push to be called with "./" when session exists
    expect(mockPush).toHaveBeenCalledWith('./')
  })

  it('does not redirect if session does not exist', () => {
    render(<Login whichAdmin={WhichAdmin.ADMIN} session={null} />)

    // Expect router.push not to be called when session is null
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('calls signIn with the correct callback URL for regular admin', async () => {
    render(<Login whichAdmin={WhichAdmin.ADMIN} session={null} />)

    const button = screen.getByRole('button', {
      name: /Continue with Google/i,
    })

    // Simulate form submission
    fireEvent.click(button)

    // Expect signIn to be called with 'google' and the correct callback URL for regular admin
    expect(signIn).toHaveBeenCalledWith('google', {
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    })
  })

  it('calls signIn with the correct callback URL for super admin', async () => {
    render(<Login whichAdmin={WhichAdmin.SUPER} session={null} />)

    const button = screen.getByRole('button', {
      name: /Continue with Google/i,
    })

    // Simulate form submission
    fireEvent.click(button)

    // Expect signIn to be called with 'google' and the correct callback URL for super admin
    expect(signIn).toHaveBeenCalledWith('google', {
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/super`,
    })
  })
})
