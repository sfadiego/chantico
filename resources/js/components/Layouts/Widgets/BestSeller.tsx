import { ListGroup } from "react-bootstrap";
import LoadingComponent from "../LoadingComponent";
import { useGetBestSeller } from "../Statistics/useStatistics";

interface IBestSeller {
    product: string,
    total: number
}
export const BestSellerWidgetContent = () => {
    const { isLoading, data, showData } = useGetBestSeller();
    if (isLoading && !showData) return <LoadingComponent />;
    return <ListGroup className='rounded-0'>
        {
            showData && data.map(({ product, total }: IBestSeller, key: number) =>
                <ListGroup.Item action key={key} as="li"
                    className="d-flex justify-content-between align-items-start" >
                    <div className="ms-2 me-auto">
                        {product}
                    </div>
                    {total} pzas.
                </ListGroup.Item>
            )
        }
    </ListGroup>
}