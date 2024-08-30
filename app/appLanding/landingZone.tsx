import { useAppDispatch } from '@/app/store'
import { ReactElement } from 'react'
import {
  revertMrzStateDropZoneClass,
  setMrzStateDropZoneClass,
} from '../slice/slice'

type LandingZoneType = { children: ReactElement }

const LandingZone = ({ children }: LandingZoneType) => {
  const dispatch = useAppDispatch()

  const dragOverHandler = () => {
    dispatch(setMrzStateDropZoneClass('bg-blue-100'))
  }

  const dragEndHandler = () => {
    setTimeout(() => {
      dispatch(revertMrzStateDropZoneClass())
    }, 1000)
  }

  return (
    <div
      className="flex flex-col items-center justify-between px-12 w-full mx-auto"
      onDragOver={() => dragOverHandler()}
      onDragLeave={() => dragEndHandler()}
      onDrop={() => dragEndHandler()}
    >
      {children}
    </div>
  )
}

export default LandingZone
