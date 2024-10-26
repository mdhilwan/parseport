import BaseModal from '@/app/baseModal'
import { setShowQrCodeModal } from '@/app/slice/slice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import Image from 'next/image'

const QrCodeModal = () => {
  const { showQrCodeModal, qrcodeSrc } = useAppSelector(
    (state) => state.mrzStore
  )
  const dispatch = useAppDispatch()
  return showQrCodeModal ? (
    <BaseModal
      header={<>Reconnect your phone</>}
      content={
        <Image
          src={qrcodeSrc}
          alt=""
          width={300}
          height={300}
          className="mt-2 mx-auto"
        />
      }
      button={
        <>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => dispatch(setShowQrCodeModal(false))}
          >
            Cancel
          </button>
        </>
      }
    />
  ) : (
    <></>
  )
}

export default QrCodeModal
