import Input from '@/app/admin/shared/input'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Input component', () => {
  const mockSetUserObject = jest.fn()

  beforeEach(() => {
    mockSetUserObject.mockClear() // Clear the mock before each test
  })

  it('renders a span with correct text and class when value is boolean true', () => {
    const userObject = {}

    render(
      <Input
        value={true}
        colKey="status"
        userObject={userObject}
        setUserObject={mockSetUserObject}
      />
    )

    const spanElement = screen.getByTestId('Input')
    expect(spanElement).toBeInTheDocument()
    expect(spanElement).toHaveTextContent('✅')
  })

  it('renders a span with correct text and class when value is boolean false', () => {
    const userObject = {}

    render(
      <Input
        value={false}
        colKey="status"
        userObject={userObject}
        setUserObject={mockSetUserObject}
      />
    )

    const spanElement = screen.getByTestId('Input')
    expect(spanElement).toBeInTheDocument()
    expect(spanElement).toHaveTextContent('')
  })

  it('renders an input element when value is a string', () => {
    const userObject = {}

    render(
      <Input
        value="John Doe"
        colKey="name"
        userObject={userObject}
        setUserObject={mockSetUserObject}
      />
    )

    const inputElement = screen.getByTestId('Input')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveValue('John Doe')
    expect(inputElement).toBeDisabled() // Read-only
    expect(inputElement).toHaveClass('bg-gray-100')
  })

  it('calls setUserObject with updated userObject in useEffect', () => {
    const userObject = {}

    render(
      <Input
        value="Jane Doe"
        colKey="name"
        userObject={userObject}
        setUserObject={mockSetUserObject}
      />
    )

    // After render, the effect should have been called to update the userObject
    expect(mockSetUserObject).toHaveBeenCalledWith({ name: 'Jane Doe' })
  })
})
