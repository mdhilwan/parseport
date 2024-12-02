import React, { Suspense, lazy } from 'react'

const LazyToolbar = lazy(() => import('./toolbar'))

export const Toolbar = (props: React.JSX.IntrinsicAttributes) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <LazyToolbar {...props} />
      </Suspense>
    </>
  )
}
