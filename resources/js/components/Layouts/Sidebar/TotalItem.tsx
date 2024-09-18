import React from 'react'

export const TotalItem = ({ label, ammount, wrapperClass = '' }) => {
    return (
        <div className={`d-flex ${wrapperClass}`}>
            <div className="p-2 flex-grow-1">{label} </div>
            <div className="p-2">$ {ammount}</div>
        </div>
    )
}
