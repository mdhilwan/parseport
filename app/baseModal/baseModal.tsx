import { ReactElement } from 'react'

type BaseModalType = {
  content: ReactElement
  button: ReactElement
  header: ReactElement
}

const BaseModal = (opt: BaseModalType) => {
  const { content, button, header }: BaseModalType = opt

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center">
                <h3
                  className="text-lg font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {header}
                </h3>
                {content}
              </div>
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
