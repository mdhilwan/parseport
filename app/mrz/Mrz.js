import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react';
import Script from 'next/script';
import MrzWorker from './MrzWorker';
import { State } from '../enums/state';
import MrzInput from './MrzInput';

const Mrz = ({ socket }) => {
    const [cookies, setCookies, removeCookie] = useCookies(['guid']);

    const [scanState, setScanState] = useState();
    const [parsed, setParsed] = useState({})

    const truncateString = string => {
        if (string.length > 10) {
            return string.slice(0, 10) + '...'
        }
        return string
    }

    const getPersonName = data => {
        let name = '';
        if (data.firstName && data.lastName) {
            name = `${data.firstName} ${data.lastName}`
        } else if (data.firstName && !data.lastName) {
            name = `${data.firstName}`
        } else if (!data.firstName && data.lastName) {
            name = `${data.lastName}`
        } else {
            name = ''
        }
        return truncateString(name)
    }

    useEffect(() => {
        if (scanState === State.SUCCESS) {
            socket.emit('scanned:parsed', {
                agent: cookies.guid.split('@@')[1],
                data: parsed
            })
        }
    }, [parsed, scanState])

    return (
        <>
            <Script type='text/javascript' src="./vendor/mrz-worker.bundle-min-wrapped.js" strategy='afterInteractive' />
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            {
                                scanState === State.SUCCESS ?
                                    <>
                                        <span>Sent {getPersonName(parsed)} to agent</span><br />
                                        <span className="font-semibold">Click and choose another file</span> or take another photo
                                    </> : scanState === State.ERROR ?
                                        <>
                                            <span>There seems to be an error scanning. {parsed.message}</span>
                                            <span className="font-semibold">Click and choose a file</span> or take a photo
                                        </> : scanState === State.SCANNING ?
                                            <>
                                                Scanning...
                                            </> :
                                            <>
                                                <span className="font-semibold">Click and choose a file</span> or take a photo
                                            </>
                            }
                        </p>
                    </div>
                    <MrzInput setParsed={setParsed} setScanState={setScanState}/>
                </label>
            </div>
        </>
    )
}

export default Mrz;