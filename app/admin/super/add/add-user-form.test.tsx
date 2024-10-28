import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import AddUserForm from './add-user-form'

jest.mock('@/app/api/httpActions', () => ({
  AddNewUser: jest.fn(),
}))

describe('AddUserForm Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders the form fields and buttons', () => {
    render(<AddUserForm />)

    expect(screen.getByLabelText(/Email\(s\)/)).toBeInTheDocument()

    expect(screen.getByLabelText(/Company Name/)).toBeInTheDocument()

    expect(screen.getByLabelText(/Company Address/)).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/9123 4321/)).toBeInTheDocument()

    expect(screen.getByLabelText(/Account Type/)).toBeInTheDocument()
  })

  it('adds a new email field when "Add another email" button is clicked', () => {
    render(<AddUserForm />)

    const addEmailButton = screen.getByText('Add another email')

    expect(screen.getAllByPlaceholderText(/name@flowbite.com/).length).toBe(1)

    fireEvent.click(addEmailButton)

    expect(screen.getAllByPlaceholderText(/name@flowbite.com/).length).toBe(2)
  })

  it('validates form fields correctly and shows console message if form is invalid', () => {
    console.log = jest.fn()
    render(<AddUserForm />)

    const submitButton = screen.getByText('Register new account(s)')

    fireEvent.click(submitButton)

    expect(console.log).toHaveBeenCalledWith('Form not valid')
  })
})
