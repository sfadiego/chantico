import { Col, Container, Row } from 'react-bootstrap'
import { Widget } from './Widget';
import { useAxios } from '@/hooks/useAxios';
import { RoleEnum } from '@/enums/RoleEnum';
import dashboardWidgetRoutes, { OpenSalesWidgetRoute } from '@/router/widgets.routes';
import { useEffect, useState } from 'react';
import { IWidgetProps } from '@/intefaces/IWidgetProps';


const OpenSalesWidget = () => {
    return <Row>
        <Col md={3}>
            <Widget {...OpenSalesWidgetRoute} >
                {OpenSalesWidgetRoute.children}
            </Widget>
        </Col>
    </Row>
}

export const WidgetLayout = () => {
    const { user: { rol_id }, sistemaId } = useAxios();
    if (!sistemaId) {
        return <OpenSalesWidget></OpenSalesWidget>
    }
    // console.log(sistemaId);

    // const options = rol_id == RoleEnum.Admin ? dashboardWidgetRoutes : dashboardWidgetRoutes.filter(route => {
    //     return !route.admin;
    // });
    // const options = dashboardWidgetRoutes;
    return (
        <Row className="mb-3">
            {/* {
                options.map((item, key) => {
                    return <Col sm={item.size} xs={item.size} key={key} md={item.size}>
                        <Widget {...item} >
                            {
                                item.children
                            }
                        </Widget>
                    </Col>
                })
            } */}
        </Row>
    )
}
