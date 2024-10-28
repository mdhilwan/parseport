import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import isEmail from 'validator/lib/isEmail'
import EmailInput from './email-input'

jest.mock('validator/lib/isEmail', () => jest.fn())

describe('EmailInput Component', () => {
  const setEmailListMock = jest.fn()

  const defaultProps = {
    index: 0,
    email: { state: '', address: '' },
    emailList: [{ state: '', address: '' }],
    setEmailList: setEmailListMock,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with initial state and displays placeholder', () => {
    render(<EmailInput {...defaultProps} />)

    // Check that the input is in the document with a placeholder
    const emailInput = screen.getByPlaceholderText('name@flowbite.com')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveValue('')
  })

  it('displays validation error style when an invalid email is entered', () => {
    ;(isEmail as jest.Mock).mockReturnValue(false)
    render(<EmailInput {...defaultProps} />)

    const emailInput = screen.getByPlaceholderText('name@flowbite.com')

    // Enter an invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    // Check that isEmail was called and validation style is updated
    expect(isEmail).toHaveBeenCalledWith('invalid-email')
    expect(emailInput).toHaveClass('bg-red-50 border-red-300')
  })

  it('displays valid style when a valid email is entered', () => {
    ;(isEmail as jest.Mock).mockReturnValue(true)
    render(<EmailInput {...defaultProps} />)

    const emailInput = screen.getByPlaceholderText('name@flowbite.com')

    // Enter a valid email
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } })

    // Check that isEmail was called and validation style is updated
    expect(isEmail).toHaveBeenCalledWith('valid@example.com')
    expect(emailInput).toHaveClass('bg-gray-50 border-gray-300')
  })

  it('disables input when state is "saving"', () => {
    render(
      <EmailInput {...defaultProps} email={{ state: 'saving', address: '' }} />
    )

    const emailInput = screen.getByPlaceholderText('name@flowbite.com')
    expect(emailInput).toBeDisabled()

    // Check that the loading icon is shown
    expect(screen.getByTestId('saving')).toBeInTheDocument()
  })

  it('displays a check icon when state is "saved"', () => {
    render(
      <EmailInput {...defaultProps} email={{ state: 'saved', address: '' }} />
    )

    // Check that the saved icon is shown
    const checkIcon = screen.getByTestId('saved') // SVG icon for check mark
    expect(checkIcon).toBeInTheDocument()
  })

  it('updates email list when input is blurred', () => {
    render(<EmailInput {...defaultProps} />)

    const emailInput = screen.getByPlaceholderText('name@flowbite.com')

    // Enter a new email address and blur the input
    fireEvent.change(emailInput, { target: { value: 'updated@example.com' } })
    fireEvent.blur(emailInput)

    // Check that setEmailList is called with updated email list
    expect(setEmailListMock).toHaveBeenCalledWith([
      { state: '', address: 'updated@example.com' },
    ])
  })

  it('removes email from list when delete button is clicked', () => {
    const props = {
      ...defaultProps,
      index: 1,
      emailList: [
        { state: '', address: 'test1@example.com' },
        { state: '', address: 'test2@example.com' },
      ],
    }
    render(<EmailInput {...props} />)

    // Click delete button
    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)

    // Expect setEmailList to be called without the deleted email
    expect(setEmailListMock).toHaveBeenCalledWith([
      { state: '', address: 'test1@example.com' },
    ])
  })
})
