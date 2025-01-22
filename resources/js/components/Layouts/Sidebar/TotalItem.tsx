interface ITotalProps {
    label: string,
    ammount: number,
    wrapperClass?: string
}

export const TotalItem = ({ label, ammount, wrapperClass = '' }: ITotalProps) => {
    return (
        <div className={`d-flex ${wrapperClass}`}>
            <div className="p-2 flex-grow-1">{label} </div>
            <div className="p-2">$ {ammount}</div>
        </div>
    )
}
