"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export const EditorLoading = () => {
    return(
        <LoadingView
        message="Loading Editor..."
        />
    )
}

export const EditorError = () => {
    return(
        <ErrorView
        message="Error Loading Editor"
        />
    )
}

export const Editor = ({ workflowId }: { workflowId: string }) => {

    const { data: workflow } = useSuspenseWorkflow(workflowId);

    return(
        <p>
            {JSON.stringify(workflow,null,2)}
        </p>
    )
}