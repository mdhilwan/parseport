import { sendGAEvent } from '@next/third-parties/google'
import { useDispatch, useSelector } from 'react-redux'
import GenerateCsv from '../generate/csv/generate-csv'
import ParsedTable from '../parsedTable'
import { setParsed, setScanState } from '../slice/slice'
import StateMrzInput from '../stateMrzInput'
import StatePhoneConnection from '../statePhoneConnection'

const PostScan = ({ user }) => {
  const dispatch = useDispatch()
  const { mrzStateDropZoneClass } = useSelector((state) => state.mrzStore)
  const dpSetParsed = async (obj) => {
    sendGAEvent({ event: 'new_scan', value: user.email })
    dispatch(setParsed(obj))
  }
  const dpSetScanState = (obj) => dispatch(setScanState(obj))
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-10">
        Passport to Visa Scans
      </h2>
      <ParsedTable />
      <GenerateCsv user={user} />
      <StateMrzInput
        dpSetParsed={dpSetParsed}
        dpSetScanState={dpSetScanState}
        bg={mrzStateDropZoneClass}
      />
      <StatePhoneConnection />
    </div>
  )
}

export default PostScan
