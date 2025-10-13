import prisma from '@/lib/db'
import React from 'react'

const Home = async () => {

    const users = await prisma.user.findMany();

    return (
        <div className='min-h-screen min-w-screen flex items-center justify-center'>
            {JSON.stringify(users)}
        </div>
    )
}

export default Home