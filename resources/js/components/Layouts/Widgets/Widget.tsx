import { IWidgetProps } from '@/intefaces/IWidgetProps'
import { Card } from 'react-bootstrap'



export const Widget = ({ cardTitle, image, description, children }: IWidgetProps) => {
    return (
        <Card className="rounded-0">
            {
                image && <Card.Img variant="top" src={image} />
            }
            <Card.Header className='border-top'>{cardTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{description}</Card.Text>
                {children}
            </Card.Body>
        </Card>
    )
}
