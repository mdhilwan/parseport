import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './input'

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input label="Test Label" id="test-id" />)

    // Check label text
    const label = screen.getByLabelText('Test Label')
    expect(label).toBeInTheDocument()

    // Check input element by ID
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'test-id')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders a select element when type is "select" with options', () => {
    render(
      <Input
        label="Account Type"
        id="account-type"
        type="select"
        option={['Demo', 'Full']}
      />
    )

    // Check that select element is rendered
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()

    // Check options inside select
    const options = screen.getAllByRole('option')
    expect(options.length).toBe(2)
    expect(options[0]).toHaveTextContent('Demo')
    expect(options[1]).toHaveTextContent('Full')
    expect(options[0]).toHaveAttribute('value', 'true')
    expect(options[1]).toHaveAttribute('value', 'false')
  })

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn()
    render(
      <Input
        label="Email"
        id="email"
        value="test@example.com"
        onChange={handleChange}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new@example.com' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('displays placeholder text', () => {
    render(
      <Input label="Username" id="username" placeholder="Enter your username" />
    )

    const input = screen.getByPlaceholderText('Enter your username')
    expect(input).toBeInTheDocument()
  })
})
