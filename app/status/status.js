const Status = ({head, body}) => {
    return (
        <div class="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span class="font-bold">{head}</span> {body}
        </div>
    )
}

export default Status