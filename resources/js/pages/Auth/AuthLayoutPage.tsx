import { Card, Col, Container, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import imgChantico from "@assets/logo_chantico.png";
import { ReactNode } from "react";

export default function AuthLayoutPage({ children }: { children: ReactNode }) {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xl={6} lg={10} md={10}>
                    <Card className="o-hidden border-0 shadow-lg my-5">
                        <Card.Body className="p-0">
                            <Row>
                                <Col md={12} className="text-center">
                                    <div className="p-5 pb-3">
                                        <Image
                                            className="img-fluid img-customer-login"
                                            src={imgChantico}
                                        ></Image>
                                    </div>
                                </Col>
                                <Col md={12}>{children}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
