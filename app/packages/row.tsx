import Input from '@/app/packages/input'

const Row = () => {
  return (
    <tr>
      <td></td>
      <td>
        <Input />
      </td>
      <td>
        <Input />
      </td>
      <td>
        <div className={'flex'}>
          <Input type={'date'} classOverwrite={'rounded-e-none border-e-0'} />
          <Input type={'date'} classOverwrite={'rounded-s-none'} />
        </div>
      </td>
      <td>
        <div className="flex">
          <Input classOverwrite={'rounded-e-none border-e-0'} />
          <Input type={'tel'} classOverwrite={'rounded-s-none'} />
        </div>
      </td>
      <td>
        <div className="flex">
          <Input classOverwrite={'rounded-e-none border-e-0'} />
          <Input type={'tel'} classOverwrite={'rounded-s-none'} />
        </div>
      </td>
      <td>
        <div className="flex">
          <Input classOverwrite={'rounded-e-none border-e-0'} />
          <Input type={'tel'} classOverwrite={'rounded-s-none'} />
        </div>
      </td>
      <td>
        <div className="flex">
          <Input classOverwrite={'rounded-e-none border-e-0'} />
          <Input type={'tel'} classOverwrite={'rounded-s-none'} />
        </div>
      </td>
      <td>
        <div className="flex">
          <Input classOverwrite={'rounded-e-none border-e-0'} />
          <Input type={'tel'} classOverwrite={'rounded-s-none'} />
        </div>
      </td>
    </tr>
  )
}

export default Row
