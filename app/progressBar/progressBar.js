import { useSelector } from 'react-redux'

const ProgressBar = () => {

  const store = useSelector((state) => state.mrzStore)
  const progressLength = store.scannedData.length / store.targetScan * 100
  const hideOrShowBar = () => (progressLength === 100 ? '' : 'hidden')

  return (
    <>
      <div
        className={`w-full bg-gray-200 rounded-full h-1 dark:bg-gray-100 mb-10 hidden ${hideOrShowBar()}`}
      >
        <div
          className="bg-blue-600 h-1 rounded-full transition-all"
          style={{
            width: `${progressLength}%`,
          }}
        ></div>
      </div>
    </>
  )
}

export default ProgressBar