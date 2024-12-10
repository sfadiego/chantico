import { Col, Row } from 'react-bootstrap'
import { Widget } from './Widget';
import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';
import allWidgets from '@/router/widgets.routes';

export const WidgetLayout = () => {
    const { user: { rol_id }, sistemaId } = useAxios();
    const [widgets, setwidgets] = useState(allWidgets);
    useEffect(() => {
        if (!sistemaId) {
            const widgetWhenOpenSales = allWidgets.filter(item => item.usedWhenClosedSales
                && item.role.includes(rol_id))
            setwidgets(widgetWhenOpenSales);
        } else {
            const widgetByRole = allWidgets.filter(item => item.role.includes(rol_id)
                && !item.usedWhenClosedSales
            )
            setwidgets(widgetByRole);
        }

    }, [sistemaId, rol_id])
    return (
        <Row className="mb-3">
            {
                widgets.map((item, key) => {
                    return <Col sm={6} xs={3} key={key} md={3}>
                        <Widget {...item} >
                            {
                                item.children
                            }
                        </Widget>
                    </Col>
                })
            }
        </Row>
    )
}
