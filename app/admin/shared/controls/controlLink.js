const ControlLink = ({ text, url, clickEvent, color="slate", extraClass }) => {

    const baseClassName=`text-${color}-800 bg-${color}-50 hover:bg-${color}-400 hover:cursor-pointer hover:border-${color}-500 font-light rounded-none first-of-type:rounded-s last-of-type:rounded-e border-e-0 last-of-type:border-e text-xs px-1.5 py-0.5 border border-${color}-400 ${extraClass}`;
    
    if (url) {
        return (
            <a type="button" href={url} className={baseClassName}>
                {text}
            </a>
        )
    } else if (clickEvent) {
        return (
            <a type="button" className={baseClassName}
                onClick={clickEvent}>
                Logout
            </a>
        )
    }
}

export default ControlLink