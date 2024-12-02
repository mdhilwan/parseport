import React, { Suspense, lazy } from 'react'

const LazyBaseModal = lazy(() => import('./baseModal'))

export const BaseModal = (
  props: React.JSX.IntrinsicAttributes & {
    content: React.ReactElement
    button: React.ReactElement
    header: React.ReactElement
    size?: 'small' | 'medium' | 'large' | 'full'
  }
) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <LazyBaseModal {...props} />
      </Suspense>
    </>
  )
}
