import { ReactElement } from 'react'

type BaseModalType = {
  content: ReactElement
  button: ReactElement
  header: ReactElement
  size?: 'small' | 'medium' | 'large'
}

const BaseModal = (baseModalProps: BaseModalType) => {
  const {
    content,
    button,
    header,
    size = 'medium',
  }: BaseModalType = baseModalProps

  let modalSize = 'max-w-lg'

  if (size === 'small') {
    modalSize = 'max-w-md'
  } else if (size === 'medium') {
    modalSize = 'max-w-lg'
  } else if (size === 'large') {
    modalSize = 'max-w-7xl'
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-6 ${modalSize} min-h-[800px]`}
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h3
                className="text-lg text-center font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                {header}
              </h3>
              {content}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {button}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseModal
