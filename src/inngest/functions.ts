import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
    { id: "execute-ai" },
    { event: "execute/ai" },
    async ({ event, step }) => {
        await step.sleep("pretend","5s")
        const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text", generateText, {
            model: google("gemini-2.5-flash"),
            system: "You are a Helpful Assistant!",
            prompt: "What is 2+2 ?"
        })
        return geminiSteps;
    },
);