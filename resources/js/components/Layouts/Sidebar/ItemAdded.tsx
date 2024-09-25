import React from 'react'
import ButtonComponent from '../../Button/ButtonComponent';

interface ItemAddedProps {
    label: string,
    items: number,
    price: number,
}


const ItemAdded = ({ label, items, price }: ItemAddedProps) => {
    return (
        <>
            <div className="pb-1 pt-1 d-flex mb-auto border-bottom">
                <div className="p-1 fs-sm fst-italic">
                    <span className='text-secondary'>{items}x</span>
                </div>
                <div className="p-1 flex-fill">
                    {label.length > 20 ? label.substring(0, 20) + ' ...' : label}
                </div>
                <div className="p-1">${items * price}</div>
                <ButtonComponent className="btn btn-info btn-sm p-0 text-white">
                    <i className="bi bi-info-lg"></i>
                </ButtonComponent>
            </div>
        </>
    )
};

export default ItemAdded