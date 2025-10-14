import { RegisterForm } from '@/features/auth/components/register-form'
import { requireUnAuth } from '@/lib/auth-utils'
import React from 'react'

const RegisterPage = async () => {

    await requireUnAuth();

    return (
        <RegisterForm/>
    )
}

export default RegisterPage