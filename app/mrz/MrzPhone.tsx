import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { State } from '../enums/state'
import utils from '../utils'
import Mrz from './Mrz'

type MrzPhoneType = { socket: any }

const MrzPhone = ({ socket }: MrzPhoneType) => {
  const [cookies] = useCookies(['guid'])
  const [scanState, setScanState] = useState<any>()
  const [parsed, setParsed] = useState<any>({})

  const truncateString = (string: string) => {
    if (string.length > 10) {
      return string.slice(0, 10) + '...'
    }
    return string
  }

  const getPersonName = (data: {
    data: { firstName: string; lastName: string }
  }) => {
    const {
      data: { firstName, lastName },
    } = data
    let name
    if (firstName && lastName) {
      name = `${firstName} ${lastName}`
    } else if (firstName && !lastName) {
      name = `${firstName}`
    } else if (!firstName && lastName) {
      name = `${lastName}`
    } else {
      name = ''
    }
    return truncateString(name)
  }

  useEffect(() => utils.EmitToSocket(parsed, socket, cookies.guid), [parsed])

  return (
    <>
      <Script
        type="text/javascript"
        src="./vendor/mrz-worker.bundle-min-wrapped.js"
        strategy="afterInteractive"
      />
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {scanState?.state === State.SUCCESS ? (
                <>
                  <span>
                    Sent {getPersonName(parsed)}{' '}
                    {scanState.length > 1
                      ? 'and ' + (scanState.length - 1) + ' others'
                      : ''}{' '}
                    to agent
                  </span>
                  <br />
                  <span className="font-semibold">
                    Click and choose another file
                  </span>{' '}
                  or take another photo
                </>
              ) : scanState?.state === State.ERROR ? (
                <>
                  <span>
                    There seems to be an error scanning. {parsed.message}
                  </span>
                  <span className="font-semibold">Click and choose a file</span>{' '}
                  or take a photo
                </>
              ) : scanState?.state === State.SCANNING ? (
                <span className="font-semibold">Scanning...</span>
              ) : (
                <>
                  <span className="font-semibold">Click and choose a file</span>{' '}
                  or take a photo
                </>
              )}
            </p>
          </div>
          <Mrz dpSetParsed={setParsed} dpSetScanState={setScanState} />
        </label>
      </div>
    </>
  )
}

export default MrzPhone
