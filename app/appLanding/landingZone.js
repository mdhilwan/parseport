import { useDispatch, useSelector } from 'react-redux'
import { setMrzDropZoneClass, setMrzStateDropZoneClass } from '../slice/slice'

const LandingZone = ({ children }) => {
  const { guid, scanned } = useSelector((state) => state.mrzStore)
  const dispatch = useDispatch()
  const landingClassName = () => {
    if (scanned) {
      return 'flex flex-col items-center justify-between p-12 w-full mx-auto'
    }
    return 'flex flex-col items-center justify-between p-12 max-w-6xl mx-auto'
  }

  const connectedToWs = () => (guid ? guid.includes('@') : false)

  const dragOverDocHandler = (ev) => {
    if (connectedToWs() && scanned) {
      dispatch(
        setMrzStateDropZoneClass(
          'mt-10 flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow text-gray-400 bg-lime-100'
        )
      )
    } else if (connectedToWs()) {
      dispatch(
        setMrzDropZoneClass(
          'flex justify-center w-full h-60 px-4 transition bg-lime-100 border-2 border-lime-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
        )
      )
    }
  }

  const dragEndHandler = () => {
    setTimeout(() => {
      if (connectedToWs() && scanned) {
        dispatch(
          setMrzStateDropZoneClass(
            'mt-10 flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow text-gray-400 bg-gray-50'
          )
        )
      } else if (connectedToWs()) {
        dispatch(
          setMrzDropZoneClass(
            'flex justify-center w-full h-60 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
          )
        )
      }
    }, 1000)
  }

  return (
    <div
      className={landingClassName()}
      onDragOver={($event) => dragOverDocHandler($event)}
      onDragLeave={() => dragEndHandler()}
      onDrop={() => dragEndHandler()}
    >
      {children}
    </div>
  )
}

export default LandingZone
