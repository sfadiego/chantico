import React from 'react'
import AuthLayout from '../../../components/Layouts/AuthLayout/AuthLayout';
import LoginForm from './partials/LoginForm';
import '@css/authLayout.css'

const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginForm></LoginForm>
        </AuthLayout>
    )
}
export default LoginPage;
