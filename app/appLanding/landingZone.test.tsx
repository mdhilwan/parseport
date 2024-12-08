import { useAppDispatch } from '@/app/store'
import { fireEvent, render } from '@testing-library/react'
import {
  revertMrzStateDropZoneClass,
  setMrzStateDropZoneClass,
} from '../slice/slice'
import LandingZone from './landingZone'

jest.mock('@/app/store', () => ({
  useAppDispatch: jest.fn(),
}))

jest.mock('../slice/slice', () => ({
  setMrzStateDropZoneClass: jest.fn(),
  revertMrzStateDropZoneClass: jest.fn(),
}))

describe('LandingZone', () => {
  const mockDispatch = jest.fn()
  const mockSetClass = jest.fn()
  const mockRevertClass = jest.fn()

  beforeEach(() => {
    ;(useAppDispatch as unknown as jest.Mock)
      .mockReturnValue(mockDispatch)(
        setMrzStateDropZoneClass as unknown as jest.Mock
      )
      .mockImplementation(mockSetClass)
    ;(revertMrzStateDropZoneClass as unknown as jest.Mock).mockImplementation(
      mockRevertClass
    )
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it('renders children', () => {
    const { getByText } = render(
      <LandingZone>
        <div>Test Child</div>
      </LandingZone>
    )

    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('dispatches setMrzStateDropZoneClass on drag over', () => {
    const { getByTestId } = render(
      <LandingZone>
        <div>Test Child</div>
      </LandingZone>
    )

    const landingZone = getByTestId('landing-zone') // The div is a generic role
    fireEvent.dragOver(landingZone)

    expect(mockDispatch).toHaveBeenCalledWith(
      setMrzStateDropZoneClass('bg-blue-100')
    )
  })

  it('dispatches revertMrzStateDropZoneClass on drag leave after a delay', () => {
    const { getByTestId } = render(
      <LandingZone>
        <div>Test Child</div>
      </LandingZone>
    )

    const landingZone = getByTestId('landing-zone')
    fireEvent.dragLeave(landingZone)

    jest.runAllTimers()

    expect(mockDispatch).toHaveBeenCalledWith(revertMrzStateDropZoneClass())
  })

  it('dispatches revertMrzStateDropZoneClass on drop after a delay', () => {
    const { getByTestId } = render(
      <LandingZone>
        <div>Test Child</div>
      </LandingZone>
    )

    const landingZone = getByTestId('landing-zone')
    fireEvent.drop(landingZone)

    jest.runAllTimers()

    expect(mockDispatch).toHaveBeenCalledWith(revertMrzStateDropZoneClass())
  })
})
