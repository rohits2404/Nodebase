"use client";

import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflows, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { UseEntitySearch } from "@/hooks/use-entity-search";

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

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>
                {JSON.stringify(workflows.data,null,2)}
            </p>
        </div>
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