import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginPage from './pages/Auth/Login/LoginPage';
import RegisterPage from './pages/Auth/Register/RegisterPage';

export default class Main extends Component {
    render() {
        return (
            // <LoginPage></LoginPage>
            <RegisterPage></RegisterPage>
        )
    }
}
