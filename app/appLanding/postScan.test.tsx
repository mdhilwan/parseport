import { UserType } from '@/app/admin/shared/controls/controls'
import { render } from '@testing-library/react'
import PostScan from './postScan'

// Mock child components
jest.mock('@/app/progressBar/progressBar.lazy', () => ({
  ProgressBar: jest.fn(() => <div data-testid="progress-bar">ProgressBar</div>),
}))

jest.mock('@/app/toolbar/toolbar.lazy', () => ({
  Toolbar: jest.fn(() => <div data-testid="toolbar">Toolbar</div>),
}))

jest.mock('../parsedTable/parsedTable.lazy', () => ({
  ParsedTable: jest.fn(({ user }) => (
    <div data-testid="parsed-table">{`ParsedTable - User: ${user?.name}`}</div>
  )),
}))

describe('PostScan Component', () => {
  const mockUser: UserType = {
    name: 'Test User',
    email: 'test@email.com',
    res: { result: { company: '', demo: false } },
  }

  it('renders correctly with child components', () => {
    const { getByTestId, getByText } = render(<PostScan user={mockUser} />)

    // Check main container
    const container = getByTestId('post-scan')
    expect(container).toBeInTheDocument()

    // Check child components
    expect(getByTestId('progress-bar')).toBeInTheDocument()
    expect(getByTestId('toolbar')).toBeInTheDocument()
    expect(getByTestId('parsed-table')).toBeInTheDocument()

    // Verify `ParsedTable` receives the correct props
    expect(
      getByText(`ParsedTable - User: ${mockUser.name}`)
    ).toBeInTheDocument()
  })
})
