import { UserType } from '@/app/admin/shared/controls/controls'
import { useAppSelector } from '@/app/store'
import { render, screen } from '@testing-library/react'
import { NoScannedData } from './noScannedData'

jest.mock('@/app/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}))

describe('NoScannedData Component', () => {
  const mockUser: UserType = {
    email: 'admin@example.com',
    name: 'Admin User',
    image: '/avatar.png',
    res: {
      result: {
        company: '',
        demo: false,
      },
    },
  }

  it('renders the message when disconnected is false', () => {
    ;(useAppSelector as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ disconnected: false }))
    )
    render(<NoScannedData user={mockUser} />)

    expect(
      screen.getByText(
        'Use your phone that you have linked this computer with to scan your document'
      )
    ).toBeInTheDocument()
  })

  it('renders the StateMrzInputWrap component when disconnected is true', () => {
    ;(useAppSelector as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ disconnected: true }))
    )
    render(<NoScannedData user={mockUser} />)

    expect(screen.getByText('Mocked StateMrzInputWrap')).toBeInTheDocument()
  })
})
