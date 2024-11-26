import { Col, Row } from 'react-bootstrap'
import { Widget } from './Widget'

const widgetItems = [
    {
        size: 3,
        smSize: 4,
        cardTitle: "Ventas del dia",
        cardHeader: "",
        children: <><b>Ventas:</b> $2000</>,
    },
    {
        size: 3,
        smSize: 4,
        cardTitle: "Producto mas vendido",
        cardHeader: "",
        children: <><b>Panini</b></>,
    },
];
export const WidgetsLayout = () => {
    return (
        <Row>
            {
                widgetItems.map((item, key) => {
                    return <Col sm={item.smSize} xs={item.smSize} key={key} md={item.size}>
                        <Widget {...item} />
                    </Col>
                })
            }
        </Row>
    )
}
