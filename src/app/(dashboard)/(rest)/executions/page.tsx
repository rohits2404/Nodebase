import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const ExecutionPage = async () => {

    await requireAuth();

    return (
        <div>ExecutionPage</div>
    )
}

export default ExecutionPage