"use client";

import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';

const Home = () => {

    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const { data } = useQuery(trpc.getWorkflows.queryOptions());

    const testAI = useMutation(trpc.testAI.mutationOptions({
        onSuccess: () => {
            toast.success("AI Job Queued")
        }
    }));

    const create = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess: () => {
            toast.success("Job Queued")
        }
    }));

    return (
        <div className='min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6'>
            <div>
                {JSON.stringify(data,null,2)}
            </div>
            <Button
            disabled={testAI.isPending}
            onClick={() => testAI.mutate()}
            >
                Test AI
            </Button>
            <Button
            disabled={create.isPending}
            onClick={() => create.mutate()}
            >
                Create Workflow
            </Button>
        </div>
    )
}

export default Home