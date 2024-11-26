import { Col } from 'react-bootstrap'
import { Widget } from './Widget'

const widgetItems = [
    {
        size: 3,
        cardTitle: "Ventas del dia",
        cardHeader: "",
        children: <>Ventas: $2000</>,
    },
    {
        size: 3,
        cardTitle: "Producto mas vendido",
        cardHeader: "",
        children: <>Panini</>,
    },
];
export const WidgetsLayout = () => {
    return (
        <>
            {
                widgetItems.map((item, key) => {
                    return <Col key={key} md={item.size}>
                        <Widget {...item} />
                    </Col>
                })
            }
        </>
    )
}
