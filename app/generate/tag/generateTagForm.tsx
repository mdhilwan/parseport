import { Input } from '@/app/generate/tag/input'
import { Label } from '@/app/generate/tag/label'
import { setBagTagNamePos } from '@/app/slice/slice'
import { useAppSelector } from '@/app/store'
import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

export const GenerateTagForm = () => {
  const {
    scannedData,
    showBagTagModal: {
      rowKey = 0,
      elementsPos: {
        name: { x, y },
      },
    },
  } = useAppSelector((state) => state.mrzStore)

  const dispatch = useDispatch()

  return (
    <div className="col-span-1 max-h-[calc(1000px-16rem)] min-h-[calc(820px-10rem)] overflow-y-scroll overflow-x-hidden relative">
      {/*<pre>{JSON.stringify(cloneTourPackageDetails, undefined, 2)}</pre>*/}
      <h3 className="pb-3 text-sm text-gray-400 uppercase">Personal Details</h3>
      <div className="border border-gray-100 shadow-sm rounded p-4 mb-4">
        <div className="mb-4">
          <Label label={'First Name'} htmlFor={'firstName'} />
          <Input
            value={scannedData[rowKey].firstName}
            placeholder={'John'}
            id={'firstName'}
            disabled={true}
          />
        </div>
        <div>
          <Label label={'Last Name'} htmlFor={'lastName'} />
          <Input
            value={scannedData[rowKey].lastName}
            placeholder={'Doe'}
            id={'lastName'}
            disabled={true}
          />
        </div>
      </div>
      <h3 className="pb-3 text-sm text-gray-400 uppercase">Position</h3>
      <div className="flex">
        <label className={'appearance-none py-2 px-3 text-gray-700'}>X:</label>
        <Input
          value={x}
          placeholder={'100px'}
          id={'lastName'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setBagTagNamePos({ x: e.currentTarget.value, y: y }))
          }}
        />
        <label className={'appearance-none py-2 px-3 text-gray-700'}>Y:</label>
        <Input
          value={y}
          placeholder={'200px'}
          id={'lastName'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setBagTagNamePos({ x: x, y: e.currentTarget.value }))
          }}
        />
      </div>
    </div>
  )
}
