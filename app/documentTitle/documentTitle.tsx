import { useAppSelector } from '@/app/store'
import { ChangeEvent, useState } from 'react'

const DocumentTitle = () => {
  const { scannedData } = useAppSelector((state) => state.mrzStore)

  const [documentTitle, setDocumentTitle] = useState<string>('untitled')

  if (scannedData.length === 0) {
    return <></>
  }

  return (
    <div className="mt-2 px-10">
      <input
        type="text"
        value={documentTitle}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setDocumentTitle(evt.target.value)
        }
        className="px-2 py-1 text-xs text-gray-400 border-white hover:border-gray-700 focus:border-gray-700 hover:cursor-pointer"
      />
    </div>
  )
}

export default DocumentTitle
