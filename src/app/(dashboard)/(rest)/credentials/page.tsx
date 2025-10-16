import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const CredentialsPage = async () => {

    await requireAuth();

    return (
        <div>CredentialsPage</div>
    )
}

export default CredentialsPage