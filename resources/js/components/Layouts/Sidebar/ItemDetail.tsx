import React from 'react'
import ButtonComponent from '../../Button/ButtonComponent';

interface ItemDetailProps {
    show: boolean
}
const Detail = () => {
    return <>
        <hr className="mt-1 mb-1" />
        <div className={`d-flex`}>
            <div className="p-2 flex-fill">
                <span className='text-secondary'>{1} pza</span>
            </div>
            <div className="p-2">
                <ButtonComponent className='btn btn-info btn-sm'>-</ButtonComponent>
                <ButtonComponent className='btn btn-info btn-sm border-start'>+</ButtonComponent>
                <ButtonComponent className='btn btn-danger btn-sm border-start'>
                    <i className="bi bi-trash3"></i>
                </ButtonComponent>
            </div>
        </div>
    </>
}
const ItemDetail = ({ show }: ItemDetailProps) => {

    return (
        <>
            {show ? <Detail /> : null}
        </>
    )
}

export default ItemDetail;