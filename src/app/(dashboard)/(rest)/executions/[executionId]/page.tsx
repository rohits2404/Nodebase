import { requireAuth } from '@/lib/auth-utils';
import React from 'react'

interface Props {
    params: Promise<{
        executionId: string;
    }>
}

const IndividualExecution = async ({ params }: Props) => {

    await requireAuth();

    const { executionId } = await params

    return (
        <div>Execution Id: {executionId}</div>
    )
}

export default IndividualExecution