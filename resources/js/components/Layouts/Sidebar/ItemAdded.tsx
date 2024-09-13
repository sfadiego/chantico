import React from 'react'

const ItemAdded = ({ name, items }) => {
    return (
        <>
            <div className="d-flex mb-auto">
                <div className="p-2 flex-grow-1">{name} </div>
                <div className="p-2">{items}</div>
                <div className="p-2"> + - </div>
            </div>
        </>
    )
}

export default ItemAdded