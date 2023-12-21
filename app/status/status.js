const Status = ({head, body}) => {
    return (
        <div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 max-w-md mx-auto" role="alert">
            <span className="font-bold">{head}</span> {body}
        </div>
    )
}

export default Status