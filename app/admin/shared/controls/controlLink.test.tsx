import CtrlLink from '@/app/admin/shared/controls/ctrlLink'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('ControlLink', () => {
  it('renders correctly with a URL and displays the correct text', () => {
    // Arrange
    const props = {
      text: 'Click me',
      url: 'https://example.com',
      color: 'blue',
    }

    // Act
    render(<CtrlLink {...props} />)

    // Assert
    const link = screen.getByTestId('ControlLink')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', props.url)
    expect(link).toHaveTextContent(props.text)
    expect(link).toHaveClass(
      'text-base-color py-6 hover:cursor-pointer font-light text-sm mx-4 first-of-type:ms-0 last-of-type:me-0 py-0.5'
    )
  })

  it('renders and triggers the click event when no URL is provided', () => {
    // Arrange
    const mockClickEvent = jest.fn()
    const props = {
      text: 'Logout',
      clickEvent: mockClickEvent,
      color: 'red',
    }

    // Act
    render(<CtrlLink {...props} />)
    const link = screen.getByTestId('ControlLink')

    // Assert
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent('Logout')
    expect(link.getAttribute('href')).toEqual('')
    expect(link).toHaveClass(
      'text-base-color py-6 hover:cursor-pointer font-light text-sm mx-4 first-of-type:ms-0 last-of-type:me-0 py-0.5'
    )

    // Simulate a click event
    fireEvent.click(link)
    expect(mockClickEvent).toHaveBeenCalledTimes(1)
  })

  it('renders default color when no color prop is provided', () => {
    // Arrange
    const props = {
      text: 'Default color',
      url: 'https://default.com',
    }

    // Act
    render(<CtrlLink {...props} />)

    // Assert
    const link = screen.getByTestId('ControlLink')
    expect(link).toHaveClass(
      'text-base-color py-6 hover:cursor-pointer font-light text-sm mx-4 first-of-type:ms-0 last-of-type:me-0 py-0.5'
    )
  })
})
