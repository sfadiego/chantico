import React from 'react'
import AuthLayout from '../../../components/Layouts/AuthLayout/AuthLayout';
import '@css/authLayout.css'
import LoginForm from './partials/LoginForm';

const LoginPage = () => {
    return (
        <AuthLayout>
            <LoginForm></LoginForm>
        </AuthLayout>
    )
}
export default LoginPage;
