"use client";

import { formatDistanceToNow } from "date-fns";
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflows, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { UseEntitySearch } from "@/hooks/use-entity-search";
import type { Workflow } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";

export const WorkflowsSearch = () => {

    const [params,setParams] = useWorkflowsParams();

    const { searchValue, onSearchChange } = UseEntitySearch({
        params,
        setParams
    })

    return(
        <EntitySearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search Workflows"
        />
    )
}

export const WorkflowsList = () => {

    const workflows = useSuspenseWorkflows();

    return(
        <EntityList
        items={workflows.data.items}
        getKey={(workflow) => workflow.id}
        renderItem={((workflow) => <WorkflowItem data={workflow}/>)}
        emptyView={<WorkflowsEmpty/>}
        />
    )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {

    const router = useRouter();

    const createWorkflow = useCreateWorkflows();

    const { handleError, modal } = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return (
        <>
            {modal}
            <EntityHeader
            title="Workflows"
            description="Create and Manage your Workflows"
            onNew={handleCreate}
            newButtonLabel="New Workflows"
            disabled={disabled}
            isCreating={createWorkflow.isPending}
            />
        </>
    )
}

export const WorkflowsPagination = () => {

    const workflows = useSuspenseWorkflows();

    const [params,setParams] = useWorkflowsParams();

    return(
        <EntityPagination
        disabled={workflows.isFetching}
        totalPages={workflows.data.totalPages}
        page={workflows.data.page}
        onPageChange={(page) => setParams({ ...params, page })}
        />
    )


}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <EntityContainer
        header={<WorkflowsHeader/>}
        search={<WorkflowsSearch/>}
        pagination={<WorkflowsPagination/>}
        >
            {children}
        </EntityContainer>
    )
}

export const WorkflowsLoading = () => {
    return(
        <LoadingView 
        message="Loading Workflows..."
        />
    )
}

export const WorkflowsError = () => {
    return(
        <ErrorView
        message="Error Loading Workflows"
        />
    )
}

export const WorkflowsEmpty = () => {

    const router = useRouter();

    const createWorkflow = useCreateWorkflows();

    const { handleError, modal } = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return(
        <>
            {modal}
            <EmptyView
            message="You haven&apos;t Created any Workflows Yet. Get Started By Creating Your First Workflow."
            onNew={handleCreate}
            />
        </>
    )
}

export const WorkflowItem = ({ data }: { data: Workflow }) => {

    const removeWorkflow = useRemoveWorkflow();

    const handleRemove = () => {
        removeWorkflow.mutate({ id: data.id })
    }

    return(
        <EntityItem
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle={
            <>
                Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
                &bull; Created{" "}
                {formatDistanceToNow(data.createdAt, { addSuffix: true })}
            </>
        }
        image={
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground"/>
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}
        />
    )
}