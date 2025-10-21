import { auth } from '@/lib/auth';
import { polarClient } from '@/lib/polar';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return { userId: 'user_123' };
});

const t = initTRPC.create({
    /**
     *  @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if(!session) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Unauthorized"
        })
    }
    return next({ ctx: { ...ctx, auth: session }});
})

export const premiumProcedure = protectedProcedure.use(async ({ ctx, next }) => {
    const customer = await polarClient.customers.getStateExternal({
        externalId: ctx.auth.user.id
    })
    if(!customer.activeSubscriptions || customer.activeSubscriptions.length === 0) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Active Subscription is Required!"
        })
    }
    return next({ ctx: { ...ctx, customer }});
})