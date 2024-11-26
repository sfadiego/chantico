import React, { ReactNode } from 'react'
import { Card } from 'react-bootstrap'

interface IWidgetProps {
    cardTitle: string,
    cardHeader?: string,
    children: ReactNode,
}

export const Widget = ({ cardTitle, cardHeader, children }: IWidgetProps) => {
    return (
        <Card>
            <Card.Header as="h5">{cardTitle}</Card.Header>
            <Card.Body>
                <Card.Title>{cardHeader}</Card.Title>
                <Card.Text>
                    {children}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
