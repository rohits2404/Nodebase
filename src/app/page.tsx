import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server';
import React from 'react'

const Home = async () => {

    await requireAuth();

    const data = await caller.getUsers();

    return (
        <div className='min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6'>
            {JSON.stringify(data)}
        </div>
    )
}

export default Home