import { UserType } from '@/app/admin/shared/controls/controls'
import React, { Suspense, lazy } from 'react'

const LazyGenerateCsvModal = lazy(() => import('./generateCsvModal'))

export const GenerateCsvModal = (
  props: React.JSX.IntrinsicAttributes & { user: UserType }
) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <LazyGenerateCsvModal {...props} />
      </Suspense>
    </>
  )
}
