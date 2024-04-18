import { State } from '../enums/state'

const Status = ({ head, body, state }) => {
  const stateClass =
    state === State.LINKING
      ? 'p-4 m-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 max-w-md mx-auto'
      : 'p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 max-w-md mx-auto'
  return (
    <div className={stateClass} role="alert">
      <span className="font-bold">{head}</span> {body}
    </div>
  )
}

export default Status
