import GenerateCsv from '../generate/csv/generate-csv'
import ParsedTable from '../parsedTable'
import StatePhoneConnection from '../statePhoneConnection'
import ProgressBar from '@/app/progressBar'

const PostScan = ({ user }) => {
  return (
    <div className="w-full max-w-full overflow-auto mb-16">
      <ProgressBar />
      <ParsedTable user={user} />
      <div className="flex items-center py-4 fixed bottom-0">
        <StatePhoneConnection />
        <GenerateCsv user={user} />
      </div>
    </div>
  )
}

export default PostScan
