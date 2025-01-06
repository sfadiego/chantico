import { Button } from 'react-bootstrap';

interface ItemAddedProps {
    label: string,
    items: number,
    price: number,
    productId: number,
    setProduct: (productId: number) => void
}

const ItemAdded = ({ label, items, productId, price, setProduct }: ItemAddedProps) => {
    return (
        <>
            <div className="pb-1 pt-1 d-flex mb-auto border-bottom">
                <div className="p-1 fs-sm fst-italic">
                    <span className='text-secondary'>{items}x</span>
                </div>
                <div className="p-1 flex-fill">
                    {label.length > 20 ? label.substring(0, 20) + ' ...' : label}
                </div>
                <Button onClick={() => { }} className="btn btn-info btn-sm p-1 text-white">
                    <i className="bi bi-percent"></i>
                </Button>
                <div className="p-1">${items * price}</div>
                <Button onClick={() => setProduct(productId)} className="btn btn-info btn-sm p-0 text-white">
                    <i className="bi bi-info-lg"></i>
                </Button>
            </div>
        </>
    )
};

export default ItemAdded