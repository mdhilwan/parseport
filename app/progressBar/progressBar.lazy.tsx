import React, { Suspense, lazy } from 'react'

const LazyProgressBar = lazy(() => import('./progressBar'))

export const ProgressBar = (props: React.JSX.IntrinsicAttributes) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <LazyProgressBar {...props} />
      </Suspense>
    </>
  )
}
