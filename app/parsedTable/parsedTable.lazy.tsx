import React, { Suspense, lazy } from 'react'
import { UserType } from '../admin/shared/controls/controls'

const LazyParsedTable = lazy(() => import('./parsedTable'))

export const ParsedTable = (
  props: React.JSX.IntrinsicAttributes & { user: UserType }
) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <LazyParsedTable {...props} />
      </Suspense>
    </>
  )
}
