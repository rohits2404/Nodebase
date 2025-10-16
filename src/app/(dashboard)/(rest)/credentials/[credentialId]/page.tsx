import { requireAuth } from '@/lib/auth-utils';
import React from 'react'

interface Props {
    params: Promise<{
        credentialId: string;
    }>
}

const IndividualCredential = async ({ params }: Props) => {

    await requireAuth();

    const { credentialId } = await params;

    return (
        <div>Credential Id: {credentialId}</div>
    )
}

export default IndividualCredential