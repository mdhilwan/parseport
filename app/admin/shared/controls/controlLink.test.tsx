import ControlLink from '@/app/admin/shared/controls/controlLink'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('ControlLink', () => {
  it('renders correctly with a URL and displays the correct text', () => {
    // Arrange
    const props = {
      text: 'Click me',
      url: 'https://example.com',
      color: 'blue',
      extraClass: 'custom-class',
    }

    // Act
    render(<ControlLink {...props} />)

    // Assert
    const link = screen.getByTestId('ControlLink')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', props.url)
    expect(link).toHaveTextContent(props.text)
    expect(link).toHaveClass(
      'text-blue-800 bg-blue-50 hover:bg-blue-400 hover:cursor-pointer'
    )
    expect(link).toHaveClass('custom-class') // Ensure extra class is applied
  })

  it('renders and triggers the click event when no URL is provided', () => {
    // Arrange
    const mockClickEvent = jest.fn()
    const props = {
      text: 'Logout',
      clickEvent: mockClickEvent,
      color: 'red',
      extraClass: 'custom-class',
    }

    // Act
    render(<ControlLink {...props} />)
    const link = screen.getByTestId('ControlLink')

    // Assert
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent('Logout')
    expect(link).not.toHaveAttribute('href') // No href attribute since there's no URL
    expect(link).toHaveClass(
      'text-red-800 bg-red-50 hover:bg-red-400 hover:cursor-pointer'
    )
    expect(link).toHaveClass('custom-class')

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
    render(<ControlLink {...props} />)

    // Assert
    const link = screen.getByTestId('ControlLink')
    expect(link).toHaveClass('text-slate-800 bg-slate-50 hover:bg-slate-400')
  })
})
