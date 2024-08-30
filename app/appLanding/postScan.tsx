import { UserType } from '@/app/admin/shared/controls/controls'
import ProgressBar from '@/app/progressBar'
import Toolbar from '@/app/toolbar'
import ParsedTable from '../parsedTable'

const PostScan = ({ user }: { user: UserType }) => {
  return (
    <div className="w-full max-w-full overflow-auto mb-16">
      <ProgressBar />
      <ParsedTable user={user} />
      <Toolbar user={user} />
    </div>
  )
}

export default PostScan
