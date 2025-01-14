import { Button } from 'react-bootstrap';

interface ItemAddedProps {
    label: string,
    items: number,
    price: number,
    descuento: number,
    productId: number,
    setProduct: (productId: number) => void,
    setProductDiscount: (productId: number) => void,
    setShowDiscountProductModal: (show: boolean) => void,
}

const ItemAdded = ({ label, items, productId, price, descuento,
    setProduct,
    setProductDiscount,
    setShowDiscountProductModal }: ItemAddedProps) => {

    const handleProductDiscount = (productId: number) => {
        setProductDiscount(productId);
        setShowDiscountProductModal(true);
    }

    let itemsPrice = price * items;
    let priceWithDiscount = itemsPrice - (itemsPrice * descuento / 100);
    return (
        <>
            <div className="pb-1 pt-1 d-flex mb-auto border-bottom">
                <div className="p-1 fs-sm fst-italic">
                    <span className='text-secondary'>{items}x</span>
                </div>
                <div className="p-1 flex-fill">
                    {label.length > 20 ? label.substring(0, 20) + ' ...' : label}
                    {
                        descuento > 0 && <span className='fst-italic fs-sm text-secondary'> %</span>
                    }
                </div>
                <div className="p-1">
                    ${
                        priceWithDiscount.toFixed(2)
                    }
                </div>
                <Button onClick={() => handleProductDiscount(productId)} className="btn btn-info btn-sm me-1 p-1 text-white">
                    <i className="bi bi-percent"></i>
                </Button>
                <Button onClick={() => setProduct(productId)} className="btn btn-info btn-sm p-1 text-white">
                    <i className="bi bi-info-lg"></i>
                </Button>
            </div>
        </>
    )
};

export default ItemAdded