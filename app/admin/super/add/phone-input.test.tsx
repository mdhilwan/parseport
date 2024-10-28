import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import PhoneInput from './phone-input'

describe('PhoneInput Component', () => {
  const mockSetCompany = jest.fn()

  it('renders with default props', () => {
    render(<PhoneInput company={{ number: '' }} setCompany={mockSetCompany} />)

    const input = screen.getByLabelText('Number')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'tel')
    expect(input).toHaveClass(
      'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md'
    )
  })

  it('displays the initial phone number', () => {
    render(
      <PhoneInput
        company={{ number: '9123 4321' }}
        setCompany={mockSetCompany}
      />
    )

    const input = screen.getByLabelText('Number')
    expect(input).toHaveValue('9123 4321')
  })

  it('calls setCompany with updated number on change', () => {
    render(<PhoneInput company={{ number: '' }} setCompany={mockSetCompany} />)

    const input = screen.getByLabelText('Number')
    fireEvent.change(input, { target: { value: '9876 5432' } })

    expect(mockSetCompany).toHaveBeenCalledWith({ number: '9876 5432' })
  })

  it('applies valid class style when phone number is valid', () => {
    render(<PhoneInput company={{ number: '' }} setCompany={mockSetCompany} />)

    const input = screen.getByLabelText('Number')
    fireEvent.change(input, { target: { value: '9123 4321' } })

    expect(input).toHaveClass(
      'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md'
    )
  })

  it('applies invalid class style when phone number is invalid', () => {
    render(<PhoneInput company={{ number: '' }} setCompany={mockSetCompany} />)

    const input = screen.getByLabelText('Number')
    fireEvent.change(input, { target: { value: 'invalid phone' } })

    expect(input).toHaveClass(
      'shadow-sm bg-red-50 border border-red-300 text-red-900 text-sm rounded-md'
    )
  })
})
