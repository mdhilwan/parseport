import { UserType } from '@/app/admin/shared/controls/controls'
import { HttpActions } from '@/app/api/httpActions'
import { setParsed, setScanState, setShowAddPassport } from '@/app/slice/slice'
import StateMrzInput from '@/app/stateMrzInput/stateMrzInput'
import { useAppDispatch } from '@/app/store'

type StateMrzInputWrapType = {
  user: UserType
}

export const StateMrzInputWrap = (props: StateMrzInputWrapType) => {
  const { user } = props
  const dispatch = useAppDispatch()
  const dpSetParsed = async (obj: any) => {
    await HttpActions.DoScan({
      userEmail: user.email,
      company: user.res?.result?.company,
    })
    dispatch(setShowAddPassport(false))
    dispatch(setParsed(obj))
  }
  const dpSetScanState = (obj: any) => dispatch(setScanState(obj))

  return (
    <div className="w-full h-[calc(100vh-12.5rem)] flex justify-center items-center">
      <StateMrzInput
        dpSetParsed={dpSetParsed}
        dpSetScanState={dpSetScanState}
      />
    </div>
  )
}
