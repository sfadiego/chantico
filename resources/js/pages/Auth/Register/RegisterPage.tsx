import React from 'react'
import '@css/authLayout.css'
import AuthLayout from '../../../components/Layouts/AuthLayout/AuthLayout';
import RegisterForm from './partials/RegisterForm';

const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm></RegisterForm>
        </AuthLayout>
    )
}
export default RegisterPage;
