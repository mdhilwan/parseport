import { useSelector } from 'react-redux'

const ProgressBar = () => {

  const { scannedData, targetScan } = useSelector((state) => state.mrzStore)
  const progressLength = scannedData.length / targetScan * 100
  const hideOrShowBar = () => (Math.ceil(progressLength) >= 100 ? 'opacity-0' : '')

  return (
    <>
      <div
        className={`w-full bg-gray-200 rounded-full h-1 dark:bg-gray-100 mb-5 ${hideOrShowBar()} delay-700`}
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