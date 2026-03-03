"use client"

import { NodeType } from "@/generated/prisma/enums";
import { createId } from "@paralleldrive/cuid2";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { toast } from "sonner";

export type NodeTypeOptions = {
    type: NodeType;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }> | string;
}

const triggerNodes: NodeTypeOptions[] = [
    {
        type: NodeType.MANUAL_TRIGGER,
        label: "Trigger Manually",
        description: "Runs the Flow on Clicking a Button. Good for Getting Started Quickly",
        icon: MousePointerIcon
    },
    {
        type: NodeType.GOOGLE_FORM_TRIGGER,
        label: "Google Form",
        description: "Runs the flow when a Google Form is submitted",
        icon: "/images/googleform.svg",
    },
    {
        type: NodeType.STRIPE_TRIGGER,
        label: "Stripe Event",
        description: "Runs the flow when a Stripe Event is captured",
        icon: "/images/stripe.svg",
    },
]

const executionNodes: NodeTypeOptions[] = [
    {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Makes an HTTP Request",
        icon: GlobeIcon
    }
]

interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function NodeSelector({ open, onOpenChange, children }: NodeSelectorProps) {

    const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

    const handleNodeSelect = useCallback((selection: NodeTypeOptions) => {
        if(selection.type === NodeType.MANUAL_TRIGGER) {
            const nodes = getNodes();
            const hasManualTrigger = nodes.some((node) => node.type === NodeType.MANUAL_TRIGGER)
            if(hasManualTrigger) {
                toast.error("Only One Manual Trigger is Allowed Per Workflow")
                return;
            }
        }
        setNodes((nodes) => {
            const hasInitialTrigger = nodes.some((node) => node.type === NodeType.INITIAL)
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const flowPosition = screenToFlowPosition({
                x: centerX + (Math.random() - 0.5) * 200,
                y: centerY + (Math.random() - 0.5) * 200
            })
            const newNode = {
                id: createId(),
                data: {},
                position: flowPosition,
                type: selection.type
            }
            if(hasInitialTrigger) {
                return [newNode]
            }
            return [...nodes, newNode]
        })
        onOpenChange(false);
    },[setNodes,getNodes,onOpenChange,screenToFlowPosition])

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>
                        What Triggers this Workflow ?
                    </SheetTitle>
                    <SheetDescription>
                        A Trigger is a Step That Starts your Workflow
                    </SheetDescription>
                </SheetHeader>
                <div>
                    {triggerNodes.map((nodeType) => {
                        const Icon = nodeType.icon
                        return (
                            <div 
                            key={nodeType.type} 
                            className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                            onClick={() => handleNodeSelect(nodeType)}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === "string" ? (
                                        <img
                                        src={Icon}
                                        alt={nodeType.label}
                                        className="size-5 object-contain rounded-sm"
                                        />
                                    ) : (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {nodeType.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Separator/>
                <div>
                    {executionNodes.map((nodeType) => {
                        const Icon = nodeType.icon
                        return (
                            <div 
                            key={nodeType.type} 
                            className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                            onClick={() => handleNodeSelect(nodeType)}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === "string" ? (
                                        <img
                                        src={Icon}
                                        alt={nodeType.label}
                                        className="size-5 object-contain rounded-sm"
                                        />
                                    ) : (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {nodeType.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
}