import ProgressBar from '@/app/progressBar'
import Toolbar from '@/app/toolbar'
import ParsedTable from '../parsedTable'

const PostScan = ({ user }) => {
  return (
    <div className="w-full max-w-full overflow-auto mb-16">
      <ProgressBar />
      <ParsedTable user={user} />
      <Toolbar user={user} />
    </div>
  )
}

export default PostScan
