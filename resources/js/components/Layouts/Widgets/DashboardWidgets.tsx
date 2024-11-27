import { Col, Row } from 'react-bootstrap'
import { Widget } from './Widget';
import { useAxios } from '@/hooks/useAxios';
import { RoleEnum } from '@/enums/RoleEnum';
import dashboardWidgetRoutes from '@/router/widgets.routes';

export const DashboardWidgets = () => {
    const { user } = useAxios();
    if (!user?.rol_id) return false;
    const { rol_id } = user;
    // const options = rol_id == RoleEnum.Admin ? dashboardWidgetRoutes : dashboardWidgetRoutes.filter(route => {
    //     return !route.admin;
    // });
    const options = dashboardWidgetRoutes;
    return (
        <Row className="mb-3">
            {
                options.map((item, key) => {
                    return <Col sm={item.size} xs={item.size} key={key} md={item.size}>
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
