import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
    testAI: baseProcedure.mutation(async () => {
        await inngest.send({
            name: "execute/ai"
        })
        return { success: true, message: "Job Queued!" }
    }),
    getWorkflows: protectedProcedure.query(({ ctx }) => {
        return prisma.workflow.findMany()
    }),
    createWorkflow: protectedProcedure.mutation(async () => {
        await inngest.send({
            name: "test/hello.world",
            data: {
                email: "rohit@gmail.com"
            }
        })
        return { success: true, message: "Job Queued!" }
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;