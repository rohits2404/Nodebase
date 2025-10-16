import { requireAuth } from '@/lib/auth-utils';
import React from 'react'

interface Props {
    params: Promise<{
        workflowId: string;
    }>
}

const IndividualWorkflow = async ({ params }: Props) => {

    await requireAuth();

    const { workflowId } = await params;

    return (
        <div>Workflow Id: {workflowId}</div>
    )
}

export default IndividualWorkflow