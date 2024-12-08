import { UserType } from '@/app/admin/shared/controls/controls'
import { ProgressBar } from '@/app/progressBar/progressBar.lazy'
import { Toolbar } from '@/app/toolbar/toolbar.lazy'
import { ParsedTable } from '../parsedTable/parsedTable.lazy'

const PostScan = ({ user }: { user: UserType }) => (
  <div
    className="w-full max-w-full overflow-auto mb-16"
    data-testid="post-scan"
  >
    <ProgressBar />
    <ParsedTable user={user} />
    <Toolbar />
  </div>
)

export default PostScan
