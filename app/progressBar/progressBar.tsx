import { State } from '@/app/enums/state'
import { setScanState } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { useEffect } from 'react'

const ProgressBar = () => {
  const { scanState } = useAppSelector((state) => state.mrzStore)
  const dispatch = useAppDispatch()
  const progressLength = scanState.length
    ? ((scanState.success + scanState.error) / scanState.length) * 100
    : 0

  const hideOrShowBar = () =>
    (progressLength && Math.ceil(progressLength) >= 100) ||
    Math.ceil(progressLength) === 0
      ? 'w-0'
      : 'w-full'

  useEffect(() => {
    if (Math.ceil(progressLength) >= 100) {
      setTimeout(() => {
        if (scanState.state === State.SUCCESS) {
          dispatch(
            setScanState({
              success: 0,
              error: 0,
              length: 0,
              scanning: 0,
              state: State.IDLE,
            })
          )
        }
      }, 1000)
    }
  }, [progressLength])

  if (
    !progressLength ||
    [State.ERROR, State.IDLE, State.SUCCESS].includes(scanState.state)
  ) {
    return <></>
  }

  return (
    <>
      <div
        className={`bg-gray-200 rounded-full h-1 my-5 ${hideOrShowBar()} delay-700`}
      >
        <div
          className="bg-blue-600 h-1 rounded-full transition-all"
          style={{ width: `${progressLength}%` }}
        ></div>
      </div>
    </>
  )
}

export default ProgressBar
