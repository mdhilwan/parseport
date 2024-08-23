import { useDispatch, useSelector } from 'react-redux'
import { setMrzStateDropZoneClass } from '../slice/slice'

const LandingZone = ({ children }) => {
  const dispatch = useDispatch()

  const dragOverDocHandler = (ev) => {
    dispatch(
      setMrzStateDropZoneClass(
        'bg-blue-100'
      )
    )
  }

  const dragEndHandler = () => {
    setTimeout(() => {
        dispatch(
          setMrzStateDropZoneClass(
            'bg-white'
          )
        )
    }, 1000)
  }

  return (
    <div
      className='flex flex-col items-center justify-between px-12 w-full mx-auto'
      onDragOver={($event) => dragOverDocHandler($event)}
      onDragLeave={() => dragEndHandler()}
      onDrop={() => dragEndHandler()}
    >
      {children}
    </div>
  )
}

export default LandingZone
