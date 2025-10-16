import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const WorkFlowPage = async () => {

    await requireAuth();

    return (
        <div>WorkFlowPage</div>
    )
}

export default WorkFlowPage