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
    window.gtag('event', 'new_scan', { 'user_email': user.email })
    dispatch(setParsed(obj))
  }
  const dpSetScanState = (obj) => dispatch(setScanState(obj))
  return (
    <div className="max-w-full overflow-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-5">
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
